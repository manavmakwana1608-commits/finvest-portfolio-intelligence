import { useEffect, useState } from "react";
import axios from "axios";

import {
    FaWallet,
    FaPlus,
    FaEdit,
    FaTrash,
    FaChartPie,
    FaChartLine,
    FaRupeeSign,
    FaPercentage,
} from "react-icons/fa";

import "./PortfolioPage.css";


const API = axios.create({
    baseURL: "http://localhost:5000/api",
});


function PortfolioPage() {

    const [holdings, setHoldings] = useState([]);
    const [allocation, setAllocation] = useState([]);

    const [loading, setLoading] = useState(true);
    const [allocationLoading, setAllocationLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        StockID: "",
        Quantity: "",
        AverageBuyPrice: "",
    });


    // =====================================================
    // AUTH
    // =====================================================

    const getConfig = () => {

        const token =
            localStorage.getItem("finvestToken");

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

    };


    // =====================================================
    // LOAD PORTFOLIO
    // =====================================================

    const loadPortfolio = async () => {

        try {

            setLoading(true);
            setAllocationLoading(true);

            const config = getConfig();


            const holdingsResponse =
                await API.get(
                    "/portfolio/holdings",
                    config
                );


            const allocationResponse =
                await API.get(
                    "/portfolio/allocation/data",
                    config
                );


            setHoldings(
                Array.isArray(
                    holdingsResponse.data
                )
                    ? holdingsResponse.data
                    : []
            );


            setAllocation(
                Array.isArray(
                    allocationResponse.data
                )
                    ? allocationResponse.data
                    : []
            );


        } catch (error) {

            console.error(
                "Portfolio loading error:",
                error
            );

            setHoldings([]);
            setAllocation([]);

        } finally {

            setLoading(false);
            setAllocationLoading(false);

        }

    };


    useEffect(() => {

        loadPortfolio();

    }, []);


    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setForm({
            StockID: "",
            Quantity: "",
            AverageBuyPrice: "",
        });

        setEditingId(null);
        setShowForm(false);

    };


    // =====================================================
    // CREATE / UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                StockID:
                    Number(form.StockID),

                Quantity:
                    Number(form.Quantity),

                AverageBuyPrice:
                    Number(form.AverageBuyPrice),

            };


            const config = getConfig();


            if (editingId) {

                await API.put(
                    `/portfolio/${editingId}`,
                    payload,
                    config
                );

                alert(
                    "Holding updated successfully."
                );

            } else {

                await API.post(
                    "/portfolio",
                    payload,
                    config
                );

                alert(
                    "Holding added successfully."
                );

            }


            resetForm();

            await loadPortfolio();


        } catch (error) {

            console.error(
                "Portfolio save error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to save portfolio holding."
            );

        }

    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (item) => {

        setForm({

            StockID:
                item.StockID || "",

            Quantity:
                item.Quantity || "",

            AverageBuyPrice:
                item.AverageBuyPrice || "",

        });


        setEditingId(
            item.PortfolioID
        );

        setShowForm(true);

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this holding?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await API.delete(
                `/portfolio/${id}`,
                getConfig()
            );


            alert(
                "Holding deleted successfully."
            );


            await loadPortfolio();


        } catch (error) {

            console.error(
                "Portfolio delete error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to delete portfolio holding."
            );

        }

    };


    // =====================================================
    // SUMMARY CALCULATIONS
    // =====================================================

    const totalInvestment =
        holdings.reduce(
            (total, item) =>
                total +
                Number(
                    item.Investment || 0
                ),
            0
        );


    const currentValue =
        holdings.reduce(
            (total, item) =>
                total +
                Number(
                    item.CurrentValue || 0
                ),
            0
        );


    const totalProfit =
        holdings.reduce(
            (total, item) =>
                total +
                Number(
                    item.Profit || 0
                ),
            0
        );


    const totalReturn =
        totalInvestment > 0
            ? (
                totalProfit /
                totalInvestment
            ) * 100
            : 0;


    // =====================================================
    // FORMAT CURRENCY
    // =====================================================

    const formatCurrency = (value) => {

        return Number(
            value || 0
        ).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 2,
            }
        );

    };


    // =====================================================
    // ALLOCATION
    // =====================================================

    const totalAllocation =
        allocation.reduce(
            (total, item) =>
                total +
                Number(
                    item.Investment || 0
                ),
            0
        );


    const getAllocationPercentage =
        (investment) => {

            if (totalAllocation === 0) {
                return 0;
            }

            return (
                Number(investment || 0) /
                totalAllocation
            ) * 100;

        };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="portfolio-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="portfolio-page-header">

                <button
                    className="add-portfolio-btn"
                    onClick={() => {

                        resetForm();

                        setShowForm(true);

                    }}
                >

                    <FaPlus />

                    <span>
                        Add Holding
                    </span>

                </button>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="portfolio-summary">


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaWallet />
                    </div>

                    <div>

                        <span>
                            Total Holdings
                        </span>

                        <strong>
                            {holdings.length}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaRupeeSign />
                    </div>

                    <div>

                        <span>
                            Total Investment
                        </span>

                        <strong>
                            ₹
                            {formatCurrency(
                                totalInvestment
                            )}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaChartLine />
                    </div>

                    <div>

                        <span>
                            Current Value
                        </span>

                        <strong>
                            ₹
                            {formatCurrency(
                                currentValue
                            )}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaChartPie />
                    </div>

                    <div>

                        <span>
                            Profit / Loss
                        </span>

                        <strong
                            className={
                                totalProfit >= 0
                                    ? "profit"
                                    : "loss"
                            }
                        >

                            {totalProfit >= 0
                                ? "+"
                                : "-"
                            }

                            ₹
                            {formatCurrency(
                                Math.abs(
                                    totalProfit
                                )
                            )}

                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaPercentage />
                    </div>

                    <div>

                        <span>
                            Return
                        </span>

                        <strong
                            className={
                                totalReturn >= 0
                                    ? "profit"
                                    : "loss"
                            }
                        >

                            {totalReturn >= 0
                                ? "+"
                                : ""
                            }

                            {totalReturn.toFixed(2)}%

                        </strong>

                    </div>

                </div>


            </div>


            {/* =================================================
                ALLOCATION
            ================================================= */}

            <div className="portfolio-allocation-card">

                <div className="allocation-header">

                    <div>

                        <div className="section-title-row">

                            <FaChartPie />

                            <h2>
                                Portfolio Allocation
                            </h2>

                        </div>

                        <p>
                            Investment distribution
                            across your holdings
                        </p>

                    </div>

                </div>


                {allocationLoading ? (

                    <div className="portfolio-message">
                        Loading allocation...
                    </div>

                ) : allocation.length === 0 ? (

                    <div className="portfolio-message">
                        No allocation data available.
                    </div>

                ) : (

                    <div className="allocation-list">

                        {allocation.map(
                            (item, index) => {

                                const investment =
                                    Number(
                                        item.Investment || 0
                                    );


                                const percentage =
                                    getAllocationPercentage(
                                        investment
                                    );


                                return (

                                    <div
                                        className="allocation-item"
                                        key={
                                            item.CompanyName ||
                                            index
                                        }
                                    >

                                        <div className="allocation-top">

                                            <div className="allocation-company">

                                                <span className="allocation-dot">
                                                    {index + 1}
                                                </span>

                                                <strong>
                                                    {
                                                        item.CompanyName ||
                                                        "-"
                                                    }
                                                </strong>

                                            </div>


                                            <div className="allocation-value">

                                                ₹
                                                {formatCurrency(
                                                    investment
                                                )}

                                                <span>
                                                    {percentage.toFixed(
                                                        1
                                                    )}%
                                                </span>

                                            </div>

                                        </div>


                                        <div className="allocation-bar">

                                            <div
                                                className="allocation-bar-fill"
                                                style={{
                                                    width:
                                                        `${Math.min(
                                                            percentage,
                                                            100
                                                        )}%`,
                                                }}
                                            />

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>


            {/* =================================================
                ADD / EDIT FORM
            ================================================= */}

            {showForm && (

                <div className="portfolio-form-card">

                    <div className="form-header">

                        <div>

                            <h2>
                                {editingId
                                    ? "Edit Holding"
                                    : "Add Holding"
                                }
                            </h2>

                            <p>
                                {editingId
                                    ? "Update your holding details"
                                    : "Add an investment to your portfolio"
                                }
                            </p>

                        </div>


                        <button
                            type="button"
                            className="close-btn"
                            onClick={resetForm}
                            aria-label="Close"
                        >
                            ×
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="portfolio-form"
                    >

                        <div className="form-group">

                            <label htmlFor="StockID">
                                Stock ID
                            </label>

                            <input
                                id="StockID"
                                type="number"
                                name="StockID"
                                value={
                                    form.StockID
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter stock ID"
                                min="1"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="Quantity">
                                Quantity
                            </label>

                            <input
                                id="Quantity"
                                type="number"
                                name="Quantity"
                                value={
                                    form.Quantity
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter quantity"
                                min="1"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="AverageBuyPrice">
                                Average Buy Price
                            </label>

                            <input
                                id="AverageBuyPrice"
                                type="number"
                                name="AverageBuyPrice"
                                value={
                                    form.AverageBuyPrice
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter average price"
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>


                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-btn"
                            >

                                {editingId
                                    ? "Update Holding"
                                    : "Add Holding"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                HOLDINGS TABLE
            ================================================= */}

            <div className="portfolio-table-card">

                <div className="table-header">

                    <div>

                        <div className="section-title-row">

                            <FaWallet />

                            <h2>
                                Portfolio Holdings
                            </h2>

                        </div>

                        <p>
                            Current portfolio performance
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="portfolio-message">
                        Loading portfolio...
                    </div>

                ) : holdings.length === 0 ? (

                    <div className="portfolio-message">

                        <FaWallet />

                        <span>
                            No portfolio holdings found.
                        </span>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="portfolio-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Stock
                                    </th>

                                    <th>
                                        Quantity
                                    </th>

                                    <th>
                                        Avg Buy
                                    </th>

                                    <th>
                                        Current
                                    </th>

                                    <th>
                                        Investment
                                    </th>

                                    <th>
                                        Value
                                    </th>

                                    <th>
                                        P/L
                                    </th>

                                    <th>
                                        Return
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {holdings.map(
                                    (item) => {

                                        const profit =
                                            Number(
                                                item.Profit || 0
                                            );


                                        const returnPercent =
                                            Number(
                                                item.ReturnPercent || 0
                                            );


                                        return (

                                            <tr
                                                key={
                                                    item.PortfolioID
                                                }
                                            >

                                                <td>

                                                    <span className="holding-id">

                                                        #
                                                        {
                                                            item.PortfolioID
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="stock-cell">

                                                        <strong>
                                                            {
                                                                item.CompanyName ||
                                                                "-"
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                item.StockSymbol ||
                                                                "-"
                                                            }
                                                        </small>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        item.Quantity
                                                    }
                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        formatCurrency(
                                                            item.AverageBuyPrice
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        formatCurrency(
                                                            item.CurrentPrice
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        formatCurrency(
                                                            item.Investment
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        formatCurrency(
                                                            item.CurrentValue
                                                        )
                                                    }

                                                </td>


                                                <td
                                                    className={
                                                        profit >= 0
                                                            ? "profit"
                                                            : "loss"
                                                    }
                                                >

                                                    {profit >= 0
                                                        ? "+"
                                                        : "-"
                                                    }

                                                    ₹
                                                    {
                                                        formatCurrency(
                                                            Math.abs(
                                                                profit
                                                            )
                                                        )
                                                    }

                                                </td>


                                                <td
                                                    className={
                                                        returnPercent >= 0
                                                            ? "profit"
                                                            : "loss"
                                                    }
                                                >

                                                    {returnPercent >= 0
                                                        ? "+"
                                                        : ""
                                                    }

                                                    {
                                                        returnPercent.toFixed(
                                                            2
                                                        )
                                                    }%

                                                </td>


                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            type="button"
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item
                                                                )
                                                            }
                                                            title="Edit holding"
                                                        >
                                                            <FaEdit />
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.PortfolioID
                                                                )
                                                            }
                                                            title="Delete holding"
                                                        >
                                                            <FaTrash />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default PortfolioPage;
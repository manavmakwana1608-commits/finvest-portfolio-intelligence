import { useEffect, useState } from "react";
import { updateStock } from "../api/stockApi";

import "./EditStock.css";


function EditStock({ stock: selectedStock, onClose }) {

    const [stock, setStock] = useState({
        StockID: "",
        StockSymbol: "",
        CompanyName: "",
        Sector: "",
        Market: "",
        CurrentPrice: "",
        MarketCap: "",
        PE_Ratio: "",
        DividendYield: "",
        IsActive: 1,
    });


    const [loading, setLoading] = useState(false);


    // =====================================================
    // LOAD SELECTED STOCK
    // =====================================================

    useEffect(() => {

        if (!selectedStock) {
            return;
        }


        setStock({

            StockID:
                selectedStock.StockID ?? "",

            StockSymbol:
                selectedStock.StockSymbol ?? "",

            CompanyName:
                selectedStock.CompanyName ?? "",

            Sector:
                selectedStock.Sector ?? "",

            Market:
                selectedStock.Market ?? "",

            CurrentPrice:
                selectedStock.CurrentPrice ?? "",

            MarketCap:
                selectedStock.MarketCap ?? "",

            PE_Ratio:
                selectedStock.PE_Ratio ?? "",

            DividendYield:
                selectedStock.DividendYield ?? "",

            IsActive:
                selectedStock.IsActive ?? 1,

        });

    }, [selectedStock]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        setStock({

            ...stock,

            [e.target.name]:
                e.target.value,

        });

    };


    // =====================================================
    // UPDATE STOCK
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (loading) {
            return;
        }


        try {

            setLoading(true);


            await updateStock(
                stock.StockID,
                stock
            );


            alert(
                "Stock updated successfully."
            );


            if (onClose) {
                onClose();
            }


        } catch (err) {

            console.error(
                "Update Stock Error:",
                err
            );


            alert(
                err.response?.data?.message ||
                "Unable to update stock."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // NO STOCK SELECTED
    // =====================================================

    if (!selectedStock) {

        return (

            <div className="edit-stock-state">

                No stock selected.

            </div>

        );

    }


    // =====================================================
    // MAIN
    // =====================================================

    return (

        <div className="edit-stock">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="edit-stock-header">

                <div>

                    <h2>
                        Edit Stock
                    </h2>

                    <p>
                        Update stock information
                    </p>

                </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
                className="edit-stock-form"
                onSubmit={handleSubmit}
            >


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <div className="form-section">

                    <div className="form-section-title">
                        Basic Information
                    </div>


                    <div className="form-grid">


                        {/* Stock Symbol */}

                        <div className="form-field">

                            <label htmlFor="edit-StockSymbol">
                                Stock Symbol
                            </label>

                            <input
                                id="edit-StockSymbol"
                                type="text"
                                name="StockSymbol"
                                placeholder="e.g. RELIANCE"
                                value={
                                    stock.StockSymbol
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* Company Name */}

                        <div className="form-field">

                            <label htmlFor="edit-CompanyName">
                                Company Name
                            </label>

                            <input
                                id="edit-CompanyName"
                                type="text"
                                name="CompanyName"
                                placeholder="e.g. Reliance Industries"
                                value={
                                    stock.CompanyName
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* Sector */}

                        <div className="form-field">

                            <label htmlFor="edit-Sector">
                                Sector
                            </label>

                            <input
                                id="edit-Sector"
                                type="text"
                                name="Sector"
                                placeholder="e.g. Banking"
                                value={
                                    stock.Sector
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* Market */}

                        <div className="form-field">

                            <label htmlFor="edit-Market">
                                Market
                            </label>

                            <select
                                id="edit-Market"
                                name="Market"
                                value={
                                    stock.Market
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="NSE">
                                    NSE
                                </option>

                                <option value="BSE">
                                    BSE
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MARKET DATA
                ================================================= */}

                <div className="form-section">

                    <div className="form-section-title">
                        Market Data
                    </div>


                    <div className="form-grid">


                        {/* Current Price */}

                        <div className="form-field">

                            <label htmlFor="edit-CurrentPrice">
                                Current Price
                            </label>

                            <input
                                id="edit-CurrentPrice"
                                type="number"
                                step="0.01"
                                min="0"
                                name="CurrentPrice"
                                placeholder="0.00"
                                value={
                                    stock.CurrentPrice
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* Market Cap */}

                        <div className="form-field">

                            <label htmlFor="edit-MarketCap">
                                Market Cap
                            </label>

                            <input
                                id="edit-MarketCap"
                                type="number"
                                step="0.01"
                                min="0"
                                name="MarketCap"
                                placeholder="Optional"
                                value={
                                    stock.MarketCap
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* PE Ratio */}

                        <div className="form-field">

                            <label htmlFor="edit-PE_Ratio">
                                P/E Ratio
                            </label>

                            <input
                                id="edit-PE_Ratio"
                                type="number"
                                step="0.01"
                                min="0"
                                name="PE_Ratio"
                                placeholder="Optional"
                                value={
                                    stock.PE_Ratio
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* Dividend Yield */}

                        <div className="form-field">

                            <label htmlFor="edit-DividendYield">
                                Dividend Yield
                            </label>

                            <input
                                id="edit-DividendYield"
                                type="number"
                                step="0.01"
                                min="0"
                                name="DividendYield"
                                placeholder="Optional"
                                value={
                                    stock.DividendYield
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="edit-stock-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="update-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update Stock"}

                    </button>

                </div>

            </form>

        </div>

    );

}


export default EditStock;
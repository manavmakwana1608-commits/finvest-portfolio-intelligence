import { useEffect, useState } from "react";

import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getTransactions,
    deleteTransaction
} from "../api/transactionApi";

import AddTransaction from "../components/AddTransaction";
import EditTransaction from "../components/EditTransaction";

import "./TransactionsPage.css";


function TransactionsPage() {

    const [transactions, setTransactions] = useState([]);

    const [search, setSearch] = useState("");

    const [typeFilter, setTypeFilter] = useState("All");

    const [sortPrice, setSortPrice] = useState("None");

    const [loading, setLoading] = useState(true);


    // =================================
    // ADD TRANSACTION MODAL
    // =================================

    const [showAddTransaction, setShowAddTransaction] =
        useState(false);


    // =================================
    // EDIT TRANSACTION MODAL
    // =================================

    const [showEditTransaction, setShowEditTransaction] =
        useState(false);

    const [selectedTransaction, setSelectedTransaction] =
        useState(null);


    // =================================
    // LOAD TRANSACTIONS
    // =================================

    const loadTransactions = async () => {

        try {

            setLoading(true);

            const data = await getTransactions();

            setTransactions(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Transactions loading error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadTransactions();

    }, []);


    // =================================
    // DELETE TRANSACTION
    // =================================

    const handleDeleteTransaction = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteTransaction(id);

            alert(
                "Transaction deleted successfully."
            );

            await loadTransactions();

        } catch (error) {

            console.error(
                "Delete Transaction Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete transaction."
            );

        }

    };


    // =================================
    // FILTER
    // =================================

    let filteredTransactions =
        transactions.filter((transaction) => {

            const company =
                transaction.CompanyName || "";

            const symbol =
                transaction.StockSymbol || "";

            const type =
                String(
                    transaction.TransactionType || ""
                ).toUpperCase();


            const searchMatch =
                company
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                symbol
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const typeMatch =
                typeFilter === "All" ||
                type === typeFilter;


            return (
                searchMatch &&
                typeMatch
            );

        });


    // =================================
    // SORT
    // =================================

    if (sortPrice === "Low") {

        filteredTransactions.sort(
            (a, b) =>
                Number(a.Price || 0) -
                Number(b.Price || 0)
        );

    }


    if (sortPrice === "High") {

        filteredTransactions.sort(
            (a, b) =>
                Number(b.Price || 0) -
                Number(a.Price || 0)
        );

    }


    // =================================
    // TOTAL VALUE
    // =================================

    const totalValue =
        filteredTransactions.reduce(
            (total, transaction) => {

                return (
                    total +
                    Number(
                        transaction.Quantity || 0
                    ) *
                    Number(
                        transaction.Price || 0
                    )
                );

            },
            0
        );


    // =================================
    // OPEN EDIT MODAL
    // =================================

    const handleEditTransaction = (
        transaction
    ) => {

        setSelectedTransaction(
            transaction
        );

        setShowEditTransaction(
            true
        );

    };


    // =================================
    // CLOSE EDIT MODAL
    // =================================

    const closeEditTransaction = () => {

        setSelectedTransaction(null);

        setShowEditTransaction(false);

    };


    return (

        <div className="transactions-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="transactions-header">

                <button
                    className="add-transaction-button"
                    onClick={() =>
                        setShowAddTransaction(true)
                    }
                >

                    <FaPlus />

                    Add Transaction

                </button>

            </div>


            {/* =================================
                SUMMARY
            ================================= */}

            <div className="transaction-summary">

                <div className="summary-card">

                    <span>
                        Total Transactions
                    </span>

                    <strong>
                        {
                            filteredTransactions.length
                        }
                    </strong>

                </div>


                <div className="summary-card">

                    <span>
                        Transaction Value
                    </span>

                    <strong>

                        ₹
                        {totalValue.toLocaleString(
                            "en-IN",
                            {
                                maximumFractionDigits: 2
                            }
                        )}

                    </strong>

                </div>

            </div>


            {/* =================================
                TRANSACTIONS CARD
            ================================= */}

            <div className="transactions-card">


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="transactions-toolbar">


                    <div className="transaction-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search company or symbol..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Types
                        </option>

                        <option value="BUY">
                            Buy
                        </option>

                        <option value="SELL">
                            Sell
                        </option>

                    </select>


                    <select
                        value={sortPrice}
                        onChange={(e) =>
                            setSortPrice(
                                e.target.value
                            )
                        }
                    >

                        <option value="None">
                            Sort Price
                        </option>

                        <option value="Low">
                            Low to High
                        </option>

                        <option value="High">
                            High to Low
                        </option>

                    </select>

                </div>


                {/* =================================
                    TABLE
                ================================= */}

                {loading ? (

                    <div className="transactions-message">

                        Loading transactions...

                    </div>

                ) : filteredTransactions.length === 0 ? (

                    <div className="transactions-message">

                        No transactions found.

                    </div>

                ) : (

                    <div className="transactions-table-wrapper">

                        <table className="transactions-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Quantity
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Total
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    filteredTransactions.map(
                                        (transaction) => {

                                            const total =
                                                Number(
                                                    transaction.Quantity || 0
                                                ) *
                                                Number(
                                                    transaction.Price || 0
                                                );


                                            const type =
                                                String(
                                                    transaction.TransactionType || ""
                                                ).toUpperCase();


                                            return (

                                                <tr
                                                    key={
                                                        transaction.TransactionID
                                                    }
                                                >

                                                    {/* ID */}

                                                    <td>

                                                        #
                                                        {
                                                            transaction.TransactionID
                                                        }

                                                    </td>


                                                    {/* DATE */}

                                                    <td>

                                                        {
                                                            transaction.TransactionDate

                                                                ? new Date(
                                                                    transaction.TransactionDate
                                                                ).toLocaleDateString(
                                                                    "en-IN"
                                                                )

                                                                : "-"
                                                        }

                                                    </td>


                                                    {/* COMPANY */}

                                                    <td>

                                                        <div className="company-cell">

                                                            <strong>

                                                                {
                                                                    transaction.CompanyName ||
                                                                    "-"
                                                                }

                                                            </strong>

                                                            <span>

                                                                {
                                                                    transaction.StockSymbol ||
                                                                    "-"
                                                                }

                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* TYPE */}

                                                    <td>

                                                        <span
                                                            className={
                                                                type === "BUY"
                                                                    ? "transaction-buy"
                                                                    : "transaction-sell"
                                                            }
                                                        >

                                                            {
                                                                type || "-"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* QUANTITY */}

                                                    <td>

                                                        {
                                                            transaction.Quantity ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* PRICE */}

                                                    <td>

                                                        ₹
                                                        {Number(
                                                            transaction.Price || 0
                                                        ).toLocaleString(
                                                            "en-IN",
                                                            {
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}

                                                    </td>


                                                    {/* TOTAL */}

                                                    <td>

                                                        ₹
                                                        {total.toLocaleString(
                                                            "en-IN",
                                                            {
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="transaction-actions">


                                                            {/* EDIT */}

                                                            <button
                                                                className="transaction-edit-button"
                                                                onClick={() =>
                                                                    handleEditTransaction(
                                                                        transaction
                                                                    )
                                                                }
                                                            >

                                                                <FaEdit />

                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                className="transaction-delete-button"
                                                                onClick={() =>
                                                                    handleDeleteTransaction(
                                                                        transaction.TransactionID
                                                                    )
                                                                }
                                                            >

                                                                <FaTrash />

                                                            </button>


                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* =================================
                ADD TRANSACTION MODAL
            ================================= */}

            {
                showAddTransaction && (

                    <div
                        className="modal"
                        onClick={() =>
                            setShowAddTransaction(
                                false
                            )
                        }
                    >

                        <div
                            className="modal-content"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setShowAddTransaction(
                                        false
                                    )
                                }
                            >

                                ×

                            </button>


                            <AddTransaction
                                onSuccess={
                                    loadTransactions
                                }

                                onClose={() =>
                                    setShowAddTransaction(
                                        false
                                    )
                                }

                            />

                        </div>

                    </div>

                )
            }


            {/* =================================
                EDIT TRANSACTION MODAL
            ================================= */}

            {
                showEditTransaction && (

                    <div
                        className="modal"
                        onClick={
                            closeEditTransaction
                        }
                    >

                        <div
                            className="modal-content"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="close-btn"
                                onClick={
                                    closeEditTransaction
                                }
                            >

                                ×

                            </button>


                            <EditTransaction
                                transaction={
                                    selectedTransaction
                                }

                                onSuccess={
                                    loadTransactions
                                }

                                onClose={
                                    closeEditTransaction
                                }

                            />

                        </div>

                    </div>

                )
            }


        </div>

    );

}


export default TransactionsPage;
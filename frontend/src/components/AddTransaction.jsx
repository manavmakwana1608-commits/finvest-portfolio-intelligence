import { useEffect, useState } from "react";

import { createTransaction } from "../api/transactionApi";
import { getOrders } from "../api/orderApi";

import "./AddTransaction.css";


function AddTransaction({ onClose, onSuccess }) {

    const [orders, setOrders] = useState([]);

    const [transaction, setTransaction] = useState({
        OrderID: "",
        TransactionType: "BUY",
        Quantity: "",
        Price: ""
    });

    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Load existing orders
    useEffect(() => {

        const loadOrders = async () => {

            try {

                setLoadingOrders(true);

                const data = await getOrders();

                setOrders(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.error(
                    "Orders loading error:",
                    err
                );

                setError(
                    "Unable to load orders."
                );

            } finally {

                setLoadingOrders(false);

            }

        };

        loadOrders();

    }, []);


    // Handle form changes
    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };


    // Submit transaction
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!transaction.OrderID) {

            setError(
                "Please select an order."
            );

            return;

        }


        if (
            !transaction.Quantity ||
            Number(transaction.Quantity) <= 0
        ) {

            setError(
                "Quantity must be greater than 0."
            );

            return;

        }


        if (
            !transaction.Price ||
            Number(transaction.Price) <= 0
        ) {

            setError(
                "Price must be greater than 0."
            );

            return;

        }


        try {

            setLoading(true);


            await createTransaction({

                OrderID: Number(
                    transaction.OrderID
                ),

                TransactionType:
                    transaction.TransactionType,

                Quantity: Number(
                    transaction.Quantity
                ),

                Price: Number(
                    transaction.Price
                )

            });


            alert(
                "Transaction created successfully."
            );


            if (onSuccess) {
                await onSuccess();
            }


            if (onClose) {
                onClose();
            }


        } catch (err) {

            console.error(
                "Create Transaction Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to create transaction."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-transaction">

            <div className="add-transaction-header">

                <h2>
                    Add Transaction
                </h2>

                <p>
                    Record a completed investment transaction
                </p>

            </div>


            {error && (

                <div className="transaction-form-error">

                    {error}

                </div>

            )}


            <form
                className="add-transaction-form"
                onSubmit={handleSubmit}
            >

                {/* Order */}

                <div className="form-group">

                    <label>
                        Order
                    </label>

                    <select
                        name="OrderID"
                        value={transaction.OrderID}
                        onChange={handleChange}
                        disabled={loadingOrders}
                        required
                    >

                        <option value="">

                            {loadingOrders
                                ? "Loading orders..."
                                : "Select an order"}

                        </option>


                        {orders.map((order) => (

                            <option
                                key={order.OrderID}
                                value={order.OrderID}
                            >

                                #{order.OrderID}
                                {" — "}
                                {order.CompanyName ||
                                    `Stock #${order.StockID}`}
                                {" — "}
                                {order.OrderType || ""}
                                {" — "}
                                {order.Quantity || 0}
                                {" shares"}

                            </option>

                        ))}

                    </select>

                </div>


                {/* Transaction Type */}

                <div className="form-group">

                    <label>
                        Transaction Type
                    </label>

                    <select
                        name="TransactionType"
                        value={
                            transaction.TransactionType
                        }
                        onChange={handleChange}
                    >

                        <option value="BUY">
                            BUY
                        </option>

                        <option value="SELL">
                            SELL
                        </option>

                    </select>

                </div>


                {/* Quantity */}

                <div className="form-group">

                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="Quantity"
                        min="1"
                        placeholder="Enter quantity"
                        value={transaction.Quantity}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Price */}

                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="Price"
                        min="0"
                        step="0.01"
                        placeholder="Enter transaction price"
                        value={transaction.Price}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Buttons */}

                <div className="add-transaction-actions">

                    <button
                        type="button"
                        className="transaction-cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="transaction-submit-btn"
                        disabled={
                            loading ||
                            loadingOrders
                        }
                    >

                        {loading
                            ? "Creating..."
                            : "Create Transaction"}

                    </button>

                </div>

            </form>

        </div>

    );

}


export default AddTransaction;
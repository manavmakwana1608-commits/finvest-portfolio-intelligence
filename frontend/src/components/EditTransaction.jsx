import { useEffect, useState } from "react";

import { updateTransaction } from "../api/transactionApi";
import { getOrders } from "../api/orderApi";

import "./EditTransaction.css";


function EditTransaction({ transaction: selectedTransaction, onClose, onSuccess }) {

    const [orders, setOrders] = useState([]);

    const [transaction, setTransaction] = useState({
        TransactionID: "",
        OrderID: "",
        TransactionType: "BUY",
        Quantity: "",
        Price: ""
    });

    const [loading, setLoading] = useState(false);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        if (selectedTransaction) {

            setTransaction({
                TransactionID:
                    selectedTransaction.TransactionID ?? "",

                OrderID:
                    selectedTransaction.OrderID ?? "",

                TransactionType:
                    selectedTransaction.TransactionType ?? "BUY",

                Quantity:
                    selectedTransaction.Quantity ?? "",

                Price:
                    selectedTransaction.Price ?? ""
            });

        }

    }, [selectedTransaction]);


    useEffect(() => {

        const loadOrders = async () => {

            try {

                const data = await getOrders();

                setOrders(
                    Array.isArray(data) ? data : []
                );

            } catch (err) {

                console.error(err);

                setError("Unable to load orders.");

            } finally {

                setLoadingOrders(false);

            }

        };

        loadOrders();

    }, []);


    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!transaction.OrderID) {
            setError("Please select an order.");
            return;
        }

        if (
            !transaction.Quantity ||
            Number(transaction.Quantity) <= 0
        ) {
            setError("Quantity must be greater than 0.");
            return;
        }

        if (
            !transaction.Price ||
            Number(transaction.Price) <= 0
        ) {
            setError("Price must be greater than 0.");
            return;
        }


        try {

            setLoading(true);

            await updateTransaction(
                transaction.TransactionID,
                {
                    OrderID: Number(transaction.OrderID),
                    TransactionType:
                        transaction.TransactionType,
                    Quantity: Number(transaction.Quantity),
                    Price: Number(transaction.Price)
                }
            );


            alert("Transaction updated successfully.");


            if (onSuccess) {
                await onSuccess();
            }

            if (onClose) {
                onClose();
            }


        } catch (err) {

            console.error(
                "Update Transaction Error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to update transaction."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="edit-transaction">

            <div className="edit-transaction-header">

                <h2>
                    Edit Transaction
                </h2>

                <p>
                    Update transaction information
                </p>

            </div>


            {error && (

                <div className="transaction-form-error">
                    {error}
                </div>

            )}


            <form
                className="edit-transaction-form"
                onSubmit={handleSubmit}
            >

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


                <div className="form-group">

                    <label>
                        Transaction Type
                    </label>

                    <select
                        name="TransactionType"
                        value={transaction.TransactionType}
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


                <div className="form-group">

                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="Quantity"
                        min="1"
                        value={transaction.Quantity}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="Price"
                        min="0"
                        step="0.01"
                        value={transaction.Price}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="edit-transaction-actions">

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
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update Transaction"}

                    </button>

                </div>

            </form>

        </div>

    );

}


export default EditTransaction;
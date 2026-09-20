import { useEffect, useState } from "react";
import { updateOrder } from "../api/orderApi";
import { getStocks } from "../api/stockApi";

function EditOrder({ order: selectedOrder, onClose, onSuccess }) {

    const [stocks, setStocks] = useState([]);

    const [order, setOrder] = useState({
        OrderID: "",
        UserID: "",
        StockID: "",
        OrderType: "BUY",
        Quantity: "",
        Price: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // =================================
    // LOAD STOCKS
    // =================================

    useEffect(() => {

        loadStocks();

    }, []);


    const loadStocks = async () => {

        try {

            const data = await getStocks();

            setStocks(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Stocks loading error:",
                err
            );

            setError(
                "Unable to load stocks."
            );

        }

    };


    // =================================
    // LOAD SELECTED ORDER
    // =================================

    useEffect(() => {

        if (selectedOrder) {

            setOrder({
                OrderID:
                    selectedOrder.OrderID ?? "",

                UserID:
                    selectedOrder.UserID ?? "",

                StockID:
                    selectedOrder.StockID ?? "",

                OrderType:
                    selectedOrder.OrderType ?? "BUY",

                Quantity:
                    selectedOrder.Quantity ?? "",

                Price:
                    selectedOrder.Price ?? ""
            });

        }

    }, [selectedOrder]);


    // =================================
    // HANDLE CHANGE
    // =================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setOrder({
            ...order,
            [name]: value
        });

    };


    // =================================
    // STOCK CHANGE
    // =================================

    const handleStockChange = (e) => {

        setOrder({
            ...order,
            StockID: e.target.value
        });

    };


    // =================================
    // SUBMIT
    // =================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !order.StockID ||
            !order.Quantity ||
            !order.Price
        ) {

            setError(
                "Please fill in all required fields."
            );

            return;

        }


        try {

            setLoading(true);

            await updateOrder(
                order.OrderID,
                {
                    UserID: Number(order.UserID),
                    StockID: Number(order.StockID),
                    OrderType: order.OrderType,
                    Quantity: Number(order.Quantity),
                    Price: Number(order.Price)
                }
            );


            alert(
                "Order updated successfully."
            );


            if (onSuccess) {

                await onSuccess();

            }


            if (onClose) {

                onClose();

            }

        } catch (err) {

            console.error(
                "Update Order Error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to update order."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="edit-order">

            {/* Header */}

            <div className="edit-order-header">

                <h2>
                    Edit Order
                </h2>

                <p>
                    Update investment order details
                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="form-error">

                    {error}

                </div>

            )}


            {/* Form */}

            <form
                className="edit-order-form"
                onSubmit={handleSubmit}
            >


                {/* Stock */}

                <div className="form-group">

                    <label>
                        Stock
                    </label>

                    <select
                        name="StockID"
                        value={order.StockID}
                        onChange={handleStockChange}
                        required
                    >

                        <option value="">
                            Select Stock
                        </option>

                        {stocks.map(stock => (

                            <option
                                key={stock.StockID}
                                value={stock.StockID}
                            >

                                {stock.StockSymbol}
                                {" - "}
                                {stock.CompanyName}

                            </option>

                        ))}

                    </select>

                </div>


                {/* Order Type */}

                <div className="form-group">

                    <label>
                        Order Type
                    </label>

                    <select
                        name="OrderType"
                        value={order.OrderType}
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
                        value={order.Quantity}
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
                        value={order.Price}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Total */}

                {order.Quantity &&
                    order.Price && (

                        <div className="order-total">

                            <span>
                                Total Order Value
                            </span>

                            <strong>

                                ₹
                                {(
                                    Number(order.Quantity) *
                                    Number(order.Price)
                                ).toLocaleString(
                                    "en-IN",
                                    {
                                        minimumFractionDigits: 2
                                    }
                                )}

                            </strong>

                        </div>

                    )}


                {/* Actions */}

                <div className="edit-order-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
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
                            : "Update Order"}

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditOrder;
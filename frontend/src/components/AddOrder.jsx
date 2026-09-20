import { useEffect, useState } from "react";
import { createOrder } from "../api/orderApi";
import { getStocks } from "../api/stockApi";

function AddOrder({ onSuccess, onClose }) {

    const [stocks, setStocks] = useState([]);

    const [order, setOrder] = useState({
        UserID: 7,
        StockID: "",
        OrderType: "BUY",
        Quantity: "",
        Price: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ===============================
    // LOAD STOCKS
    // ===============================

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


    // ===============================
    // HANDLE CHANGE
    // ===============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setOrder({
            ...order,
            [name]: value
        });

    };


    // ===============================
    // STOCK CHANGE
    // ===============================

    const handleStockChange = (e) => {

        const stockId = e.target.value;

        const selectedStock = stocks.find(
            stock =>
                String(stock.StockID) ===
                String(stockId)
        );

        setOrder({
            ...order,
            StockID: stockId,
            Price: selectedStock
                ? selectedStock.CurrentPrice
                : ""
        });

    };


    // ===============================
    // SUBMIT
    // ===============================

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

            await createOrder({
                UserID: Number(order.UserID),
                StockID: Number(order.StockID),
                OrderType: order.OrderType,
                Quantity: Number(order.Quantity),
                Price: Number(order.Price)
            });


            alert(
                "Order Created Successfully!"
            );


            if (onSuccess) {

                onSuccess();

            }


            if (onClose) {

                onClose();

            }

        } catch (err) {

            console.error(
                "Create Order Error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to create order."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-order">

            <h2>
                Add Order
            </h2>

            <p className="form-subtitle">
                Create a new investment order
            </p>


            {/* Error */}

            {error && (

                <div className="form-error">

                    {error}

                </div>

            )}


            <form onSubmit={handleSubmit}>


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
                        placeholder="Enter quantity"
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
                        placeholder="Enter price"
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
                                ).toLocaleString("en-IN", {
                                    minimumFractionDigits: 2
                                })}

                            </strong>

                        </div>

                    )}


                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-order-btn"
                >

                    {loading
                        ? "Creating..."
                        : "Create Order"}

                </button>

            </form>

        </div>

    );

}

export default AddOrder;
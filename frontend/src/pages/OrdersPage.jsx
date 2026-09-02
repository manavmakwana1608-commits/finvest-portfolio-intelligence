import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";

import { getOrders } from "../api/orderApi";

import AddOrder from "../components/AddOrder";
import EditOrder from "../components/EditOrder";

import "./OrdersPage.css";


function OrdersPage() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showAddOrder, setShowAddOrder] = useState(false);

    const [showEditOrder, setShowEditOrder] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");

    const [typeFilter, setTypeFilter] = useState("All");

    const [sortBy, setSortBy] = useState("Newest");


    // =================================
    // LOAD ORDERS
    // =================================

    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getOrders();

            console.log("Orders:", data);

            setOrders(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Orders API Error:",
                err
            );

            setError(
                "Unable to load orders."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadOrders();

    }, []);


    // =================================
    // FILTER + SORT
    // =================================

    const filteredOrders = useMemo(() => {

        let result = [...orders];


        // Search

        if (search.trim()) {

            const searchValue =
                search.toLowerCase().trim();

            result = result.filter((order) => {

                const company =
                    String(
                        order.CompanyName || ""
                    ).toLowerCase();

                const orderId =
                    String(
                        order.OrderID || ""
                    );

                return (
                    company.includes(searchValue) ||
                    orderId.includes(searchValue)
                );

            });

        }


        // BUY / SELL filter

        if (typeFilter !== "All") {

            result = result.filter(
                (order) =>
                    String(
                        order.OrderType || ""
                    ).toUpperCase() === typeFilter
            );

        }


        // Sorting

        if (sortBy === "Newest") {

            result.sort(
                (a, b) =>
                    new Date(b.OrderDate) -
                    new Date(a.OrderDate)
            );

        }


        if (sortBy === "Oldest") {

            result.sort(
                (a, b) =>
                    new Date(a.OrderDate) -
                    new Date(b.OrderDate)
            );

        }


        if (sortBy === "Highest") {

            result.sort(
                (a, b) =>
                    (
                        Number(b.Price || 0) *
                        Number(b.Quantity || 0)
                    ) -
                    (
                        Number(a.Price || 0) *
                        Number(a.Quantity || 0)
                    )
            );

        }


        if (sortBy === "Lowest") {

            result.sort(
                (a, b) =>
                    (
                        Number(a.Price || 0) *
                        Number(a.Quantity || 0)
                    ) -
                    (
                        Number(b.Price || 0) *
                        Number(b.Quantity || 0)
                    )
            );

        }


        return result;

    }, [
        orders,
        search,
        typeFilter,
        sortBy
    ]);


    // =================================
    // OPEN EDIT
    // =================================

    const handleEdit = (order) => {

        setSelectedOrder(order);

        setShowEditOrder(true);

    };


    return (

        <div className="orders-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="orders-header">

                <button
                    className="add-order-button"
                    onClick={() =>
                        setShowAddOrder(true)
                    }
                >
                    + Add Order
                </button>

            </div>


            {/* =================================
                ORDERS CARD
            ================================= */}

            <div className="orders-card">

                <div className="orders-card-header">

                    <div>

                        <h2>
                            Order History
                        </h2>

                        <span>
                            Showing {filteredOrders.length} of{" "}
                            {orders.length} orders
                        </span>

                    </div>

                </div>


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="orders-toolbar">


                    {/* Search */}

                    <div className="orders-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search company or order ID..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* Type */}

                    <select
                        className="orders-filter"
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(e.target.value)
                        }
                    >

                        <option value="All">
                            All Types
                        </option>

                        <option value="BUY">
                            BUY
                        </option>

                        <option value="SELL">
                            SELL
                        </option>

                    </select>


                    {/* Sort */}

                    <select
                        className="orders-filter"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                    >

                        <option value="Newest">
                            Newest
                        </option>

                        <option value="Oldest">
                            Oldest
                        </option>

                        <option value="Highest">
                            Highest Value
                        </option>

                        <option value="Lowest">
                            Lowest Value
                        </option>

                    </select>

                </div>


                {/* =================================
                    LOADING
                ================================= */}

                {loading && (

                    <div className="orders-message">

                        Loading orders...

                    </div>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {!loading &&
                    error && (

                        <div className="orders-message error">

                            {error}

                        </div>

                    )}


                {/* =================================
                    EMPTY
                ================================= */}

                {!loading &&
                    !error &&
                    filteredOrders.length === 0 && (

                        <div className="orders-message">

                            No matching orders found.

                        </div>

                    )}


                {/* =================================
                    TABLE
                ================================= */}

                {!loading &&
                    !error &&
                    filteredOrders.length > 0 && (

                        <div className="orders-table-wrapper">

                            <table className="orders-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Order ID
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

                                    {filteredOrders.map(
                                        (order) => {

                                            const total =
                                                Number(
                                                    order.Price || 0
                                                ) *
                                                Number(
                                                    order.Quantity || 0
                                                );


                                            const isBuy =
                                                String(
                                                    order.OrderType || ""
                                                ).toUpperCase() ===
                                                "BUY";


                                            return (

                                                <tr
                                                    key={
                                                        order.OrderID
                                                    }
                                                >

                                                    <td>
                                                        #
                                                        {order.OrderID}
                                                    </td>


                                                    <td>

                                                        {order.OrderDate
                                                            ? new Date(
                                                                order.OrderDate
                                                            ).toLocaleDateString(
                                                                "en-IN"
                                                            )
                                                            : "-"}

                                                    </td>


                                                    <td className="company">

                                                        {
                                                            order.CompanyName ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                isBuy
                                                                    ? "buy"
                                                                    : "sell"
                                                            }
                                                        >

                                                            {
                                                                order.OrderType ||
                                                                "-"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>
                                                        {
                                                            order.Quantity ||
                                                            "-"
                                                        }
                                                    </td>


                                                    <td>

                                                        ₹
                                                        {Number(
                                                            order.Price || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>


                                                    <td>

                                                        ₹
                                                        {total.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>


                                                    <td className="order-actions">

                                                        <button
                                                            className="edit-order-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    order
                                                                )
                                                            }
                                                            title="Edit Order"
                                                        >

                                                            <FaEdit />

                                                        </button>

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


            {/* =================================
                ADD ORDER MODAL
            ================================= */}

            {showAddOrder && (

                <div
                    className="modal"
                    onClick={() =>
                        setShowAddOrder(false)
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
                                setShowAddOrder(false)
                            }
                        >
                            ×
                        </button>


                        <AddOrder
                            onSuccess={loadOrders}
                            onClose={() =>
                                setShowAddOrder(false)
                            }
                        />

                    </div>

                </div>

            )}


            {/* =================================
                EDIT ORDER MODAL
            ================================= */}

            {showEditOrder && (

                <div
                    className="modal"
                    onClick={() =>
                        setShowEditOrder(false)
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
                                setShowEditOrder(false)
                            }
                        >
                            ×
                        </button>


                        <EditOrder
                            order={selectedOrder}
                            onSuccess={loadOrders}
                            onClose={() => {

                                setShowEditOrder(false);

                                setSelectedOrder(null);

                            }}
                        />

                    </div>

                </div>

            )}

        </div>

    );

}


export default OrdersPage;
import { NavLink } from "react-router-dom";

import {
    FaChartPie,
    FaChartLine,
    FaWallet,
    FaShoppingCart,
    FaExchangeAlt,
    FaUsers,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

import "../styles/Sidebar.css";


function Sidebar() {

    const handleLogout = () => {

        localStorage.removeItem("finvestToken");
        localStorage.removeItem("finvestUser");

        window.location.replace("/login");

    };


    const getMenuClass = ({ isActive }) =>
        isActive
            ? "menu-item active"
            : "menu-item";


    return (

        <aside className="sidebar">


            {/* =================================
                BRAND
            ================================= */}

            <div className="logo">

                <div className="logo-icon">
                    <FaChartLine />
                </div>

                <div className="logo-text">

                    <h2>
                        FinVest
                    </h2>

                    <p>
                        Portfolio Intelligence
                    </p>

                </div>

            </div>


            {/* =================================
                MAIN NAVIGATION
            ================================= */}

            <nav className="menu">


                {/* DASHBOARD */}

                <NavLink
                    to="/dashboard"
                    className={getMenuClass}
                >

                    <FaChartPie
                        className="menu-icon"
                    />

                    <span>
                        Dashboard
                    </span>

                </NavLink>


                {/* STOCKS */}

                <NavLink
                    to="/stocks"
                    className={getMenuClass}
                >

                    <FaChartLine
                        className="menu-icon"
                    />

                    <span>
                        Stocks
                    </span>

                </NavLink>


                {/* PORTFOLIO */}

                <NavLink
                    to="/portfolio"
                    className={getMenuClass}
                >

                    <FaWallet
                        className="menu-icon"
                    />

                    <span>
                        Portfolio
                    </span>

                </NavLink>


                {/* ORDERS */}

                <NavLink
                    to="/orders"
                    className={getMenuClass}
                >

                    <FaShoppingCart
                        className="menu-icon"
                    />

                    <span>
                        Orders
                    </span>

                </NavLink>


                {/* TRANSACTIONS */}

                <NavLink
                    to="/transactions"
                    className={getMenuClass}
                >

                    <FaExchangeAlt
                        className="menu-icon"
                    />

                    <span>
                        Transactions
                    </span>

                </NavLink>


                {/* USERS */}

                <NavLink
                    to="/users"
                    className={getMenuClass}
                >

                    <FaUsers
                        className="menu-icon"
                    />

                    <span>
                        Users
                    </span>

                </NavLink>

            </nav>


            {/* =================================
                BOTTOM NAVIGATION
            ================================= */}

            <div className="bottom-menu">


                {/* SETTINGS */}

                <NavLink
                    to="/settings"
                    className={getMenuClass}
                >

                    <FaCog
                        className="menu-icon"
                    />

                    <span>
                        Settings
                    </span>

                </NavLink>


                {/* LOGOUT */}

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );

}


export default Sidebar;
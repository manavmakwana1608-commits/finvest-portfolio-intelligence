import {
    FaSignOutAlt,
} from "react-icons/fa";

import {
    useLocation,
} from "react-router-dom";

import "../styles/Navbar.css";


function Navbar() {

    const location = useLocation();

    const storedUser =
        localStorage.getItem("finvestUser");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;


    // =======================================
    // DYNAMIC PAGE INFORMATION
    // =======================================

    const pageInfo = {

        "/": {
            title: "Dashboard",
            subtitle:
                "Portfolio overview and investment analytics"
        },

        "/dashboard": {
            title: "Dashboard",
            subtitle:
                "Portfolio overview and investment analytics"
        },

        "/stocks": {
            title: "Stocks",
            subtitle:
                "Explore and analyze available stocks"
        },

        "/portfolio": {
            title: "Portfolio",
            subtitle:
                "Track your investments and performance"
        },

        "/orders": {
            title: "Orders",
            subtitle:
                "Manage and analyze your orders"
        },

        "/transactions": {
            title: "Transactions",
            subtitle:
                "View your transaction history"
        },

        "/users": {
            title: "Users",
            subtitle:
                "Manage platform users"
        },

        "/settings": {
            title: "Settings",
            subtitle:
                "Manage your account preferences"
        }

    };


    const currentPage =
        pageInfo[location.pathname] ||
        pageInfo["/"];


    // =======================================
    // LOGOUT
    // =======================================

    const handleLogout = () => {

        localStorage.removeItem(
            "finvestToken"
        );

        localStorage.removeItem(
            "finvestUser"
        );

        window.location.replace(
            "/login"
        );

    };


    return (

        <header className="navbar">


            {/* =================================
                LEFT - DYNAMIC PAGE TITLE
            ================================= */}

            <div className="navbar-title">

                <h1>
                    {currentPage.title}
                </h1>

                <p>
                    {currentPage.subtitle}
                </p>

            </div>


            {/* =================================
                RIGHT SIDE
            ================================= */}

            <div className="navbar-right">


                {/* =================================
                    PROFILE
                ================================= */}

                <div className="profile">

                    <div className="avatar">

                        {user?.FullName
                            ? user.FullName
                                .charAt(0)
                                .toUpperCase()
                            : "M"}

                    </div>


                    <div className="profile-info">

                        <h4>
                            {user?.FullName ||
                                "User"}
                        </h4>

                        <p>
                            Portfolio Manager
                        </p>

                    </div>

                </div>


                {/* =================================
                    LOGOUT
                ================================= */}

                <button
                    type="button"
                    className="nav-icon logout-icon"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                >

                    <FaSignOutAlt />

                </button>


            </div>

        </header>

    );

}


export default Navbar;
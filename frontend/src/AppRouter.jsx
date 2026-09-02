import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Layout from "./layout/Layout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StocksPage from "./pages/StocksPage";
import PortfolioPage from "./pages/PortfolioPage";
import OrdersPage from "./pages/OrdersPage";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";


/* =========================================
   PROTECTED ROUTE
========================================= */

function ProtectedRoutes() {

    const token =
        localStorage.getItem("finvestToken");

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return (

        <Layout>

            <Routes>

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />


                {/* Stocks */}

                <Route
                    path="/stocks"
                    element={<StocksPage />}
                />


                {/* Portfolio */}

                <Route
                    path="/portfolio"
                    element={<PortfolioPage />}
                />


                {/* Orders */}

                <Route
                    path="/orders"
                    element={<OrdersPage />}
                />


                {/* Transactions */}

                <Route
                    path="/transactions"
                    element={<TransactionsPage />}
                />


                {/* Users */}

                <Route
                    path="/users"
                    element={<UsersPage />}
                />


                {/* Settings */}

                <Route
                    path="/settings"
                    element={<SettingsPage />}
                />


                {/* Unknown protected route */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </Layout>

    );

}


/* =========================================
   MAIN ROUTER
========================================= */

function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =================================
                    ROOT → LOGIN
                ================================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* =================================
                    LOGIN
                ================================= */}

                <Route
                    path="/login"
                    element={<LoginPage />}
                />


                {/* =================================
                    PROTECTED APPLICATION
                ================================= */}

                <Route
                    path="/*"
                    element={<ProtectedRoutes />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default AppRouter;
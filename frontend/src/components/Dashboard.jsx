import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";

import {
    FaWallet,
    FaChartLine,
    FaRupeeSign,
    FaPercentage,
} from "react-icons/fa";

import "./Dashboard.css";

import StatCard from "./StatCard";
import PortfolioChart from "./PortfolioChart";
import PortfolioGrowth from "./PortfolioGrowth";
import PortfolioInsights from "./PortfolioInsights";
import RecentTransactions from "./RecentTransactions";
import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioPerformance from "./PortfolioPerformance";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /* =====================================================
       LOAD DASHBOARD
    ===================================================== */

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const res = await getDashboard();


            if (res.data && res.data.length > 0) {

                setDashboard(res.data[0]);

            } else {

                setDashboard({
                    TotalInvestment: 0,
                    CurrentValue: 0,
                    Profit: 0,
                    ProfitPercent: 0,
                });

            }

        } catch (err) {

            console.error(
                "Dashboard API Error:",
                err
            );

            setError(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       LOADING STATE
    ===================================================== */

    if (loading) {

        return (
            <div className="dashboard-state">
                Loading Dashboard...
            </div>
        );

    }


    /* =====================================================
       ERROR STATE
    ===================================================== */

    if (error) {

        return (
            <div className="dashboard-state">
                {error}
            </div>
        );

    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

    return (

        <div className="dashboard-container">


            {/* =================================================
                KPI CARDS
            ================================================= */}

            <div className="cards">


                {/* INVESTMENT */}

                <StatCard
                    title="Investment"
                    value={`₹${Number(
                        dashboard.TotalInvestment
                    ).toLocaleString("en-IN")}`}
                    icon={<FaWallet />}
                />


                {/* PORTFOLIO VALUE */}

                <StatCard
                    title="Portfolio Value"
                    value={`₹${Number(
                        dashboard.CurrentValue
                    ).toLocaleString("en-IN")}`}
                    icon={<FaChartLine />}
                />


                {/* PROFIT */}

                <StatCard
                    title="Profit"
                    value={`₹${Number(
                        dashboard.Profit
                    ).toLocaleString("en-IN")}`}
                    icon={<FaRupeeSign />}
                />


                {/* RETURN */}

                <StatCard
                    title="Return"
                    value={`${Number(
                        dashboard.ProfitPercent
                    ).toFixed(2)}%`}
                    icon={<FaPercentage />}
                />

            </div>



            {/* =================================================
                MAIN ANALYTICS
            ================================================= */}

            <div className="chart-grid">


                {/* PORTFOLIO ALLOCATION */}

                <div className="chart-box">

                    <PortfolioChart />

                </div>


                {/* PORTFOLIO GROWTH */}

                <div className="chart-box">

                    <PortfolioGrowth />

                </div>


            </div>



            {/* =================================================
                PORTFOLIO INSIGHTS
            ================================================= */}

            <div className="dashboard-section">

                <PortfolioInsights />

            </div>



            {/* =================================================
                RECENT TRANSACTIONS
            ================================================= */}

            <div className="dashboard-section">

                <RecentTransactions />

            </div>



            {/* =================================================
                PORTFOLIO HOLDINGS
            ================================================= */}

            <div className="dashboard-section">

                <PortfolioHoldings />

            </div>



            {/* =================================================
                PORTFOLIO PERFORMANCE
            ================================================= */}

            <div className="dashboard-section">

                <PortfolioPerformance />

            </div>



            {/* =================================================
                TOP GAINERS / TOP LOSERS
            ================================================= */}

            <div className="performance-grid">


                <TopGainers />


                <TopLosers />


            </div>


        </div>

    );

}


export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Label,
} from "recharts";

import { FaChartPie } from "react-icons/fa";

import "./PortfolioChart.css";


const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#EC4899",
    "#6366F1",
    "#F97316",
];


function PortfolioChart() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD PORTFOLIO ALLOCATION
    // =====================================================

    useEffect(() => {
        loadPortfolio();
    }, []);


    const loadPortfolio = async () => {

        try {

            setLoading(true);
            setError("");


            const token =
                localStorage.getItem("finvestToken");


         const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/portfolio/allocation/data`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            const portfolioData =
                response.data || [];


            if (
                !Array.isArray(portfolioData) ||
                portfolioData.length === 0
            ) {

                setData([]);

                return;
            }


            // =================================================
            // TOTAL INVESTMENT
            // =================================================

            const total =
                portfolioData.reduce(
                    (sum, item) =>
                        sum +
                        Number(
                            item.Investment || 0
                        ),
                    0
                );


            if (total === 0) {

                setData([]);

                return;
            }


            // =================================================
            // FORMAT DATA
            // =================================================

            const formatted =
                portfolioData.map(
                    (item) => ({

                        name:
                            item.CompanyName,

                        value:
                            Number(
                                item.Investment || 0
                            ),

                        percent:
                            (
                                (
                                    Number(
                                        item.Investment || 0
                                    ) /
                                    total
                                ) *
                                100
                            ).toFixed(1),

                    })
                );


            setData(formatted);


        } catch (err) {

            console.error(
                "Portfolio Allocation Error:",
                err
            );


            if (
                err.response?.status === 401
            ) {

                setError(
                    "Your session has expired. Please log in again."
                );

            } else {

                setError(
                    "Unable to load portfolio allocation."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // TOTAL
    // =====================================================

    const totalInvestment =
        data.reduce(
            (sum, item) =>
                sum + item.value,
            0
        );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="portfolio-chart-card">

                <div className="portfolio-chart-loading">

                    Loading portfolio allocation...

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="portfolio-chart-card">

                <div className="portfolio-chart-error">

                    {error}

                </div>

            </div>

        );

    }


    // =====================================================
    // EMPTY
    // =====================================================

    if (data.length === 0) {

        return (

            <div className="portfolio-chart-card">

                <div className="portfolio-empty">

                    <FaChartPie />

                    <h2>
                        Portfolio Allocation
                    </h2>

                    <p>
                        No portfolio holdings
                        available yet.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN
    // =====================================================

    return (

        <div className="portfolio-chart-card">

            {/* =============================================
                HEADER
            ============================================= */}

            <div className="portfolio-chart-header">

                <div>

                    <h2>
                        Portfolio Allocation
                    </h2>

                    <p>
                        Distribution of your current
                        investments
                    </p>

                </div>

            </div>


            {/* =============================================
                CONTENT
            ============================================= */}

            <div className="portfolio-chart-content">


                {/* =========================================
                    DONUT
                ========================================= */}

                <div className="portfolio-donut">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"

                                innerRadius={58}
                                outerRadius={82}

                                paddingAngle={3}

                                stroke="none"
                            >

                                <Label
                                    position="center"

                                    value={`₹${(
                                        totalInvestment /
                                        100000
                                    ).toFixed(1)}L`}

                                    fill="#F8FAFC"

                                    fontSize={18}

                                    fontWeight="700"
                                />


                                {data.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <Cell
                                            key={
                                                item.name
                                            }

                                            fill={
                                                COLORS[
                                                    index %
                                                    COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip
                                contentStyle={{
                                    background:
                                        "#0F172A",

                                    border:
                                        "1px solid rgba(148,163,184,.15)",

                                    borderRadius:
                                        "10px",

                                    color:
                                        "#F8FAFC",
                                }}

                                formatter={
                                    (value) =>
                                        `₹${Number(
                                            value
                                        ).toLocaleString(
                                            "en-IN"
                                        )}`
                                }
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>


                {/* =========================================
                    HOLDINGS
                ========================================= */}

                <div className="portfolio-holdings">

                    <h3>
                        Top Holdings
                    </h3>


                    <div className="holdings-list">

                        {data.map(
                            (
                                stock,
                                index
                            ) => (

                                <div
                                    key={
                                        stock.name
                                    }

                                    className="holding-item"
                                >

                                    <div className="holding-name">

                                        <span
                                            className="holding-dot"

                                            style={{
                                                background:
                                                    COLORS[
                                                        index %
                                                        COLORS.length
                                                    ],
                                            }}
                                        />

                                        <span>
                                            {stock.name}
                                        </span>

                                    </div>


                                    <div className="holding-value">

                                        <strong>
                                            {stock.percent}%
                                        </strong>

                                        <small>
                                            ₹
                                            {stock.value.toLocaleString(
                                                "en-IN"
                                            )}
                                        </small>

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* =====================================
                        TOTAL
                    ===================================== */}

                    <div className="portfolio-total">

                        <span>
                            Total Portfolio
                        </span>

                        <strong>
                            ₹
                            {totalInvestment.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default PortfolioChart;
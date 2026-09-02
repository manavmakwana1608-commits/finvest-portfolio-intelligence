import { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import "./PortfolioGrowth.css";


function PortfolioGrowth() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD PORTFOLIO GROWTH
    // =====================================================

    useEffect(() => {
        loadPortfolioGrowth();
    }, []);


    const loadPortfolioGrowth = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("finvestToken");


            const response = await axios.get(
                "http://localhost:5000/api/portfolio/growth",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            const formattedData =
                Array.isArray(response.data)
                    ? response.data.map((item) => ({
                        day: new Date(
                            item.PriceDate
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                            }
                        ),

                        value: Number(
                            item.PortfolioValue || 0
                        ),
                    }))
                    : [];


            setData(formattedData);


        } catch (err) {

            console.error(
                "Portfolio Growth API Error:",
                err
            );


            if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please log in again."
                );

            } else {

                setError(
                    "Unable to load portfolio growth."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="growth-card">

                <div className="growth-state">
                    Loading portfolio growth...
                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="growth-card">

                <div className="growth-state error">
                    {error}
                </div>

            </div>

        );

    }


    // =====================================================
    // NO DATA
    // =====================================================

    if (data.length === 0) {

        return (

            <div className="growth-card">

                <div className="growth-state">

                    <h2>
                        Portfolio Growth
                    </h2>

                    <p>
                        No portfolio growth data available.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // CALCULATIONS
    // =====================================================

    const currentValue =
        data[data.length - 1].value;


    const previousValue =
        data.length > 1
            ? data[data.length - 2].value
            : currentValue;


    const growth =
        previousValue !== 0
            ? (
                (
                    (currentValue - previousValue) /
                    previousValue
                ) * 100
            ).toFixed(2)
            : "0.00";


    const growthPositive =
        Number(growth) >= 0;


    // =====================================================
    // MAIN
    // =====================================================

    return (

        <div className="growth-card">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="growth-header">

                <div>

                    <h2>
                        Portfolio Growth
                    </h2>

                    <p>
                        Portfolio value history
                    </p>

                </div>


                <div className="growth-summary">

                    <strong>
                        ₹
                        {currentValue.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                    <span
                        className={
                            growthPositive
                                ? "positive"
                                : "negative"
                        }
                    >

                        {growthPositive
                            ? "▲"
                            : "▼"}{" "}

                        {Math.abs(
                            Number(growth)
                        )}%

                    </span>

                </div>

            </div>


            {/* =================================================
                CHART
            ================================================= */}

            <div className="growth-chart">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={data}

                        margin={{
                            top: 10,
                            right: 12,
                            left: 0,
                            bottom: 0,
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="portfolioGrowthGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>


                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="3 3"
                            vertical={false}
                        />


                        <XAxis
                            dataKey="day"

                            stroke="#64748B"

                            tick={{
                                fill: "#94A3B8",
                                fontSize: 10,
                            }}

                            axisLine={{
                                stroke:
                                    "#334155",
                            }}

                            tickLine={false}
                        />


                        <YAxis
                            stroke="#64748B"

                            tick={{
                                fill: "#94A3B8",
                                fontSize: 10,
                            }}

                            tickFormatter={(value) =>
                                `₹${(
                                    value / 1000
                                ).toFixed(0)}K`
                            }

                            axisLine={false}

                            tickLine={false}

                            width={52}
                        />


                        <Tooltip
                            contentStyle={{
                                background:
                                    "#0F172A",

                                border:
                                    "1px solid rgba(148,163,184,0.15)",

                                borderRadius:
                                    "10px",

                                color:
                                    "#F8FAFC",
                            }}

                            labelStyle={{
                                color:
                                    "#94A3B8",
                            }}

                            formatter={(value) =>
                                `₹${Number(
                                    value
                                ).toLocaleString(
                                    "en-IN"
                                )}`
                            }
                        />


                        <Area
                            type="monotone"

                            dataKey="value"

                            stroke="#3B82F6"

                            strokeWidth={2.5}

                            fill="url(#portfolioGrowthGradient)"

                            dot={false}

                            activeDot={{
                                r: 5,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}


export default PortfolioGrowth;
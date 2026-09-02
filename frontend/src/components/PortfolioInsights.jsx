import { useEffect, useState } from "react";
import { getPortfolioInsights } from "../api/portfolioApi";

import "./PortfolioInsights.css";


function PortfolioInsights() {

    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD PORTFOLIO DATA
    // =====================================================

    useEffect(() => {

        loadInsights();

    }, []);


    const loadInsights = async () => {

        try {

            setLoading(true);

            const holdings = await getPortfolioInsights();

            console.log(
                "Portfolio Insights Holdings:",
                holdings
            );


            if (
                !Array.isArray(holdings) ||
                holdings.length === 0
            ) {

                setInsights([]);

                return;

            }


            // =================================================
            // CALCULATE PORTFOLIO TOTALS
            // =================================================

            const totalInvestment = holdings.reduce(
                (total, holding) =>
                    total +
                    Number(holding.Investment || 0),
                0
            );


            const totalCurrentValue = holdings.reduce(
                (total, holding) =>
                    total +
                    Number(holding.CurrentValue || 0),
                0
            );


            const totalProfit = holdings.reduce(
                (total, holding) =>
                    total +
                    Number(holding.Profit || 0),
                0
            );


            const portfolioReturn =
                totalInvestment > 0
                    ? (totalProfit / totalInvestment) * 100
                    : 0;


            // =================================================
            // BEST PERFORMING STOCK
            // =================================================

            const sortedHoldings = [...holdings].sort(
                (a, b) =>
                    Number(b.ReturnPercent || 0) -
                    Number(a.ReturnPercent || 0)
            );


            const bestHolding =
                sortedHoldings.length > 0
                    ? sortedHoldings[0]
                    : null;


            // =================================================
            // WORST PERFORMING STOCK
            // =================================================

            const worstHolding =
                sortedHoldings.length > 0
                    ? sortedHoldings[
                        sortedHoldings.length - 1
                    ]
                    : null;


            // =================================================
            // GENERATE INSIGHTS
            // =================================================

            const generatedInsights = [];


            // Portfolio return

            generatedInsights.push({
                type: "highlight",

                message: (
                    <>
                        Portfolio return is{" "}
                        <strong>
                            {portfolioReturn.toFixed(2)}%
                        </strong>.
                    </>
                ),
            });


            // Best performing stock

            if (bestHolding) {

                generatedInsights.push({
                    type: "normal",

                    message: (
                        <>
                            <strong>
                                {bestHolding.CompanyName}
                            </strong>{" "}
                            is currently your best-performing
                            stock with a{" "}
                            <strong>
                                {Number(
                                    bestHolding.ReturnPercent || 0
                                ).toFixed(2)}
                                % return
                            </strong>.
                        </>
                    ),
                });

            }


            // Number of holdings

            generatedInsights.push({
                type: "normal",

                message: (
                    <>
                        Your portfolio currently contains{" "}
                        <strong>
                            {holdings.length}
                        </strong>{" "}
                        holdings.
                    </>
                ),
            });


            // Portfolio value

            generatedInsights.push({
                type: "normal",

                message: (
                    <>
                        Total portfolio value is{" "}
                        <strong>
                            ₹
                            {totalCurrentValue.toLocaleString(
                                "en-IN",
                                {
                                    maximumFractionDigits: 2,
                                }
                            )}
                        </strong>.
                    </>
                ),
            });


            // Worst performer only if negative

            if (
                worstHolding &&
                Number(worstHolding.ReturnPercent || 0) < 0
            ) {

                generatedInsights.push({
                    type: "warning",

                    message: (
                        <>
                            <strong>
                                {worstHolding.CompanyName}
                            </strong>{" "}
                            is currently your weakest-performing
                            holding with a{" "}
                            <strong>
                                {Number(
                                    worstHolding.ReturnPercent || 0
                                ).toFixed(2)}
                                % return
                            </strong>.
                        </>
                    ),
                });

            }


            setInsights(generatedInsights);


        } catch (error) {

            console.error(
                "Portfolio Insights Error:",
                error
            );

            setInsights([]);

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="insights-card">

                <div className="insights-header">

                    <div>

                        <h2>
                            Portfolio Insights
                        </h2>

                        <p>
                            Key observations from your portfolio
                        </p>

                    </div>

                    <span className="insights-status">
                        Analyzing
                    </span>

                </div>


                <div className="insights-list">

                    <div className="insight-item">

                        <span className="insight-text">
                            Analyzing your portfolio...
                        </span>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO HOLDINGS
    // =====================================================

    if (insights.length === 0) {

        return (

            <div className="insights-card">

                <div className="insights-header">

                    <div>

                        <h2>
                            Portfolio Insights
                        </h2>

                        <p>
                            Key observations from your portfolio
                        </p>

                    </div>

                    <span className="insights-status">
                        No Data
                    </span>

                </div>


                <div className="insights-list">

                    <div className="insight-item">

                        <span className="insight-text">
                            No portfolio holdings are available
                            for analysis.
                        </span>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // DISPLAY INSIGHTS
    // =====================================================

    return (

        <div className="insights-card">

            {/* HEADER */}

            <div className="insights-header">

                <div>

                    <h2>
                        Portfolio Insights
                    </h2>

                    <p>
                        Key observations from your portfolio
                    </p>

                </div>


                <span className="insights-status">
                    Healthy
                </span>

            </div>


            {/* INSIGHTS */}

            <div className="insights-list">

                {insights.map(
                    (insight, index) => (

                        <div
                            key={index}
                            className={
                                insight.type === "highlight"
                                    ? "insight-item highlight"
                                    : insight.type === "warning"
                                        ? "insight-item warning"
                                        : "insight-item"
                            }
                        >

                            <span className="insight-text">

                                {insight.message}

                            </span>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}


export default PortfolioInsights;
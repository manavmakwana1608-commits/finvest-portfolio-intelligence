import { useEffect, useState } from "react";
import { getPortfolioHoldings } from "../api/portfolioApi";
import "./PortfolioHoldings.css";

function PortfolioHoldings() {

    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        loadHoldings();
    }, []);


    const loadHoldings = async () => {

        try {

            const data = await getPortfolioHoldings();

            setHoldings(data);

        } catch (err) {

            console.error(
                "Portfolio Holdings Error:",
                err
            );

        }

    };


    return (

        <div className="holdings-container">

            {/* HEADER */}

            <div className="holdings-header">

                <div>

                    <h2>
                        Portfolio Holdings
                    </h2>

                    <p>
                        Overview of your current investments
                    </p>

                </div>

                <span className="holdings-count">
                    {holdings.length} holdings
                </span>

            </div>


            {/* TABLE */}

            <div className="holdings-table-wrapper">

                <table className="holdings-table">

                    <thead>

                        <tr>

                            <th>Company</th>

                            <th>Qty</th>

                            <th>Avg Price</th>

                            <th>Current Price</th>

                            <th>Investment</th>

                            <th>Current Value</th>

                            <th>Profit</th>

                            <th>Return</th>

                        </tr>

                    </thead>


                    <tbody>

                        {holdings.length > 0 ? (

                            holdings.map((item, index) => {

                                const investment =
                                    Number(
                                        item.Investment || 0
                                    );

                                const profit =
                                    Number(
                                        item.Profit || 0
                                    );

                                const returnPercent =
                                    investment !== 0
                                        ? (
                                            (profit /
                                                investment) *
                                            100
                                        ).toFixed(2)
                                        : "0.00";


                                return (

                                    <tr key={index}>

                                        <td className="holding-company">
                                            {item.CompanyName}
                                        </td>


                                        <td>
                                            {item.Quantity}
                                        </td>


                                        <td>
                                            ₹
                                            {Number(
                                                item.AverageBuyPrice
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>


                                        <td className="current-price">
                                            ₹
                                            {Number(
                                                item.CurrentPrice
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>


                                        <td>
                                            ₹
                                            {investment.toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>


                                        <td>
                                            ₹
                                            {Number(
                                                item.CurrentValue
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    profit >= 0
                                                        ? "profit"
                                                        : "loss"
                                                }
                                            >

                                                {profit >= 0
                                                    ? "+"
                                                    : ""}

                                                ₹
                                                {Math.abs(
                                                    profit
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    profit >= 0
                                                        ? "profit"
                                                        : "loss"
                                                }
                                            >

                                                {profit >= 0
                                                    ? "+"
                                                    : ""}

                                                {returnPercent}%

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="empty-holdings"
                                >
                                    No portfolio holdings
                                    available.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}


export default PortfolioHoldings;
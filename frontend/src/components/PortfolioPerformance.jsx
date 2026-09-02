import { useEffect, useState } from "react";
import axios from "axios";

import "./PortfolioPerformance.css";

function PortfolioPerformance() {

    const [performance, setPerformance] = useState([]);

    useEffect(() => {
        loadPerformance();
    }, []);


    const loadPerformance = async () => {

        try {

            const token =
                localStorage.getItem("finvestToken");


            const res = await axios.get(
                "http://localhost:5000/api/portfolio/performance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setPerformance(res.data);

        } catch (err) {

            console.error(
                "Portfolio Performance API Error:",
                err
            );

        }

    };


    return (

        <div className="performance-card">

            {/* HEADER */}

            <div className="performance-header">

                <div>

                    <h2>
                        Portfolio Performance
                    </h2>

                    <p>
                        Returns and profit by holding
                    </p>

                </div>

                <span className="performance-count">
                    {performance.length} holdings
                </span>

            </div>


            {/* TABLE */}

            <div className="performance-table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Company
                            </th>

                            <th>
                                Return
                            </th>

                            <th>
                                Profit
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {performance.length > 0 ? (

                            performance.map((stock) => {

                                const returnPercent =
                                    Number(
                                        stock.ReturnPercent || 0
                                    );

                                const profit =
                                    Number(
                                        stock.Profit || 0
                                    );


                                return (

                                    <tr
                                        key={
                                            stock.CompanyName
                                        }
                                    >

                                        <td className="performance-company">
                                            {stock.CompanyName}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    returnPercent >= 0
                                                        ? "positive"
                                                        : "negative"
                                                }
                                            >

                                                {returnPercent >= 0
                                                    ? "+"
                                                    : ""}

                                                {returnPercent.toFixed(2)}%

                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    profit >= 0
                                                        ? "positive"
                                                        : "negative"
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

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="empty-performance"
                                >
                                    No performance data
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


export default PortfolioPerformance;
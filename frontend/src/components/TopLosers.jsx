import { useEffect, useState } from "react";
import axios from "axios";

import "./TopLosers.css";

function TopLosers() {

    const [losers, setLosers] = useState([]);

    useEffect(() => {
        loadLosers();
    }, []);


    const loadLosers = async () => {

        try {

            const token =
                localStorage.getItem("finvestToken");


            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/portfolio/performance`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            const sorted = [...res.data]
                .filter(
                    (stock) =>
                        Number(stock.ReturnPercent) < 0
                )
                .sort(
                    (a, b) =>
                        Number(a.ReturnPercent) -
                        Number(b.ReturnPercent)
                )
                .slice(0, 3);


            setLosers(sorted);

        } catch (err) {

            console.error(
                "Top Losers API Error:",
                err
            );

        }

    };


    return (

        <div className="losers-card">

            <div className="losers-header">

                <div>

                    <h2>
                        Top Losers
                    </h2>

                    <p>
                        Lowest-performing holdings
                    </p>

                </div>

                <span className="losers-label">
                    Top 3
                </span>

            </div>


            <div className="losers-list">

                {losers.length > 0 ? (

                    losers.map((stock, index) => (

                        <div
                            key={stock.CompanyName}
                            className="loser-row"
                        >

                            <div className="loser-left">

                                <span className="loser-rank">
                                    {index + 1}
                                </span>


                                <div>

                                    <h4>
                                        {stock.CompanyName}
                                    </h4>

                                    <p>
                                        ₹
                                        {Number(
                                            stock.CurrentPrice
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>

                                </div>

                            </div>


                            <div className="loser-right">

                                <div className="loss">

                                    {Number(
                                        stock.ReturnPercent
                                    ).toFixed(2)}
                                    %

                                </div>

                                <small>

                                    Loss ₹
                                    {Math.abs(
                                        Number(
                                            stock.Profit
                                        )
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </small>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="empty-losers">
                        No losing holdings available.
                    </div>

                )}

            </div>

        </div>

    );
}

export default TopLosers;
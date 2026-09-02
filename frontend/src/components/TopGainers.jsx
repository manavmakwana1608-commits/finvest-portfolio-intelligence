import { useEffect, useState } from "react";
import axios from "axios";

import "./TopGainers.css";

function TopGainers() {

    const [gainers, setGainers] = useState([]);

    useEffect(() => {
        loadGainers();
    }, []);


    const loadGainers = async () => {

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


            const sorted = [...res.data]
                .filter(
                    (stock) =>
                        Number(stock.ReturnPercent) >= 0
                )
                .sort(
                    (a, b) =>
                        Number(b.ReturnPercent) -
                        Number(a.ReturnPercent)
                )
                .slice(0, 3);


            setGainers(sorted);

        } catch (err) {

            console.error(
                "Top Gainers API Error:",
                err
            );

        }

    };


    return (

        <div className="gainers-card">

            <div className="gainers-header">

                <div>

                    <h2>
                        Top Gainers
                    </h2>

                    <p>
                        Best-performing holdings
                    </p>

                </div>

                <span className="gainers-label">
                    Top 3
                </span>

            </div>


            <div className="gainers-list">

                {gainers.length > 0 ? (

                    gainers.map((stock, index) => (

                        <div
                            key={stock.CompanyName}
                            className="gainer-row"
                        >

                            <div className="gainer-left">

                                <span className="gainer-rank">
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


                            <div className="gainer-right">

                                <div className="gain">
                                    +
                                    {Number(
                                        stock.ReturnPercent
                                    ).toFixed(2)}
                                    %
                                </div>

                                <small>
                                    Profit ₹
                                    {Number(
                                        stock.Profit
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </small>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="empty-gainers">
                        No gainers available.
                    </div>

                )}

            </div>

        </div>

    );
}

export default TopGainers;
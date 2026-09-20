import { useEffect, useState } from "react";
import { getRecentTransactions } from "../api/transactionApi";
import "./RecentTransactions.css";

function RecentTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await getRecentTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Recent Transactions Error:", error);
        }
    };

    return (
        <div className="transactions-container">

            <div className="transactions-header">

                <div>
                    <h2>Recent Transactions</h2>

                    <p>
                        Your latest portfolio activity
                    </p>
                </div>

                <span className="transaction-count">
                    {transactions.length} transactions
                </span>

            </div>


            <div className="transactions-table-wrapper">

                <table className="transactions-table">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Company</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>


                    <tbody>

                        {transactions.length > 0 ? (

                            transactions.map((item, index) => (

                                <tr key={index}>

                                    <td>
                                        {new Date(
                                            item.TransactionDate
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </td>


                                    <td className="company-name">
                                        {item.CompanyName}
                                    </td>


                                    <td>

                                        <span
                                            className={
                                                item.TransactionType === "BUY"
                                                    ? "transaction-type buy"
                                                    : "transaction-type sell"
                                            }
                                        >
                                            {item.TransactionType}
                                        </span>

                                    </td>


                                    <td>
                                        {item.Quantity}
                                    </td>


                                    <td className="transaction-price">
                                        ₹
                                        {Number(
                                            item.Price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="empty-transactions"
                                >
                                    No recent transactions
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

export default RecentTransactions;
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getStocks } from "../api/stockApi";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function StockChart() {

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        loadStocks();
    }, []);

    const loadStocks = async () => {
        try {
            const data = await getStocks();
            setStocks(data);
        } catch (err) {
            console.log(err);
        }
    };

    const chartData = {
        labels: stocks.map(stock => stock.StockSymbol),
        datasets: [
            {
                label: "Current Price",
                data: stocks.map(stock => stock.CurrentPrice),
                borderColor: "#3b82f6",
                backgroundColor: "#3b82f6",
                tension: 0.4
            }
        ]
    };

    return (
        <div
            style={{
                width: "90%",
                margin: "40px auto",
                background: "#1f2937",
                padding: "20px",
                borderRadius: "15px"
            }}
        >
            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                📈 Stock Performance
            </h2>

            <Line data={chartData} />
        </div>
    );
}

export default StockChart;
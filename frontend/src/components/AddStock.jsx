import { useState } from "react";
import axios from "axios";

import "./AddStock.css";


function AddStock() {

    const [stock, setStock] = useState({
        StockSymbol: "",
        CompanyName: "",
        Sector: "",
        Market: "NSE",
        CurrentPrice: "",
        MarketCap: "",
        PE_Ratio: "",
        DividendYield: "",
        IsActive: 1,
    });


    const [submitting, setSubmitting] = useState(false);


    const handleChange = (e) => {

        setStock({
            ...stock,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (submitting) {
            return;
        }


        try {

            setSubmitting(true);


            const stockData = {
                ...stock,

                CurrentPrice:
                    stock.CurrentPrice === ""
                        ? null
                        : Number(stock.CurrentPrice),

                MarketCap:
                    stock.MarketCap === ""
                        ? null
                        : Number(stock.MarketCap),

                PE_Ratio:
                    stock.PE_Ratio === ""
                        ? null
                        : Number(stock.PE_Ratio),

                DividendYield:
                    stock.DividendYield === ""
                        ? null
                        : Number(stock.DividendYield),

                IsActive: 1,
            };


            await axios.post(
                "http://localhost:5000/api/stocks",
                stockData
            );


            alert("Stock added successfully.");

            window.location.reload();


        } catch (err) {

            console.error(
                "Add Stock Error:",
                err
            );

            console.error(
                "Backend Response:",
                err.response?.data
            );


            alert(
                err.response?.data?.message ||
                err.response?.data?.sqlMessage ||
                "Error adding stock"
            );

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <div className="add-stock-form">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="add-stock-header">

                <div>

                    <h2>
                        Add New Stock
                    </h2>

                    <p>
                        Add a listed stock to the platform
                    </p>

                </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
                className="stock-form"
                onSubmit={handleSubmit}
            >


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <div className="form-section">

                    <div className="form-section-title">
                        Basic Information
                    </div>


                    <div className="form-grid">

                        {/* Stock Symbol */}

                        <div className="form-field">

                            <label htmlFor="StockSymbol">
                                Stock Symbol
                            </label>

                            <input
                                id="StockSymbol"
                                name="StockSymbol"
                                type="text"
                                placeholder="e.g. RELIANCE"
                                value={stock.StockSymbol}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Company Name */}

                        <div className="form-field">

                            <label htmlFor="CompanyName">
                                Company Name
                            </label>

                            <input
                                id="CompanyName"
                                name="CompanyName"
                                type="text"
                                placeholder="e.g. Reliance Industries"
                                value={stock.CompanyName}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Sector */}

                        <div className="form-field">

                            <label htmlFor="Sector">
                                Sector
                            </label>

                            <input
                                id="Sector"
                                name="Sector"
                                type="text"
                                placeholder="e.g. Energy"
                                value={stock.Sector}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Market */}

                        <div className="form-field">

                            <label htmlFor="Market">
                                Market
                            </label>

                            <select
                                id="Market"
                                name="Market"
                                value={stock.Market}
                                onChange={handleChange}
                                required
                            >

                                <option value="NSE">
                                    NSE
                                </option>

                                <option value="BSE">
                                    BSE
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MARKET DATA
                ================================================= */}

                <div className="form-section">

                    <div className="form-section-title">
                        Market Data
                    </div>


                    <div className="form-grid">

                        {/* Current Price */}

                        <div className="form-field">

                            <label htmlFor="CurrentPrice">
                                Current Price
                            </label>

                            <input
                                id="CurrentPrice"
                                type="number"
                                step="0.01"
                                min="0"
                                name="CurrentPrice"
                                placeholder="0.00"
                                value={stock.CurrentPrice}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Market Cap */}

                        <div className="form-field">

                            <label htmlFor="MarketCap">
                                Market Cap
                            </label>

                            <input
                                id="MarketCap"
                                type="number"
                                step="0.01"
                                min="0"
                                name="MarketCap"
                                placeholder="Optional"
                                value={stock.MarketCap}
                                onChange={handleChange}
                            />

                        </div>


                        {/* PE Ratio */}

                        <div className="form-field">

                            <label htmlFor="PE_Ratio">
                                P/E Ratio
                            </label>

                            <input
                                id="PE_Ratio"
                                type="number"
                                step="0.01"
                                min="0"
                                name="PE_Ratio"
                                placeholder="Optional"
                                value={stock.PE_Ratio}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Dividend Yield */}

                        <div className="form-field">

                            <label htmlFor="DividendYield">
                                Dividend Yield
                            </label>

                            <input
                                id="DividendYield"
                                type="number"
                                step="0.01"
                                min="0"
                                name="DividendYield"
                                placeholder="Optional"
                                value={stock.DividendYield}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ACTION
                ================================================= */}

                <div className="form-actions">

                    <button
                        type="submit"
                        className="submit-stock-button"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Adding..."
                            : "Add Stock"}

                    </button>

                </div>

            </form>

        </div>

    );

}


export default AddStock;
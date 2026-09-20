import { useEffect, useMemo, useState } from "react";

import {
    FaTrash,
    FaEdit,
    FaSearch,
    FaTimes,
} from "react-icons/fa";

import {
    getStocks,
    deleteStock,
} from "../api/stockApi";

import "./Stocks.css";


function Stocks({ onEdit }) {

    const [stocks, setStocks] = useState([]);

    const [search, setSearch] = useState("");

    const [sectorFilter, setSectorFilter] = useState("All");

    const [marketFilter, setMarketFilter] = useState("All");

    const [sortPrice, setSortPrice] = useState("None");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD STOCKS
    // =====================================================

    useEffect(() => {

        loadStocks();

    }, []);


    const loadStocks = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getStocks();

            setStocks(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Stocks API Error:",
                err
            );

            setError(
                "Unable to load stocks."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // DELETE STOCK
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this stock?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteStock(id);

            await loadStocks();

        } catch (err) {

            console.error(
                "Delete Stock Error:",
                err
            );

            setError(
                "Unable to delete stock."
            );

        }

    };


    // =====================================================
    // FILTER OPTIONS
    // =====================================================

    const sectors = useMemo(() => {

        return [
            "All",
            ...new Set(
                stocks
                    .map(
                        stock =>
                            stock.Sector
                    )
                    .filter(Boolean)
            ),
        ];

    }, [stocks]);


    const markets = useMemo(() => {

        return [
            "All",
            ...new Set(
                stocks
                    .map(
                        stock =>
                            stock.Market
                    )
                    .filter(Boolean)
            ),
        ];

    }, [stocks]);


    // =====================================================
    // FILTER + SORT
    // =====================================================

    const filteredStocks = useMemo(() => {

        const searchValue =
            search
                .trim()
                .toLowerCase();


        let result =
            stocks.filter(
                stock => {

                    const companyName =
                        String(
                            stock.CompanyName || ""
                        ).toLowerCase();


                    const symbol =
                        String(
                            stock.StockSymbol || ""
                        ).toLowerCase();


                    const searchMatch =
                        !searchValue ||
                        companyName.includes(
                            searchValue
                        ) ||
                        symbol.includes(
                            searchValue
                        );


                    const sectorMatch =
                        sectorFilter === "All" ||
                        stock.Sector ===
                            sectorFilter;


                    const marketMatch =
                        marketFilter === "All" ||
                        stock.Market ===
                            marketFilter;


                    return (
                        searchMatch &&
                        sectorMatch &&
                        marketMatch
                    );

                }
            );


        if (sortPrice === "Low") {

            result.sort(
                (a, b) =>
                    Number(
                        a.CurrentPrice || 0
                    ) -
                    Number(
                        b.CurrentPrice || 0
                    )
            );

        }


        if (sortPrice === "High") {

            result.sort(
                (a, b) =>
                    Number(
                        b.CurrentPrice || 0
                    ) -
                    Number(
                        a.CurrentPrice || 0
                    )
            );

        }


        return result;

    }, [
        stocks,
        search,
        sectorFilter,
        marketFilter,
        sortPrice,
    ]);


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {

        setSearch("");

        setSectorFilter("All");

        setMarketFilter("All");

        setSortPrice("None");

    };


    const hasFilters =
        search.trim() !== "" ||
        sectorFilter !== "All" ||
        marketFilter !== "All" ||
        sortPrice !== "None";


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="stocks-card">

                <div className="stocks-state">

                    Loading stocks...

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="stocks-card">

                <div className="stocks-state error">

                    <p>
                        {error}
                    </p>

                    <button
                        className="retry-button"
                        onClick={loadStocks}
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN
    // =====================================================

    return (

        <div className="stocks-card">


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="stocks-toolbar">


                {/* SEARCH */}

                <div className="stocks-search">

                    <FaSearch
                        className="stocks-search-icon"
                    />

                    <input
                        type="text"
                        placeholder="Search stocks..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    {search && (

                        <button
                            type="button"
                            className="clear-search"
                            onClick={() =>
                                setSearch("")
                            }
                            aria-label="Clear search"
                        >

                            <FaTimes />

                        </button>

                    )}

                </div>


                {/* SECTOR */}

                <select
                    className="filter-select"
                    value={sectorFilter}
                    onChange={(e) =>
                        setSectorFilter(
                            e.target.value
                        )
                    }
                >

                    {sectors.map(
                        sector => (

                            <option
                                key={sector}
                                value={sector}
                            >
                                {sector === "All"
                                    ? "All Sectors"
                                    : sector}
                            </option>

                        )
                    )}

                </select>


                {/* MARKET */}

                <select
                    className="filter-select"
                    value={marketFilter}
                    onChange={(e) =>
                        setMarketFilter(
                            e.target.value
                        )
                    }
                >

                    {markets.map(
                        market => (

                            <option
                                key={market}
                                value={market}
                            >
                                {market === "All"
                                    ? "All Markets"
                                    : market}
                            </option>

                        )
                    )}

                </select>


                {/* PRICE SORT */}

                <select
                    className="filter-select"
                    value={sortPrice}
                    onChange={(e) =>
                        setSortPrice(
                            e.target.value
                        )
                    }
                >

                    <option value="None">
                        Sort Price
                    </option>

                    <option value="Low">
                        Lowest Price
                    </option>

                    <option value="High">
                        Highest Price
                    </option>

                </select>


                {/* CLEAR */}

                {hasFilters && (

                    <button
                        type="button"
                        className="clear-filters"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                )}

            </div>


            {/* =================================================
                TABLE INFO
            ================================================= */}

            <div className="stocks-table-header">

                <span>

                    {filteredStocks.length}{" "}
                    {filteredStocks.length === 1
                        ? "stock"
                        : "stocks"}

                </span>

                {hasFilters && (
                    <span>
                        Filtered results
                    </span>
                )}

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="stocks-table-wrapper">

                <table className="stocks-table">

                    <thead>

                        <tr>

                            <th>
                                Symbol
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Sector
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Market
                            </th>

                            <th className="action-heading">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStocks.length > 0 ? (

                            filteredStocks.map(
                                stock => (

                                    <tr
                                        key={
                                            stock.StockID
                                        }
                                    >

                                        <td className="symbol">

                                            {stock.StockSymbol}

                                        </td>


                                        <td className="company">

                                            {stock.CompanyName}

                                        </td>


                                        <td>

                                            {stock.Sector}

                                        </td>


                                        <td className="price">

                                            ₹
                                            {Number(
                                                stock.CurrentPrice || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </td>


                                        <td>

                                            <span className="market">

                                                {stock.Market}

                                            </span>

                                        </td>


                                        <td className="actions">

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() =>
                                                    onEdit(
                                                        stock
                                                    )
                                                }
                                                title="Edit stock"
                                                aria-label="Edit stock"
                                            >

                                                <FaEdit />

                                            </button>


                                            <button
                                                type="button"
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        stock.StockID
                                                    )
                                                }
                                                title="Delete stock"
                                                aria-label="Delete stock"
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="empty-stocks"
                                >

                                    <div>

                                        <strong>
                                            No stocks found
                                        </strong>

                                        <p>
                                            Try adjusting your
                                            search or filters.
                                        </p>

                                        {hasFilters && (

                                            <button
                                                type="button"
                                                onClick={
                                                    clearFilters
                                                }
                                                className="empty-clear-button"
                                            >
                                                Clear filters
                                            </button>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}


export default Stocks;
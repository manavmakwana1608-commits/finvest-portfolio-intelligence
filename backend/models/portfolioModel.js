const db = require("../config/db");


// ================================
// GET ALL PORTFOLIOS
// ================================

exports.getAllPortfolios = (userId, callback) => {

    const sql = `
        SELECT *
        FROM portfolio
        WHERE UserID = ?
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ================================
// GET PORTFOLIO BY ID
// ================================

exports.getPortfolioById = (
    portfolioId,
    userId,
    callback
) => {

    const sql = `
        SELECT *
        FROM portfolio
        WHERE PortfolioID = ?
        AND UserID = ?
    `;

    db.query(
        sql,
        [
            portfolioId,
            userId
        ],
        callback
    );

};


// ================================
// CREATE PORTFOLIO
// ================================

exports.createPortfolio = (data, callback) => {

    const sql = `
        INSERT INTO portfolio
        (
            UserID,
            StockID,
            Quantity,
            AverageBuyPrice
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.UserID,
            data.StockID,
            data.Quantity,
            data.AverageBuyPrice
        ],
        callback
    );

};


// ================================
// UPDATE PORTFOLIO
// ================================

exports.updatePortfolio = (
    portfolioId,
    data,
    userId,
    callback
) => {

    const sql = `
        UPDATE portfolio
        SET
            StockID = ?,
            Quantity = ?,
            AverageBuyPrice = ?
        WHERE PortfolioID = ?
        AND UserID = ?
    `;

    db.query(
        sql,
        [
            data.StockID,
            data.Quantity,
            data.AverageBuyPrice,
            portfolioId,
            userId
        ],
        callback
    );

};


// ================================
// DELETE PORTFOLIO
// ================================

exports.deletePortfolio = (
    portfolioId,
    userId,
    callback
) => {

    const sql = `
        DELETE FROM portfolio
        WHERE PortfolioID = ?
        AND UserID = ?
    `;

    db.query(
        sql,
        [
            portfolioId,
            userId
        ],
        callback
    );

};


// ================================
// PORTFOLIO ALLOCATION
// ================================

exports.getPortfolioAllocation = (
    userId,
    callback
) => {

    const sql = `
        SELECT

            s.CompanyName,

            SUM(
                p.Quantity *
                p.AverageBuyPrice
            ) AS Investment

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        WHERE p.UserID = ?

        GROUP BY
            s.StockID,
            s.CompanyName

        ORDER BY Investment DESC
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ================================
// PORTFOLIO HOLDINGS
// ================================

exports.getPortfolioHoldings = (
    userId,
    callback
) => {

    const sql = `
        SELECT

            p.PortfolioID,

            s.StockID,

            s.StockSymbol,

            s.CompanyName,

            p.Quantity,

            p.AverageBuyPrice,

            s.CurrentPrice,

            (
                p.Quantity *
                p.AverageBuyPrice
            ) AS Investment,

            (
                p.Quantity *
                s.CurrentPrice
            ) AS CurrentValue,

            (
                (
                    p.Quantity *
                    s.CurrentPrice
                )
                -
                (
                    p.Quantity *
                    p.AverageBuyPrice
                )
            ) AS Profit,

            ROUND(
                (
                    (
                        s.CurrentPrice -
                        p.AverageBuyPrice
                    )
                    /
                    NULLIF(
                        p.AverageBuyPrice,
                        0
                    )
                ) * 100,
                2
            ) AS ReturnPercent

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        WHERE p.UserID = ?

        ORDER BY Profit DESC
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ================================
// PORTFOLIO PERFORMANCE
// ================================

exports.getPortfolioPerformance = (
    userId,
    callback
) => {

    const sql = `
        SELECT

            s.StockSymbol,

            s.CompanyName,

            p.Quantity,

            p.AverageBuyPrice,

            s.CurrentPrice,

            ROUND(
                (
                    (
                        s.CurrentPrice -
                        p.AverageBuyPrice
                    )
                    /
                    NULLIF(
                        p.AverageBuyPrice,
                        0
                    )
                ) * 100,
                2
            ) AS ReturnPercent,

            (
                (
                    p.Quantity *
                    s.CurrentPrice
                )
                -
                (
                    p.Quantity *
                    p.AverageBuyPrice
                )
            ) AS Profit

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        WHERE p.UserID = ?

        ORDER BY ReturnPercent DESC
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ================================
// PORTFOLIO GROWTH
// ================================

exports.getPortfolioGrowth = (
    userId,
    callback
) => {

    const sql = `
        SELECT

            h.PriceDate,

            ROUND(
                SUM(
                    p.Quantity *
                    h.Price
                ),
                2
            ) AS PortfolioValue

        FROM portfolio p

        JOIN stock_price_history h
            ON p.StockID = h.StockID

        WHERE p.UserID = ?

        GROUP BY
            h.PriceDate

        ORDER BY
            h.PriceDate ASC
    `;

    console.log(
        "Executing Portfolio Growth Query for User:",
        userId
    );

    db.query(
        sql,
        [userId],
        (err, results) => {

            if (err) {

                console.error(
                    "Portfolio Growth Query Error:",
                    err
                );

            } else {

                console.log(
                    "Portfolio Growth Query Successful"
                );

            }

            callback(
                err,
                results
            );

        }
    );

};


// ================================
// SECTOR-WISE INVESTMENT
// ================================

exports.getSectorInvestment = (
    userId,
    callback
) => {

    const sql = `
        SELECT

            s.Sector,

            SUM(
                p.Quantity *
                p.AverageBuyPrice
            ) AS Investment,

            SUM(
                p.Quantity *
                s.CurrentPrice
            ) AS CurrentValue,

            SUM(
                (
                    s.CurrentPrice -
                    p.AverageBuyPrice
                ) * p.Quantity
            ) AS Profit

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        WHERE p.UserID = ?

        GROUP BY
            s.Sector

        ORDER BY
            Investment DESC
    `;

    db.query(
        sql,
        [userId],
        callback
    );

};


// ================================
// USER INVESTMENT DISTRIBUTION
// ================================

exports.getUserInvestmentDistribution = (
    callback
) => {

    const sql = `
        SELECT

            u.UserID,

            u.FullName,

            COUNT(
                DISTINCT p.StockID
            ) AS NumberOfHoldings,

            SUM(
                p.Quantity *
                p.AverageBuyPrice
            ) AS Investment,

            SUM(
                p.Quantity *
                s.CurrentPrice
            ) AS PortfolioSize

        FROM users u

        LEFT JOIN portfolio p
            ON u.UserID = p.UserID

        LEFT JOIN stocks s
            ON p.StockID = s.StockID

        GROUP BY
            u.UserID,
            u.FullName

        ORDER BY
            Investment DESC
    `;

    db.query(
        sql,
        callback
    );

};


// ================================
// STOCK PROFITABILITY
// ================================

exports.getStockProfitability = (
    callback
) => {

    const sql = `
        SELECT

            s.StockSymbol,

            s.CompanyName,

            SUM(
                p.Quantity *
                p.AverageBuyPrice
            ) AS Investment,

            SUM(
                p.Quantity *
                s.CurrentPrice
            ) AS CurrentValue,

            SUM(
                (
                    s.CurrentPrice -
                    p.AverageBuyPrice
                ) * p.Quantity
            ) AS Profit,

            ROUND(
                (
                    SUM(
                        (
                            s.CurrentPrice -
                            p.AverageBuyPrice
                        ) * p.Quantity
                    )
                    /
                    NULLIF(
                        SUM(
                            p.Quantity *
                            p.AverageBuyPrice
                        ),
                        0
                    )
                ) * 100,
                2
            ) AS ReturnPercent

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        GROUP BY
            s.StockID,
            s.StockSymbol,
            s.CompanyName

        ORDER BY
            Profit DESC
    `;

    db.query(
        sql,
        callback
    );

};
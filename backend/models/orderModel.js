const db = require("../config/db");


// =======================================
// GET ALL ORDERS
// =======================================

exports.getAllOrders = (callback) => {

    const sql = `
        SELECT
            o.OrderID,
            o.UserID,
            o.StockID,
            s.CompanyName,
            o.OrderType,
            o.Quantity,
            o.Price,
            o.OrderDate
        FROM orders o
        JOIN stocks s
            ON o.StockID = s.StockID
        ORDER BY o.OrderDate ASC
    `;

    db.query(sql, callback);
};


// =======================================
// GET ORDER BY ID
// =======================================

exports.getOrderById = (id, callback) => {

    const sql = `
        SELECT
            o.OrderID,
            o.UserID,
            o.StockID,
            s.CompanyName,
            o.OrderType,
            o.Quantity,
            o.Price,
            o.OrderDate
        FROM orders o
        JOIN stocks s
            ON o.StockID = s.StockID
        WHERE o.OrderID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};


// =======================================
// CREATE ORDER
// =======================================

exports.createOrder = (data, callback) => {

    const sql = `
        INSERT INTO orders
        (
            UserID,
            StockID,
            OrderType,
            Quantity,
            Price
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.UserID,
            data.StockID,
            data.OrderType,
            data.Quantity,
            data.Price
        ],
        callback
    );
};


// =======================================
// UPDATE ORDER
// =======================================

exports.updateOrder = (id, data, callback) => {

    const sql = `
        UPDATE orders
        SET
            UserID = ?,
            StockID = ?,
            OrderType = ?,
            Quantity = ?,
            Price = ?
        WHERE OrderID = ?
    `;

    db.query(
        sql,
        [
            data.UserID,
            data.StockID,
            data.OrderType,
            data.Quantity,
            data.Price,
            id
        ],
        callback
    );
};


// =======================================
// DELETE ORDER
// =======================================

exports.deleteOrder = (id, callback) => {

    const sql = `
        DELETE FROM orders
        WHERE OrderID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};


// =======================================
// ORDER ANALYTICS
// =======================================


// Get Order KPIs

exports.getOrderAnalytics = (callback) => {

    const sql = `
        SELECT

            COUNT(*) AS TotalOrders,

            SUM(
                CASE
                    WHEN OrderType = 'BUY'
                    THEN 1
                    ELSE 0
                END
            ) AS BuyOrders,

            SUM(
                CASE
                    WHEN OrderType = 'SELL'
                    THEN 1
                    ELSE 0
                END
            ) AS SellOrders,

            SUM(
                Quantity * Price
            ) AS TotalTradingValue,

            AVG(
                Quantity * Price
            ) AS AverageOrderValue,

            SUM(
                Quantity
            ) AS TotalQuantityTraded

        FROM orders
    `;

    db.query(
        sql,
        callback
    );
};


// =======================================
// MOST TRADED STOCKS
// =======================================

exports.getMostTradedStocks = (callback) => {

    const sql = `
        SELECT

            s.StockSymbol,
            s.CompanyName,

            COUNT(o.OrderID) AS TotalOrders,

            SUM(
                o.Quantity
            ) AS TotalQuantity,

            SUM(
                o.Quantity * o.Price
            ) AS TradingValue

        FROM orders o

        JOIN stocks s
            ON o.StockID = s.StockID

        GROUP BY
            s.StockID,
            s.StockSymbol,
            s.CompanyName

        ORDER BY
            TradingValue DESC

        LIMIT 10
    `;

    db.query(
        sql,
        callback
    );
};


// =======================================
// MONTHLY TRADING TRENDS
// =======================================

exports.getMonthlyTradingTrends = (callback) => {

    const sql = `
        SELECT

            DATE_FORMAT(
                OrderDate,
                '%Y-%m'
            ) AS Month,

            COUNT(
                OrderID
            ) AS TotalOrders,

            SUM(
                Quantity
            ) AS TotalQuantity,

            SUM(
                Quantity * Price
            ) AS TradingValue

        FROM orders

        GROUP BY
            DATE_FORMAT(
                OrderDate,
                '%Y-%m'
            )

        ORDER BY
            Month ASC
    `;

    db.query(
        sql,
        callback
    );
};
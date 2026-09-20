const db = require("../config/db");


// ================================
// GET ALL TRANSACTIONS
// ================================

exports.getAllTransactions = (callback) => {

    const sql = `
        SELECT
            t.TransactionID,
            t.OrderID,
            o.UserID,
            o.StockID,
            s.StockSymbol,
            s.CompanyName,
            t.TransactionType,
            t.Quantity,
            t.Price,
            t.TransactionDate
        FROM transactions t
        JOIN orders o
            ON t.OrderID = o.OrderID
        JOIN stocks s
            ON o.StockID = s.StockID
        ORDER BY t.TransactionDate DESC
    `;

    db.query(sql, callback);

};


// ================================
// GET TRANSACTION BY ID
// ================================

exports.getTransactionById = (id, callback) => {

    const sql = `
        SELECT
            t.TransactionID,
            t.OrderID,
            o.UserID,
            o.StockID,
            s.StockSymbol,
            s.CompanyName,
            t.TransactionType,
            t.Quantity,
            t.Price,
            t.TransactionDate
        FROM transactions t
        JOIN orders o
            ON t.OrderID = o.OrderID
        JOIN stocks s
            ON o.StockID = s.StockID
        WHERE t.TransactionID = ?
    `;

    db.query(sql, [id], callback);

};


// ================================
// CREATE TRANSACTION
// ================================

exports.createTransaction = (data, callback) => {

    const sql = `
        INSERT INTO transactions
        (
            OrderID,
            TransactionType,
            Quantity,
            Price
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.OrderID,
            data.TransactionType,
            data.Quantity,
            data.Price
        ],
        callback
    );

};


// ================================
// UPDATE TRANSACTION
// ================================

exports.updateTransaction = (id, data, callback) => {

    const sql = `
        UPDATE transactions
        SET
            OrderID = ?,
            TransactionType = ?,
            Quantity = ?,
            Price = ?
        WHERE TransactionID = ?
    `;

    db.query(
        sql,
        [
            data.OrderID,
            data.TransactionType,
            data.Quantity,
            data.Price,
            id
        ],
        callback
    );

};


// ================================
// DELETE TRANSACTION
// ================================

exports.deleteTransaction = (id, callback) => {

    const sql = `
        DELETE FROM transactions
        WHERE TransactionID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ================================
// RECENT TRANSACTIONS
// ================================

exports.getRecentTransactions = (callback) => {

    const sql = `
        SELECT
            t.TransactionDate,
            s.CompanyName,
            t.TransactionType,
            t.Quantity,
            t.Price
        FROM transactions t
        JOIN orders o
            ON t.OrderID = o.OrderID
        JOIN stocks s
            ON o.StockID = s.StockID
        ORDER BY t.TransactionDate DESC
        LIMIT 5
    `;

    db.query(sql, callback);

};
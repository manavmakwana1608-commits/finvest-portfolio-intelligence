const db = require("../config/db");


// ===============================
// GET ALL ACTIVE STOCKS
// ===============================

exports.getAllStocks = (callback) => {

    const sql = `
        SELECT *
        FROM stocks
        WHERE IsActive = 1
    `;

    db.query(sql, callback);

};


// ===============================
// GET STOCK BY ID
// ===============================

exports.getStockById = (id, callback) => {

    const sql = `
        SELECT *
        FROM stocks
        WHERE StockID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ===============================
// CREATE STOCK
// ===============================

exports.createStock = (data, callback) => {

    const sql = `
        INSERT INTO stocks
        (
            StockSymbol,
            CompanyName,
            Sector,
            Market,
            CurrentPrice,
            MarketCap,
            PE_Ratio,
            DividendYield,
            IsActive
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.StockSymbol,
            data.CompanyName,
            data.Sector,
            data.Market,
            data.CurrentPrice,
            data.MarketCap,
            data.PE_Ratio,
            data.DividendYield,
            data.IsActive ?? 1
        ],
        callback
    );

};


// ===============================
// UPDATE STOCK
// ===============================

exports.updateStock = (id, data, callback) => {

    const sql = `
        UPDATE stocks
        SET
            StockSymbol = ?,
            CompanyName = ?,
            Sector = ?,
            Market = ?,
            CurrentPrice = ?,
            MarketCap = ?,
            PE_Ratio = ?,
            DividendYield = ?,
            IsActive = ?
        WHERE StockID = ?
    `;

    db.query(
        sql,
        [
            data.StockSymbol,
            data.CompanyName,
            data.Sector,
            data.Market,
            data.CurrentPrice,
            data.MarketCap,
            data.PE_Ratio,
            data.DividendYield,
            data.IsActive ?? 1,
            id
        ],
        callback
    );

};


// ===============================
// DELETE / DEACTIVATE STOCK
// ===============================

exports.deleteStock = (id, callback) => {

    const sql = `
        UPDATE stocks
        SET IsActive = 0
        WHERE StockID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};
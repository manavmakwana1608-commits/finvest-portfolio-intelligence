const db = require("../config/db");

// GET all investments
exports.getAllInvestments = (callback) => {
    const sql = "SELECT * FROM investments";
    db.query(sql, callback);
};

// GET investment by ID
exports.getInvestmentById = (id, callback) => {
    const sql = "SELECT * FROM investments WHERE InvestmentID = ?";
    db.query(sql, [id], callback);
};

// CREATE investment
exports.createInvestment = (data, callback) => {

    const sql = `
        INSERT INTO investments
        (
            AccountID,
            InvestmentName,
            InvestmentType,
            Units,
            PurchasePrice,
            CurrentPrice
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.AccountID,
            data.InvestmentName,
            data.InvestmentType,
            data.Units,
            data.PurchasePrice,
            data.CurrentPrice
        ],
        callback
    );
};

// UPDATE investment
exports.updateInvestment = (id, data, callback) => {

    const sql = `
        UPDATE investments
        SET
            AccountID = ?,
            InvestmentName = ?,
            InvestmentType = ?,
            Units = ?,
            PurchasePrice = ?,
            CurrentPrice = ?
        WHERE InvestmentID = ?
    `;

    db.query(
        sql,
        [
            data.AccountID,
            data.InvestmentName,
            data.InvestmentType,
            data.Units,
            data.PurchasePrice,
            data.CurrentPrice,
            id
        ],
        callback
    );
};

// DELETE investment
exports.deleteInvestment = (id, callback) => {

    const sql = "DELETE FROM investments WHERE InvestmentID = ?";

    db.query(sql, [id], callback);

};
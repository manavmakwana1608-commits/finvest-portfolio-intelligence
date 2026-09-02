const db = require("../config/db");

// Get all accounts
exports.getAllAccounts = (callback) => {
    const sql = "SELECT * FROM accounts";
    db.query(sql, callback);
};

// Get account by ID
exports.getAccountById = (id, callback) => {
    const sql = "SELECT * FROM accounts WHERE AccountID = ?";
    db.query(sql, [id], callback);
};

// Create account
exports.createAccount = (data, callback) => {
    const sql = `
        INSERT INTO accounts
        (UserID, AccountType, BrokerName, Balance, RiskLevel)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.UserID,
            data.AccountType,
            data.BrokerName,
            data.Balance,
            data.RiskLevel
        ],
        callback
    );
};

// Update account
exports.updateAccount = (id, data, callback) => {
    const sql = `
        UPDATE accounts
        SET
            UserID = ?,
            AccountType = ?,
            BrokerName = ?,
            Balance = ?,
            RiskLevel = ?
        WHERE AccountID = ?
    `;

    db.query(
        sql,
        [
            data.UserID,
            data.AccountType,
            data.BrokerName,
            data.Balance,
            data.RiskLevel,
            id
        ],
        callback
    );
};

// Delete account
exports.deleteAccount = (id, callback) => {
    const sql = "DELETE FROM accounts WHERE AccountID = ?";
    db.query(sql, [id], callback);
};
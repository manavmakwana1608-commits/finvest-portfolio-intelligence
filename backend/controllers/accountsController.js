const accountModel = require("../models/accountModel");

// Get all accounts
exports.getAllAccounts = (req, res) => {
    accountModel.getAllAccounts((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Get account by ID
exports.getAccountById = (req, res) => {
    accountModel.getAccountById(req.params.id, (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json(results[0]);
    });
};

// Create account
exports.createAccount = (req, res) => {
    accountModel.createAccount(req.body, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: "Account Created Successfully",
            id: result.insertId
        });
    });
};

// Update account
exports.updateAccount = (req, res) => {
    accountModel.updateAccount(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Account Updated Successfully"
        });
    });
};

// Delete account
exports.deleteAccount = (req, res) => {
    accountModel.deleteAccount(req.params.id, (err) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Account Deleted Successfully"
        });
    });
};
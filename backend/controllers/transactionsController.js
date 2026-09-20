const Transaction = require("../models/transactionModel");

// ================================
// GET ALL TRANSACTIONS
// ================================
exports.getAllTransactions = (req, res) => {
    Transaction.getAllTransactions((err, results) => {

        if (err) return res.status(500).json(err);

        res.json(results);
    });
};

// ================================
// GET TRANSACTION BY ID
// ================================
exports.getTransactionById = (req, res) => {

    Transaction.getTransactionById(req.params.id, (err, results) => {

        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(results[0]);
    });

};

// ================================
// CREATE TRANSACTION
// ================================
exports.createTransaction = (req, res) => {

    Transaction.createTransaction(req.body, (err, result) => {

        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: "Transaction Created Successfully",
            id: result.insertId
        });

    });

};

// ================================
// UPDATE TRANSACTION
// ================================
exports.updateTransaction = (req, res) => {

    Transaction.updateTransaction(
        req.params.id,
        req.body,
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Transaction Updated Successfully"
            });

        }
    );

};

// ================================
// DELETE TRANSACTION
// ================================
exports.deleteTransaction = (req, res) => {

    Transaction.deleteTransaction(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Transaction not found"
                });

            }

            res.json({
                message: "Transaction Deleted Successfully"
            });

        }
    );

};

// ================================
// RECENT TRANSACTIONS
// ================================
exports.getRecentTransactions = (req, res) => {

    Transaction.getRecentTransactions((err, results) => {

        if (err) return res.status(500).json(err);

        res.json(results);

    });

};
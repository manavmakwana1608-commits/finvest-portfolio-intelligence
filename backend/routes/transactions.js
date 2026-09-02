const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionsController");

// ================================
// RECENT TRANSACTIONS
// ================================
router.get("/recent", transactionController.getRecentTransactions);

// ================================
// CRUD ROUTES
// ================================
router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
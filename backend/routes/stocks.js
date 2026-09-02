const express = require("express");
const router = express.Router();

const stocksController = require("../controllers/stocksController");

// GET all stocks
router.get("/", stocksController.getAllStocks);

// GET stock by ID
router.get("/:id", stocksController.getStockById);

// CREATE stock
router.post("/", stocksController.createStock);

// UPDATE stock
router.put("/:id", stocksController.updateStock);

// DELETE stock
router.delete("/:id", stocksController.deleteStock);

module.exports = router;
const express = require("express");
const router = express.Router();

const investmentController = require("../controllers/investmentsController");

// GET all investments
router.get("/", investmentController.getAllInvestments);

// GET investment by ID
router.get("/:id", investmentController.getInvestmentById);

// CREATE investment
router.post("/", investmentController.createInvestment);

// UPDATE investment
router.put("/:id", investmentController.updateInvestment);

// DELETE investment
router.delete("/:id", investmentController.deleteInvestment);

module.exports = router;
const express = require("express");

const router = express.Router();

const portfolioController = require("../controllers/portfolioController");

const authMiddleware = require("../middleware/authMiddleware");


// =======================================
// PORTFOLIO ANALYTICS ROUTES
// =======================================


// =======================================
// USER INVESTMENT DISTRIBUTION
// =======================================

router.get(
    "/user-investment",
    authMiddleware,
    portfolioController.getUserInvestmentDistribution
);


// =======================================
// STOCK PROFITABILITY
// =======================================

router.get(
    "/stock-profitability",
    authMiddleware,
    portfolioController.getStockProfitability
);


// =======================================
// PORTFOLIO ALLOCATION
// =======================================

router.get(
    "/allocation/data",
    authMiddleware,
    portfolioController.getPortfolioAllocation
);


// =======================================
// PORTFOLIO HOLDINGS
// =======================================

router.get(
    "/holdings",
    authMiddleware,
    portfolioController.getPortfolioHoldings
);


// =======================================
// PORTFOLIO PERFORMANCE
// =======================================

router.get(
    "/performance",
    authMiddleware,
    portfolioController.getPortfolioPerformance
);


// =======================================
// PORTFOLIO GROWTH
// =======================================

router.get(
    "/growth",
    authMiddleware,
    portfolioController.getPortfolioGrowth
);


// =======================================
// SECTOR-WISE INVESTMENT
// =======================================

router.get(
    "/sector-investment",
    authMiddleware,
    portfolioController.getSectorInvestment
);


// =======================================
// CRUD ROUTES
// =======================================


// GET ALL PORTFOLIOS

router.get(
    "/",
    authMiddleware,
    portfolioController.getAllPortfolios
);


// CREATE PORTFOLIO

router.post(
    "/",
    authMiddleware,
    portfolioController.createPortfolio
);


// UPDATE PORTFOLIO

router.put(
    "/:id",
    authMiddleware,
    portfolioController.updatePortfolio
);


// DELETE PORTFOLIO

router.delete(
    "/:id",
    authMiddleware,
    portfolioController.deletePortfolio
);


// =======================================
// GET PORTFOLIO BY ID
// MUST BE LAST
// =======================================

router.get(
    "/:id",
    authMiddleware,
    portfolioController.getPortfolioById
);


// =======================================
// EXPORT ROUTER
// =======================================

module.exports = router;
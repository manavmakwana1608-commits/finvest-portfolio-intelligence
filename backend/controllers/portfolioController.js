const Portfolio = require("../models/portfolioModel");


// =======================================
// GET ALL PORTFOLIOS
// =======================================

exports.getAllPortfolios = (req, res) => {

    const userId = req.user.UserID;

    Portfolio.getAllPortfolios(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Get All Portfolios Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// GET PORTFOLIO BY ID
// =======================================

exports.getPortfolioById = (req, res) => {

    const userId = req.user.UserID;
    const portfolioId = req.params.id;

    Portfolio.getPortfolioById(
        portfolioId,
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Get Portfolio By ID Error:",
                    err
                );

                return res.status(500).json(err);
            }

            if (results.length === 0) {

                return res.status(404).json({
                    message: "Portfolio not found"
                });

            }

            res.json(results[0]);

        }
    );

};


// =======================================
// CREATE PORTFOLIO
// =======================================

exports.createPortfolio = (req, res) => {

    const userId = req.user.UserID;

    const data = {

        UserID: userId,

        StockID: req.body.StockID,

        Quantity: req.body.Quantity,

        AverageBuyPrice:
            req.body.AverageBuyPrice

    };

    Portfolio.createPortfolio(
        data,
        (err, result) => {

            if (err) {

                console.error(
                    "Create Portfolio Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.status(201).json({

                message:
                    "Portfolio Created Successfully",

                id: result.insertId

            });

        }
    );

};


// =======================================
// UPDATE PORTFOLIO
// =======================================

exports.updatePortfolio = (req, res) => {

    const userId = req.user.UserID;

    const portfolioId =
        req.params.id;

    Portfolio.updatePortfolio(
        portfolioId,
        req.body,
        userId,
        (err, result) => {

            if (err) {

                console.error(
                    "Update Portfolio Error:",
                    err
                );

                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message:
                        "Portfolio not found"
                });

            }

            res.json({

                message:
                    "Portfolio Updated Successfully"

            });

        }
    );

};


// =======================================
// DELETE PORTFOLIO
// =======================================

exports.deletePortfolio = (req, res) => {

    const userId = req.user.UserID;

    const portfolioId =
        req.params.id;

    Portfolio.deletePortfolio(
        portfolioId,
        userId,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete Portfolio Error:",
                    err
                );

                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message:
                        "Portfolio not found"
                });

            }

            res.json({

                message:
                    "Portfolio Deleted Successfully"

            });

        }
    );

};


// =======================================
// PORTFOLIO ALLOCATION
// =======================================

exports.getPortfolioAllocation = (req, res) => {

    const userId = req.user.UserID;

    console.log(
        "Portfolio Allocation User ID:",
        userId
    );

    Portfolio.getPortfolioAllocation(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Portfolio Allocation Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// PORTFOLIO HOLDINGS
// =======================================

exports.getPortfolioHoldings = (req, res) => {

    const userId = req.user.UserID;

    console.log(
        "Portfolio Holdings User ID:",
        userId
    );

    Portfolio.getPortfolioHoldings(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Portfolio Holdings Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// PORTFOLIO PERFORMANCE
// =======================================

exports.getPortfolioPerformance = (req, res) => {

    const userId = req.user.UserID;

    console.log(
        "Portfolio Performance User ID:",
        userId
    );

    Portfolio.getPortfolioPerformance(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Portfolio Performance Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// PORTFOLIO GROWTH
// =======================================

exports.getPortfolioGrowth = (req, res) => {

    const userId = req.user.UserID;

    console.log(
        "Portfolio Growth User ID:",
        userId
    );

    Portfolio.getPortfolioGrowth(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Portfolio Growth Error:",
                    err
                );

                return res.status(500).json({
                    code: err.code,
                    errno: err.errno,
                    sqlMessage: err.sqlMessage,
                    message: err.message
                });

            }

            res.json(results);

        }
    );

};


// =======================================
// SECTOR-WISE INVESTMENT
// =======================================

exports.getSectorInvestment = (req, res) => {

    const userId = req.user.UserID;

    Portfolio.getSectorInvestment(
        userId,
        (err, results) => {

            if (err) {

                console.error(
                    "Sector Investment Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// USER INVESTMENT DISTRIBUTION
// =======================================

exports.getUserInvestmentDistribution = (
    req,
    res
) => {

    Portfolio.getUserInvestmentDistribution(
        (err, results) => {

            if (err) {

                console.error(
                    "User Investment Distribution Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};


// =======================================
// STOCK PROFITABILITY
// =======================================

exports.getStockProfitability = (
    req,
    res
) => {

    Portfolio.getStockProfitability(
        (err, results) => {

            if (err) {

                console.error(
                    "Stock Profitability Error:",
                    err
                );

                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};  
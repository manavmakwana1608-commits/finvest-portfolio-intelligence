const orderModel = require("../models/orderModel");


// =======================================
// GET ALL ORDERS
// =======================================

exports.getAllOrders = (req, res) => {

    orderModel.getAllOrders((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// =======================================
// GET ORDER BY ID
// =======================================

exports.getOrderById = (req, res) => {

    orderModel.getOrderById(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }

            res.json(result[0]);

        }
    );

};


// =======================================
// CREATE ORDER
// =======================================

exports.createOrder = (req, res) => {

    orderModel.createOrder(
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Order Created Successfully",
                id: result.insertId
            });

        }
    );

};


// =======================================
// UPDATE ORDER
// =======================================

exports.updateOrder = (req, res) => {

    orderModel.updateOrder(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }

            res.json({
                message: "Order Updated Successfully"
            });

        }
    );

};


// =======================================
// DELETE ORDER
// =======================================

exports.deleteOrder = (req, res) => {

    orderModel.deleteOrder(
        req.params.id,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Order not found"
                });

            }

            res.json({
                message: "Order Deleted Successfully"
            });

        }
    );

};


// =======================================
// ORDER ANALYTICS
// =======================================

exports.getOrderAnalytics = (req, res) => {

    orderModel.getOrderAnalytics(
        (err, result) => {

            if (err) {

                console.error(
                    "Order Analytics Error:",
                    err
                );

                return res.status(500).json(err);

            }

            res.json(
                result[0] || {
                    TotalOrders: 0,
                    BuyOrders: 0,
                    SellOrders: 0,
                    TotalTradingValue: 0,
                    AverageOrderValue: 0,
                    TotalQuantityTraded: 0
                }
            );

        }
    );

};


// =======================================
// MOST TRADED STOCKS
// =======================================

exports.getMostTradedStocks = (req, res) => {

    orderModel.getMostTradedStocks(
        (err, result) => {

            if (err) {

                console.error(
                    "Most Traded Stocks Error:",
                    err
                );

                return res.status(500).json(err);

            }

            res.json(result);

        }
    );

};


// =======================================
// MONTHLY TRADING TRENDS
// =======================================

exports.getMonthlyTradingTrends = (req, res) => {

    orderModel.getMonthlyTradingTrends(
        (err, result) => {

            if (err) {

                console.error(
                    "Monthly Trading Trends Error:",
                    err
                );

                return res.status(500).json(err);

            }

            res.json(result);

        }
    );

};
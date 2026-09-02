const express = require("express");

const router = express.Router();

const orderController = require("../controllers/ordersController");


// =================================
// GET ALL ORDERS
// =================================

router.get(
    "/",
    orderController.getAllOrders
);


// =================================
// ORDER ANALYTICS
// =================================

router.get(
    "/analytics",
    orderController.getOrderAnalytics
);


// =================================
// MOST TRADED STOCKS
// =================================

router.get(
    "/most-traded",
    orderController.getMostTradedStocks
);


// =================================
// MONTHLY TRADING TRENDS
// =================================

router.get(
    "/monthly-trends",
    orderController.getMonthlyTradingTrends
);


// =================================
// GET ORDER BY ID
// KEEP THIS LAST
// =================================

router.get(
    "/:id",
    orderController.getOrderById
);


// =================================
// CREATE ORDER
// =================================

router.post(
    "/",
    orderController.createOrder
);


// =================================
// UPDATE ORDER
// =================================

router.put(
    "/:id",
    orderController.updateOrder
);


// =================================
// DELETE ORDER
// =================================

router.delete(
    "/:id",
    orderController.deleteOrder
);


module.exports = router;
const stockModel = require("../models/stockModel");

// ===============================
// GET ALL STOCKS
// ===============================
exports.getAllStocks = (req, res) => {

    stockModel.getAllStocks((err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// ===============================
// GET STOCK BY ID
// ===============================
exports.getStockById = (req, res) => {

    stockModel.getStockById(req.params.id, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        res.json(result[0]);

    });

};

// ===============================
// CREATE STOCK
// ===============================
exports.createStock = (req, res) => {

    stockModel.createStock(req.body, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Stock Created Successfully",
            id: result.insertId
        });

    });

};

// ===============================
// UPDATE STOCK
// ===============================
exports.updateStock = (req, res) => {

    stockModel.updateStock(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Stock Updated Successfully"
            });

        }
    );

};

// ===============================
// DELETE STOCK
// ===============================
exports.deleteStock = (req, res) => {

    stockModel.deleteStock(req.params.id, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        res.json({
            message: "Stock Deleted Successfully"
        });

    });

};
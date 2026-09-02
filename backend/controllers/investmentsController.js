const Investment = require("../models/investmentModel");

// GET all investments
exports.getAllInvestments = (req, res) => {

    Investment.getAllInvestments((err, results) => {

        if (err) return res.status(500).json(err);

        res.json(results);
    });
};

// GET investment by ID
exports.getInvestmentById = (req, res) => {

    Investment.getInvestmentById(req.params.id, (err, results) => {

        if (err) return res.status(500).json(err);

        res.json(results[0]);
    });
};

// CREATE investment
exports.createInvestment = (req, res) => {

    Investment.createInvestment(req.body, (err, result) => {

        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: "Investment Created Successfully",
            id: result.insertId
        });
    });
};

// UPDATE investment
exports.updateInvestment = (req, res) => {

    Investment.updateInvestment(
        req.params.id,
        req.body,
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Investment Updated Successfully"
            });
        }
    );
};

// DELETE investment
exports.deleteInvestment = (req, res) => {

    Investment.deleteInvestment(req.params.id, (err) => {

        if (err) return res.status(500).json(err);

        res.json({
            message: "Investment Deleted Successfully"
        });
    });
};
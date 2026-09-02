    const Dashboard = require("../models/dashboardModel");

    exports.getDashboard = (req, res) => {
        const userId = req.user.UserID;

        console.log("Dashboard User ID:", userId);

        Dashboard.getDashboard(userId, (err, results) => {
            if (err) {
                console.error("Dashboard Error:", err);

                return res.status(500).json({
                    code: err.code,
                    errno: err.errno,
                    sqlMessage: err.sqlMessage,
                    message: err.message
                });
            }

            res.json(results);
        });
    };
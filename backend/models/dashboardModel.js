const db = require("../config/db");


// =======================================
// GET DASHBOARD
// =======================================

exports.getDashboard = (userId, callback) => {

    const sql = `
        SELECT

            p.UserID,

            SUM(
                p.Quantity *
                p.AverageBuyPrice
            ) AS TotalInvestment,

            SUM(
                p.Quantity *
                s.CurrentPrice
            ) AS CurrentValue,

            SUM(
                (
                    s.CurrentPrice -
                    p.AverageBuyPrice
                ) *
                p.Quantity
            ) AS Profit,

            ROUND(
                (
                    SUM(
                        (
                            s.CurrentPrice -
                            p.AverageBuyPrice
                        ) *
                        p.Quantity
                    )
                    /
                    NULLIF(
                        SUM(
                            p.Quantity *
                            p.AverageBuyPrice
                        ),
                        0
                    )
                ) * 100,
                2
            ) AS ProfitPercent

        FROM portfolio p

        JOIN stocks s
            ON p.StockID = s.StockID

        WHERE p.UserID = ?

        GROUP BY p.UserID;
    `;


    console.log(
        "Executing Dashboard Query for User:",
        userId
    );


    db.query(
        sql,
        [userId],
        (err, results) => {

            if (err) {

                console.error(
                    "Dashboard Query Error:",
                    err
                );

            } else {

                console.log(
                    "Dashboard Query Successful"
                );

            }

            callback(
                err,
                results
            );

        }
    );

};
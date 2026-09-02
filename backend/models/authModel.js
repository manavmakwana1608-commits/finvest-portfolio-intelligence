const db = require("../config/db");

// =============================
// Find User By Email
// =============================

exports.findUserByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE Email = ?
    `;

    db.query(sql, [email], callback);

};

// =============================
// Register User
// =============================

exports.registerUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (
            FullName,
            Email,
            Password,
            Phone,
            City,
            State,
            Status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.FullName,
            user.Email,
            user.Password,
            user.Phone,
            user.City,
            user.State,
            user.Status
        ],
        callback
    );

};

// =============================
// Find User By ID
// =============================

exports.findUserById = (id, callback) => {

    const sql = `
        SELECT
            UserID,
            FullName,
            Email,
            Phone,
            City,
            State,
            SignupDate,
            Status
        FROM users
        WHERE UserID = ?
    `;

    db.query(sql, [id], callback);

};
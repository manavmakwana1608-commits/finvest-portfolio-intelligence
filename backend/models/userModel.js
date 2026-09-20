const db = require("../config/db");


// =============================
// USERS CRUD
// =============================


// =============================
// GET ALL USERS
// =============================

exports.getAllUsers = (callback) => {

    db.query(
        "SELECT * FROM users",
        callback
    );

};


// =============================
// GET USER BY ID
// =============================

exports.getUserById = (id, callback) => {

    db.query(
        "SELECT * FROM users WHERE UserID = ?",
        [id],
        callback
    );

};


// =============================
// CREATE USER
// =============================

exports.createUser = (user, callback) => {

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
            user.Status || "Active"
        ],
        callback
    );

};


// =============================
// UPDATE USER
// =============================

exports.updateUser = (id, user, callback) => {

    const sql = `
        UPDATE users
        SET
            FullName = ?,
            Email = ?,
            Phone = ?,
            City = ?,
            State = ?,
            Status = ?
        WHERE UserID = ?
    `;

    db.query(
        sql,
        [
            user.FullName,
            user.Email,
            user.Phone,
            user.City,
            user.State,
            user.Status,
            id
        ],
        callback
    );

};


// =============================
// DEACTIVATE USER
// =============================

exports.deleteUser = (id, callback) => {

    const sql = `
        UPDATE users
        SET Status = 'Inactive'
        WHERE UserID = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// =============================
// AUTHENTICATION
// =============================


// =============================
// FIND USER BY EMAIL
// =============================

exports.findUserByEmail = (email, callback) => {

    db.query(
        "SELECT * FROM users WHERE Email = ?",
        [email],
        callback
    );

};


// =============================
// REGISTER USER
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
            user.Status || "Active"
        ],
        callback
    );

};
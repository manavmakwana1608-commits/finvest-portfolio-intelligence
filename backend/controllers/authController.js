const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("../models/authModel");

// =============================
// REGISTER
// =============================

exports.register = async (req, res) => {
    try {
        const {
            FullName,
            Email,
            Password,
            Phone,
            City,
            State
        } = req.body;

        if (!FullName || !Email || !Password) {
            return res.status(400).json({
                message: "Full Name, Email and Password are required."
            });
        }

        authModel.findUserByEmail(Email, async (err, result) => {
            if (err) {
                console.error("Register - Database Error:", err);

                return res.status(500).json({
                    message: "Database error."
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "Email already exists."
                });
            }

            const hashedPassword = await bcrypt.hash(Password, 10);

            const newUser = {
                FullName,
                Email,
                Password: hashedPassword,
                Phone: Phone || null,
                City: City || null,
                State: State || null,
                Status: "Active"
            };

            authModel.registerUser(newUser, (err, result) => {
                if (err) {
                    console.error("Register - Insert Error:", err);

                    return res.status(500).json({
                        message: "Unable to register user."
                    });
                }

                return res.status(201).json({
                    message: "User registered successfully.",
                    userId: result.insertId
                });
            });
        });
    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

// =============================
// LOGIN
// =============================

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({
                message: "Email and Password are required."
            });
        }

        authModel.findUserByEmail(Email, async (err, result) => {
            if (err) {
                console.error("Login - Database Error:", err);

                return res.status(500).json({
                    message: "Database error."
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            const user = result[0];

            const passwordMatch = await bcrypt.compare(
                Password,
                user.Password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            if (user.Status !== "Active") {
                return res.status(403).json({
                    message: "User account is not active."
                });
            }

            const jwtSecret = process.env.JWT_SECRET;

            if (!jwtSecret) {
                console.error("JWT_SECRET is missing from .env");

                return res.status(500).json({
                    message: "Authentication configuration error."
                });
            }

            const token = jwt.sign(
                {
                    UserID: user.UserID,
                    Email: user.Email
                },
                jwtSecret,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: "Login successful.",
                token,
                user: {
                    UserID: user.UserID,
                    FullName: user.FullName,
                    Email: user.Email,
                    Phone: user.Phone,
                    City: user.City,
                    State: user.State,
                    Status: user.Status
                }
            });
        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
};

// =============================
// GET PROFILE
// =============================

exports.getProfile = (req, res) => {
    const userId = req.user.UserID;

    authModel.findUserById(userId, (err, result) => {
        if (err) {
            console.error("Profile - Database Error:", err);

            return res.status(500).json({
                message: "Database error."
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            user: result[0]
        });
    });
};
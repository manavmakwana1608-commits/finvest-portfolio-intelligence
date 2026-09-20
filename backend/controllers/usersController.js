const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =============================
// USERS CRUD
// =============================


// =============================
// GET ALL USERS
// =============================

exports.getAllUsers = (req, res) => {

    userModel.getAllUsers((err, result) => {

        if (err) {

            console.error(
                "Get All Users Error:",
                err
            );

            return res.status(500).json({
                message: "Unable to fetch users."
            });

        }

        res.json(result);

    });

};


// =============================
// GET USER BY ID
// =============================

exports.getUserById = (req, res) => {

    userModel.getUserById(
        req.params.id,
        (err, result) => {

            if (err) {

                console.error(
                    "Get User Error:",
                    err
                );

                return res.status(500).json({
                    message: "Unable to fetch user."
                });

            }


            if (result.length === 0) {

                return res.status(404).json({
                    message: "User not found"
                });

            }


            res.json(result[0]);

        }
    );

};


// =============================
// CREATE USER
// =============================

exports.createUser = async (req, res) => {

    try {

        const {
            FullName,
            Email,
            Password,
            Phone,
            City,
            State,
            Status
        } = req.body;


        // =============================
        // VALIDATION
        // =============================

        if (!FullName || !Email || !Password) {

            return res.status(400).json({
                message:
                    "Full name, email and password are required."
            });

        }


        // =============================
        // CHECK EMAIL
        // =============================

        userModel.findUserByEmail(
            Email,
            async (err, result) => {

                if (err) {

                    console.error(
                        "Find User Error:",
                        err
                    );

                    return res.status(500).json({
                        message:
                            "Unable to check user email."
                    });

                }


                // =============================
                // DUPLICATE EMAIL
                // =============================

                if (result.length > 0) {

                    return res.status(400).json({
                        message:
                            "Email already exists"
                    });

                }


                // =============================
                // HASH PASSWORD
                // =============================

                const hashedPassword =
                    await bcrypt.hash(
                        Password,
                        10
                    );


                // =============================
                // CREATE USER OBJECT
                // =============================

                const newUser = {

                    FullName,

                    Email,

                    Password:
                        hashedPassword,

                    Phone,

                    City,

                    State,

                    Status:
                        Status || "Active"

                };


                // =============================
                // INSERT USER
                // =============================

                userModel.createUser(
                    newUser,
                    (err, result) => {

                        if (err) {

                            console.error(
                                "Create User Database Error:",
                                err
                            );

                            return res.status(500).json({
                                message:
                                    "Unable to create user.",
                                error:
                                    err.message
                            });

                        }


                        // =============================
                        // SUCCESS
                        // =============================

                        res.status(201).json({

                            message:
                                "User Created Successfully",

                            id:
                                result.insertId

                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error(
            "Create User Error:",
            error
        );

        res.status(500).json({

            message:
                error.message ||
                "Unable to create user."

        });

    }

};


// =============================
// UPDATE USER
// =============================

exports.updateUser = (
    req,
    res
) => {

    userModel.updateUser(
        req.params.id,
        req.body,
        (err, result) => {

            if (err) {

                console.error(
                    "Update User Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Unable to update user."
                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    message:
                        "User not found"
                });

            }


            res.json({

                message:
                    "User Updated Successfully"

            });

        }
    );

};


// =============================
// DELETE / DEACTIVATE USER
// =============================

exports.deleteUser = (
    req,
    res
) => {

    userModel.deleteUser(
        req.params.id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete User Error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Unable to delete user."
                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    message:
                        "User not found"
                });

            }


            res.json({

                message:
                    "User Deleted Successfully"

            });

        }
    );

};


// =============================
// REGISTER USER
// =============================

exports.register = async (
    req,
    res
) => {

    try {

        const {

            FullName,

            Email,

            Password,

            Phone,

            City,

            State

        } = req.body;


        // =============================
        // VALIDATION
        // =============================

        if (
            !FullName ||
            !Email ||
            !Password
        ) {

            return res.status(400).json({

                message:
                    "Full name, email and password are required."

            });

        }


        // =============================
        // CHECK EMAIL
        // =============================

        userModel.findUserByEmail(
            Email,
            async (err, result) => {

                if (err) {

                    return res.status(500).json(err);

                }


                if (
                    result.length > 0
                ) {

                    return res.status(400).json({

                        message:
                            "Email already exists"

                    });

                }


                // =============================
                // HASH PASSWORD
                // =============================

                const hashedPassword =
                    await bcrypt.hash(
                        Password,
                        10
                    );


                // =============================
                // NEW USER
                // =============================

                const newUser = {

                    FullName,

                    Email,

                    Password:
                        hashedPassword,

                    Phone,

                    City,

                    State,

                    Status:
                        "Active"

                };


                // =============================
                // REGISTER
                // =============================

                userModel.registerUser(
                    newUser,
                    (err) => {

                        if (err) {

                            console.error(
                                "Register User Error:",
                                err
                            );

                            return res.status(500).json({
                                message:
                                    "Unable to register user."
                            });

                        }


                        res.status(201).json({

                            message:
                                "User Registered Successfully"

                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error(
            "Register Error:",
            error
        );

        res.status(500).json({

            message:
                error.message

        });

    }

};
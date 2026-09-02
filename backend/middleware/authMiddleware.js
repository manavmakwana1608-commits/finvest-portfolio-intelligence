const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required."
            });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Invalid authorization format."
            });
        }

        const token = parts[1];

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error("JWT_SECRET is missing from .env");

            return res.status(500).json({
                message: "Authentication configuration error."
            });
        }

        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired."
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token."
            });
        }

        console.error("Authentication Middleware Error:", error);

        return res.status(500).json({
            message: "Authentication error."
        });
    }
};

module.exports = authMiddleware;
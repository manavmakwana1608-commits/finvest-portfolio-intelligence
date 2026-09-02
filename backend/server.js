const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const stockRoutes = require("./routes/stocks");
const investmentRoutes = require("./routes/investments");
const accountRoutes = require("./routes/accounts");
const portfolioRoutes = require("./routes/portfolio");
const transactionRoutes = require("./routes/transactions");
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug information
console.log("Server file:", __filename);
console.log("Auth routes type:", typeof authRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// Existing routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("FinVest Backend API Running");
});

// Temporary authentication route test
app.post("/api/auth-test", (req, res) => {
    res.json({
        message: "Authentication test route is working"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
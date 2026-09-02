const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MYSQL ERROR");
    console.error("Code:", err.code);
    console.error("Errno:", err.errno);
    console.error("Message:", err.message);
    console.error(err);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
  connection.release();
});

module.exports = db;
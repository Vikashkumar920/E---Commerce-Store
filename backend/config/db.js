const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
   password: "Virat@#$99",
    database: "codealpha_ecommerce"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL Database Connected!");
});

module.exports = db;
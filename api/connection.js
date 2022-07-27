const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected succesfully");
  connection.release();
});

module.exports = pool;

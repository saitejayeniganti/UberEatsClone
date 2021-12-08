const mysql = require("mysql");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "cmpe-275-final.ctmje2cow18t.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "UberEats",
});

// let dbConfig = {
//   host: "ubereatsdb273.ctmje2cow18t.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "password",
//   database: "UberEats",
// };
// exports.sqlConnection = function () {
//   var mySqlConnection;
//   if (mySqlConnection == null) {
//     mySqlConnection = mysql.createConnection(dbConfig);
//   }
//   mySqlConnection.connect(function (err) {
//     if (err) {
//       console.log("Error connecting to database." + err.stack);
//       return null;
//     }
//   });
//   console.log("Successfully connected to database.");
//   return mySqlConnection;
// };
// index.connection.query = util.promisify(index.connection.query);

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === "ECONNREFUSED") {
      console.error("Connection refused by Database");
    }
    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Connection limit reached for Database");
    }
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connection was closed.");
    }
  }
  if (connection) connection.release();
});

pool.query = util.promisify(pool.query);

module.exports = pool;

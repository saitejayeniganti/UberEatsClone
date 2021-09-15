var mysql = require("mysql");
let dbConfig = {
  host: "ubereatsdb273.ctmje2cow18t.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "UberEats",
};
exports.sqlConnection = function () {
  var mySqlConnection;
  if (mySqlConnection == null) {
    mySqlConnection = mysql.createConnection(dbConfig);
  }
  mySqlConnection.connect(function (err) {
    if (err) {
      console.log("Error connecting to database." + err.stack);
      return null;
    }
  });
  console.log("Successfully connected to database.");
  return mySqlConnection;
};

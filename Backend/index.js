const express = require("express");
var customerRoute = require("./routes/customerRoute");
var restaurantRoute = require("./routes/restaurantRoute");
var app = express();
var cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Without using pool
// const dbConnection = require("./database/dbConnection");
// exports.connection = dbConnection.sqlConnection();

app.listen(3000, () => {
  console.log("Server Running in port 3000");
});
app.use("/ubereats/customer", customerRoute);
app.use("/ubereats/restaurant", restaurantRoute);
exports.app = app;

var express = require("express");
var app = express.Router();
const customerService = require("../services/customerService");

app.post("/signup", (request, response) => {
  // const data = await customerService.signup(request);
  // response.status(data.status).json(data.body);
  console.log(1);
  customerService.signupcallback(request, (error, result) => {
    if (error) {
      //
      const message = error.message ? error.message : "Internal Server Error";
      const code = error.statusCode ? error.statusCode : 500;
      response.status(code).json({ message });
    } else {
      response.status(200).json({ result });
    }
  });
});

app.put("", async (request, response) => {
  const data = await customerService.updateCustomer(request);
  response.status(data.status).json(data.body);
});

module.exports = app;

var express = require("express");
var app = express.Router();
const restaurantService = require("../services/restaurantService");

app.post("/signup", (request, response) => {
  // const data = await restaurantService.signup(request);
  // response.status(data.status).json(data.body);
  console.log(1);
  restaurantService.signupcallback(request, (error, result) => {
    if (error) {
      //
      const message = error.message ? error.message : "Internal Server Error";
      const code = error.statusCode ? error.statusCode : 500;
      response.status(code).json({ message });
    } else {
      console.log(6);
      response.status(200).json({ result });
    }
  });
});

//*********************INSERT_DISHES******************** */
app.post("/dishes", async (request, response) => {
  const data = await restaurantService.insertDish(request);
  response.status(data.status).json(data.body);
});

//*********************UPDATE_RESTAURANT******************** */
app.put("", async (request, response) => {
  const data = await restaurantService.updateRestaurant(request);
  response.status(data.status).json(data.body);
});

module.exports = app;

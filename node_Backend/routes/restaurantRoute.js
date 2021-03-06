var express = require("express");
var app = express.Router();
const restaurantService = require("../services/restaurantService");

//*********************RESTAURANT_SIGNUP_USING_CALLBACK******************** */
app.post("/signup", (request, response) => {
  // const data = await restaurantService.signup(request);
  // response.status(data.status).json(data.body);
  restaurantService.signupcallback(request, (error, result) => {
    if (error) {
      const message = error.message ? error.message : "Internal Server Error";

      const code = error.status ? error.statusCode : 500;
      response.status(code).json({ message: message, code: error.code });
    } else {
      response.status(200).json({ result });
    }
  });
});

//*********************RESTAURANT_LOGIN******************** */
app.post("/login", (request, response) => {
  restaurantService.logincallback(request, (error, result) => {
    if (error) {
      const message = error.message ? error.message : "Internal Server Error";
      const code = error.statusCode ? error.statusCode : 500;
      response.status(code).json({ message });
    } else {
      response.status(200).json({ result });
    }
  });
});

//*********************GET_RESTAURANT_BY_USERNAME******************** */
app.get("/login", async (request, response) => {
  const data = await restaurantService.getRestaurantByUsername(request);
  // console.log(data.body);
  response.status(data.status).json(data.body);
});

//*********************GET_RESTAURANT_BY_ID******************** */
app.get("", async (request, response) => {
  const data = await restaurantService.getRestaurantByID(request);
  // console.log(data.body);
  response.status(data.status).json(data.body);
});

//*********************UPDATE_RESTAURANT******************** */
app.put("", async (request, response) => {
  const data = await restaurantService.updateRestaurant(request);
  response.status(data.status).json(data.body);
});

//*********************INSERT_DISHES******************** */
app.post("/dishes", async (request, response) => {
  const data = await restaurantService.insertDish(request);
  response.status(data.status).json(data.body);
});

//*********************GET_DISHES******************** */
app.get("/dishes", async (request, response) => {
  const data = await restaurantService.getDishes(request);
  response.status(data.status).json(data.body);
});

//*********************GET_ORDERS******************** */
app.get("/order", async (request, response) => {
  const data = await restaurantService.getOrdersForRestaurant(request);
  response.status(data.status).json(data.body);
});

//**********************GET_RESTAURANTS_BY_LOCATION */
app.post("/location", async (request, response) => {
  // console.log(request.body);
  const data = await restaurantService.getRestaurantsByLocation(request);
  response.status(data.status).json(data.body);
});

//**********************GET_DISH_DETAILS***********/
app.get("/dishdetails", async (request, response) => {
  const data = await restaurantService.getDishDetails(request);
  response.status(data.status).json(data.body);
});

//**********************UPDATE DISH***********/
app.put("/dishdetails", async (request, response) => {
  const data = await restaurantService.updateDish(request);
  response.status(data.status).json(data.body);
});
module.exports = app;

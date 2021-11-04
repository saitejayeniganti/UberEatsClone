var express = require("express");
var app = express.Router();
const restaurantService = require("../services/restaurantService");

//*********************Signup******************** */
app.post("/signup", async (request, response) => {
  const data = await restaurantService.signup(request);

  response.status(data.status).json(data.body);
});

//*********************login******************** */
app.post("/login", async (request, response) => {
  const data = await restaurantService.login(request);

  response.status(data.status).json(data.body);
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

//*********************GET_ORDERS******************** */************************************************************************************************ */
app.get("/order", async (request, response) => {
  const data = await restaurantService.getOrdersForRestaurant(request);
  response.status(data.status).json(data.body);
});

//**********************GET_RESTAURANTS_BY_LOCATION */*********************************************************************************************** */
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

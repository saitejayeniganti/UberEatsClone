var express = require("express");
var app = express.Router();
const customerService = require("../services/customerService");

//*********************CUSTOMER_SIGNUP_USING_CALLBACK******************** */
app.post("/signup", (request, response) => {
  // const data = await customerService.signup(request);
  // response.status(data.status).json(data.body);

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

//*********************CUSTOMER_LOGIN******************** */
app.post("/login", (request, response) => {
  customerService.logincallback(request, (error, result) => {
    if (error) {
      const message = error.message ? error.message : "Internal Server Error";
      const code = error.statusCode ? error.statusCode : 500;
      response.status(code).json({ message });
    } else {
      response.status(200).json({ result });
    }
  });
});

//*********************GET_CUSTOMER_BY_USERNAME******************** */
app.get("/login", async (request, response) => {
  // console.log(request.query);
  const data = await customerService.getCustomerByUsername(request);
  // console.log(data.body);
  response.status(data.status).json(data.body);
});

//*********************GET_CUSTOMER_BY_ID******************** */
app.get("", async (request, response) => {
  // console.log(request.query);
  const data = await customerService.getCustomerByID(request);
  // console.log(data.body);
  response.status(data.status).json(data.body);
});

//*********************UPDATE_CUSTOMER******************** */
app.put("", async (request, response) => {
  const data = await customerService.updateCustomer(request);
  response.status(data.status).json(data.body);
});

//*********************INSERT_ORDER******************** */
app.post("/order", async (request, response) => {
  const data = await customerService.insertOrder(request);
  response.status(data.status).json(data.body);
});

//*********************UPDATE_ORDER******************** */
app.put("/order", async (request, response) => {
  const data = await customerService.updateOrder(request);
  response.status(data.status).json(data.body);
});

//*********************UPDATE_ORDER_STATUS******************** */
app.put("/updateorder", async (request, response) => {
  console.log(request.body);
  const data = await customerService.updateOrderStatus(request);
  response.status(data.status).json(data.body);
});

//*********************GET_ORDERS******************** */
app.get("/order", async (request, response) => {
  const data = await customerService.getOrdersForCustomer(request);
  response.status(data.status).json(data.body);
});

//*********************GET_FAVORITES******************** */
app.post("/favorite", async (request, response) => {
  const data = await customerService.getFavoritesForCustomer(request);
  response.status(data.status).json(data.body);
});

//*********************MAKE_FAVORITE******************** */
app.put("/makefavorite", async (request, response) => {
  const data = await customerService.makeFavoriteCustomer(request);
  response.status(data.status).json(data.body);
});

//*********************MAKE_UN_FAVORITE******************** */
app.put("/makeunfavorite", async (request, response) => {
  const data = await customerService.makeUnFavoriteCustomer(request);
  response.status(data.status).json(data.body);
});

//******************CART*********************** */
app.get("/cart", async (request, response) => {
  const data = await customerService.getCart(request);
  response.status(data.status).json(data.body);
});

//******************CHECKOUTCART*********************** */
app.get("/checkoutcart", async (request, response) => {
  const data = await customerService.getCheckoutCart(request);
  response.status(data.status).json(data.body);
});

//*********************ADD ADDRESS******************** */
app.post("/addaddress", async (request, response) => {
  const data = await customerService.addAddress(request);
  response.status(data.status).json(data.body);
});

//*********************ADD ADDRESS******************** */
app.put("/deleteCart", async (request, response) => {
  const data = await customerService.deleteCart(request);
  response.status(data.status).json(data.body);
});

module.exports = app;

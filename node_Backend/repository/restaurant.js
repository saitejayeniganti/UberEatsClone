//const index = require("../index");
const pool = require("../database/dbConnection");
const customerSchema = require("../database/schema/customer").createModel();
const addressSchema = require("../database/schema/address").createModel();
const dishSchema = require("../database/schema/dish").createModel();
const favoriteSchema = require("../database/schema/favorite").createModel();
const orderSchema = require("../database/schema/order").createModel();
const orderItemSchema = require("../database/schema/orderItem").createModel();
const restaurantSchema = require("../database/schema/restaurant").createModel();
const queries = require("../queries/restaurant");

exports.signup = async (restaurant) => {
  try {
    let response = await queries.insertRestaurant(restaurantSchema, restaurant);

    // pool.query(queries.insertRestaurant, [
    //   restaurant.name,
    //   restaurant.email_id,
    //   restaurant.password,
    //   restaurant.location,
    // ]);
    return { status: 200, body: response.values };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.login = async (restaurant) => {
  try {
    let response = await queries.loginRestaurant(restaurantSchema, restaurant);

    return { status: 200, body: response.values };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateRestaurant = async (restaurant) => {
  try {
    let response = await queries.updateRestaurant(restaurantSchema, restaurant);
    return { status: 200, body: response.values };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_RESTAURANT_BY_USERNAME******************** */
exports.getRestaurantByUsername = async (params) => {
  try {
    let response = await queries.getRestaurantByUsername(
      restaurantSchema,
      params
    );
    return { status: 200, body: response[0] };
  } catch (error) {
    // console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_RESTAURANT_BY_ID******************** */
exports.getRestaurantByID = async (params) => {
  try {
    let response = await queries.getRestaurantByID(restaurantSchema, params);
  } catch (error) {
    // console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.insertDish = async (dish) => {
  try {
    // console.log(dish);
    let response = await queries.insertDish(dishSchema, dish);

    // pool.query(queries.insertDish, [
    //   dish.restaurant_id,
    //   dish.name,
    //   dish.category,
    //   dish.cuisine,
    //   dish.price,
    //   dish.main_ingredients,
    //   dish.description,
    //   dish.type,
    //   dish.url,
    // ]);
    return { status: 200, body: response.values };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_DISHES******************** */
exports.getDishes = async (params) => {
  try {
    let response = await queries.getDishes(dishSchema, params.id);
    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_ORDERS******************** */
exports.getOrdersForRestaurant = async (params) => {
  try {
    let response = await queries.getOrdersForRestaurant(params.id);

    // pool.query(queries.getOrdersForRestaurant, [
    //   params.id,
    // ]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//**********************GET_RESTAURANTS_BY_LOCATION *************/
exports.getRestaurantsByLocation = async (latlng) => {
  try {
    let response = await pool.query(queries.getRestaurantsByLocation, [
      latlng.latitude,
      latlng.longitude,
      latlng.latitude,
      latlng.id,
      latlng.type,
      latlng.type,
      latlng.dType,
      latlng.dType,
    ]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//**********************GET_DISH_DETAILS**************/
exports.getDishDetails = async (data) => {
  try {
    let response = await queries.getDishDetails(dishSchema, data);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//**********************Update_DISH**************/
exports.updateDish = async (data) => {
  try {
    let response = await queries.updateDish(dishSchema, data);
    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

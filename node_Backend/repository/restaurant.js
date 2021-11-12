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

    let res = {};
    res.result = response._id;
    return { status: 200, body: res };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.login = async (restaurant) => {
  try {
    let response = await queries.loginRestaurant(restaurantSchema, restaurant);
    let result = {};
    result.id = response[0]._id;
    result.name = response[0].name;
    result.location = response[0].location;
    result.suite = response[0].suite;
    result.email_id = response[0].email_id;
    result.password = response[0].password;
    result.image_url = response[0].image_url;
    result.star_time = response[0].start_time;
    result.end_time = response[0].end_time;

    return { status: 200, body: { result } };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateRestaurant = async (restaurant) => {
  try {
    let response = await queries.updateRestaurant(restaurantSchema, restaurant);

    let result = {};
    result.id = response._id;
    result.name = response.name;
    result.location = response.location;
    result.suite = response.suite;
    result.email_id = response.email_id;
    result.password = response.password;
    result.image_url = response.image_url;
    result.star_time = response.start_time;
    result.end_time = response.end_time;
    result.contact = response.contact;
    result.delivery_type = response.delivery_type;

    return { status: 200, body: { result } };
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
    let result = {};
    result.id = response[0]._id;
    result.name = response[0].name;
    result.location = response[0].location;
    result.suite = response[0].suite;
    result.email_id = response[0].email_id;
    result.password = response[0].password;
    result.image_url = response[0].image_url;
    result.star_time = response[0].start_time;
    result.end_time = response[0].end_time;

    return { status: 200, body: result };
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
    let result = {};
    result.id = response[0]._id;
    result.name = response[0].name;
    result.location = response[0].location;
    result.suite = response[0].suite;
    result.email_id = response[0].email_id;
    result.password = response[0].password;
    result.image_url = response[0].image_url;
    result.star_time = response[0].start_time;
    result.end_time = response[0].end_time;

    return { status: 200, body: result };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.insertDish = async (dish) => {
  try {
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

    let result = [];

    for (let dish of response) {
      let res = {};
      res.restaurent_id = dish.restaurent_id._id;
      res.name = dish.name;
      res.category = dish.category;
      res.cuisine = dish.cuisine;
      res.price = dish.price;
      res.main_ingredients = dish.main_ingredients;
      res.description = dish.description;
      res.type = dish.type;
      res.id = dish._id;
      res.image_url = dish.image_url;
      result.push(res);
    }

    return { status: 200, body: result };
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
    console.log(data);
    let response = await queries.getDishDetails(dishSchema, data);
    let result = {};
    result.id = response[0]._id;
    (result.resutaurent_id = response[0].restaurent_id),
      (result.name = response[0].name),
      (result.category = response[0].category),
      (result.cuisine = response[0].cuisine),
      (result.price = response[0].price),
      (result.main_ingredients = response[0].main_ingredients),
      (result.description = response[0].description),
      (result.type = response[0].type),
      (result.image_url = response[0].image_url);
    return { status: 200, body: [result] };
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
    console.log(response);
    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

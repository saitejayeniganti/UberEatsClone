//const index = require("../index");
const pool = require("../database/dbConnection");
const queries = require("../queries/restaurant");

exports.signup = async (restaurant) => {
  try {
    let response = await pool.query(queries.insertRestaurant, [
      restaurant.name,
      restaurant.email_id,
      restaurant.password,
      restaurant.location,
    ]);
    return { status: 200, body: response.values };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.signupCallback = (restaurant, callback) => {
  try {
    pool.query(
      queries.insertRestaurant,
      [
        restaurant.name,
        restaurant.email,
        restaurant.password,
        restaurant.address,
        restaurant.suite,
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.logincallback = (restaurant, callback) => {
  try {
    pool.query(
      queries.loginRestaurant,
      [restaurant.email_id, restaurant.password],
      (error, result) => {
        callback(error, result[0]);
      }
    );
  } catch (err) {
    callback(err);
  }
};

exports.updateRestaurant = async (restaurant) => {
  try {
    let response = await pool.query(queries.updateRestaurant, [
      restaurant.name,
      restaurant.email_id,
      restaurant.password,
      restaurant.location,
      restaurant.delivery_type,
      restaurant.contact,
      restaurant.star_time,
      restaurant.end_time,
      restaurant.id,
    ]);
    return { status: 200, body: response.values };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.insertDish = async (dish) => {
  try {
    let response = await pool.query(queries.insertDish, [
      dish.restaurant_id,
      dish.name,
      dish.category,
      dish.cuisine,
      dish.price,
      dish.main_ingredients,
      dish.description,
      dish.type,
    ]);
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
    let response = await pool.query(queries.getDishes, [params.id]);

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
    let response = await pool.query(queries.getOrdersForRestaurant, [
      params.id,
    ]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

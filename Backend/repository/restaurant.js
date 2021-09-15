const index = require("../index");
const queries = require("../queries/restaurant");
exports.signup = async (restaurant) => {
  try {
    let response = await index.connection.query(queries.insertRestaurant, [
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
  console.log(3);
  try {
    index.connection.query(
      queries.insertRestaurant,
      [
        restaurant.name,
        restaurant.email_id,
        restaurant.password,
        restaurant.location,
      ],
      (error, result) => {
        console.log(4);
        callback(error, result);
      }
    );
  } catch (err) {
    callback(err);
  }
};

exports.insertDish = async (dish) => {
  try {
    let response = await index.connection.query(queries.insertDish, [
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

exports.updateRestaurant = async (restaurant) => {
  try {
    let response = await index.connection.query(queries.updateRestaurant, [
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

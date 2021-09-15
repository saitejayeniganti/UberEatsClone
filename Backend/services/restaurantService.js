const restaurantRepo = require("../repository/restaurant");

exports.signup = async (request) => {
  let response = await restaurantRepo.signup(request.body);
  return response;
};

exports.signupcallback = (request, callback) => {
  try {
    restaurantRepo.signupCallback(request.body, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(error, result.insertId);
      }
    });
  } catch (err) {
    callback(err);
  }
};

exports.logincallback = (request, callback) => {
  try {
    restaurantRepo.logincallback(request.body, (error, result) => {
      if (error) {
        callback(error);
      } else {
        callback(error, result);
      }
    });
  } catch (err) {
    callback(err);
  }
};

exports.updateRestaurant = async (request) => {
  let response = await restaurantRepo.updateRestaurant(request.body);
  return response;
};

//*********************INSERT_DISHES******************** */
exports.insertDish = async (request) => {
  let response = await restaurantRepo.insertDish(request.body);
  return response;
};

//*********************GET_DISHES******************** */
exports.getDishes = async (request) => {
  let response = await restaurantRepo.getDishes(request.query);
  return response;
};

//*********************GET_ORDERS******************** */
exports.getOrdersForRestaurant = async (request) => {
  let response = await restaurantRepo.getOrdersForRestaurant(request.query);
  return response;
};

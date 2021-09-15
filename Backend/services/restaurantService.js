const restaurantRepo = require("../repository/restaurant");

exports.signup = async (request) => {
  let response = await restaurantRepo.signup(request.body);
  return response;
};

exports.signupcallback = (request, callback) => {
  console.log(2);
  try {
    restaurantRepo.signupCallback(request.body, (error, result) => {
      if (error) {
        //
        callback(error);
      } else {
        console.log(5);
        callback(error, result.insertId);
      }
    });
  } catch (err) {
    //
    callback(err);
  }
};

exports.insertDish = async (request) => {
  let response = await restaurantRepo.insertDish(request.body);
  return response;
};

exports.updateRestaurant = async (request) => {
  let response = await restaurantRepo.updateRestaurant(request.body);
  return response;
};

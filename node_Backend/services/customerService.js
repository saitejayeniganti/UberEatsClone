const customerRepo = require("../repository/customer");

exports.signup = async (request) => {
  let response = await customerRepo.signup(request.body);
  return response;
};

exports.signupcallback = (request, callback) => {
  try {
    customerRepo.signupCallback(request.body, (error, result) => {
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
    customerRepo.logincallback(request.body, (error, result) => {
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

exports.updateCustomer = async (request) => {
  let response = await customerRepo.updateCustomer(request.body);
  return response;
};

//*********************INSERT_ORDER******************** */
exports.insertOrder = async (request) => {
  let response = await customerRepo.insertOrder(request.body);
  return response;
};

//*********************UPDATE_ORDER******************** */
exports.updateOrder = async (request) => {
  let response = await customerRepo.updateOrder(request.body);
  return response;
};

//*********************GET_ORDERS******************** */
exports.getOrdersForCustomer = async (request) => {
  let response = await customerRepo.getOrdersForCustomer(request.query);
  return response;
};

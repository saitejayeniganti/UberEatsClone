const customerRepo = require("../repository/customer");

exports.signup = async (request) => {
  let response = await customerRepo.signup(request.body);
  return response;
};

exports.signupcallback = (request, callback) => {
  try {
    customerRepo.signup(request.body, (error, result) => {
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

exports.logincallback = async (request) => {
  let response = await customerRepo.logincallback(request.body);
  return response;
};

//*********************GET_CUSTOMER_DETAILS_BY_USERNAME******************** */
exports.getCustomerByUsername = async (request) => {
  let response = await customerRepo.getCustomerByUsername(request.query);
  return response;
};

//*********************UPDATE_CUSTOMER******************** */
exports.updateCustomer = async (request) => {
  let response = await customerRepo.updateCustomer(request.body);
  return response;
};

//*********************GET_CUSTOMER_DETAILS_BY_ID******************** */
exports.getCustomerByID = async (request) => {
  let response = await customerRepo.getCustomerByID(request.query);
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

//*********************UPDATE_ORDER_STATUS******************** */
exports.updateOrderStatus = async (request) => {
  let response = await customerRepo.updateOrderStatus(request.body);
  return response;
};

//*********************GET_ORDERS******************** */
exports.getOrdersForCustomer = async (request) => {
  let response = await customerRepo.getOrdersForCustomer(request.query);
  return response;
};

//*********************GET_FAVORITES******************** */
exports.getFavoritesForCustomer = async (request) => {
  let response = await customerRepo.getFavoritesForCustomer(request.body);
  return response;
};

//*********************MAKE_FAVORITE******************** */
exports.makeFavoriteCustomer = async (request) => {
  let response = await customerRepo.makeFavoriteCustomer(request.body);
  return response;
};

//*********************MAKE_UN_FAVORITE******************** */
exports.makeUnFavoriteCustomer = async (request) => {
  let response = await customerRepo.makeUnFavoriteCustomer(request.body);
  return response;
};

//*********************GetCart******************** */
exports.getCart = async (request) => {
  let response = await customerRepo.getCart(request.query);
  return response;
};

//*********************getCheckoutCart******************** */
exports.getCheckoutCart = async (request) => {
  let response = await customerRepo.getCheckoutCart(request.query);
  return response;
};

//*********************ADD ADDRESS******************** */
exports.addAddress = async (request) => {
  let response = await customerRepo.addAddress(request.body);
  return response;
};

//*********************Delete Cart******************** */
exports.deleteCart = async (request) => {
  let response = await customerRepo.deleteCart(request.query);
  return response;
};

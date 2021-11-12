const pool = require("../database/dbConnection");
const customerSchema = require("../database/schema/customer").createModel();
const addressSchema = require("../database/schema/address").createModel();
const dishSchema = require("../database/schema/dish").createModel();
const favoriteSchema = require("../database/schema/favorite").createModel();
const orderSchema = require("../database/schema/order").createModel();
const orderItemSchema = require("../database/schema/orderItem").createModel();
const restaurantSchema = require("../database/schema/restaurant").createModel();
const queries = require("../queries/customer");
exports.signup = async (customer) => {
  try {
    let response = await queries.insertCustomer(customerSchema, customer, {
      runValidators: false,
    });
    let result = {};
    result.result = response._id;
    return { status: 200, body: result };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateCustomer = async (customer) => {
  try {
    let response = await queries.updateCustomer(customerSchema, customer);
    return { status: 200, body: response.values };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.logincallback = async (customer) => {
  try {
    let response = await queries.loginCustomer(customerSchema, customer, {
      runValidators: false,
    });
    console.log(response[0]);
    let res = {};
    let result = {};
    result.id = response[0].id;
    result.name = response[0].name;
    res.result = result;
    return { status: 200, body: res };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};
//***************//***************//***************//***************//***************//***************//***************//***************//***************
exports.insertOrder = async (order) => {
  try {
    let orderFound = await queries.findOrder(orderSchema, order);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateOrder = async (order) => {
  try {
    let response = await queries.updateOrder(orderSchema, order);
    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateOrderStatus = async (order) => {
  try {
    let response = await queries.updateOrderStatus(orderSchema, order);
    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_CUSTOMER_BY_USERNAME******************** */
exports.getCustomerByUsername = async (params) => {
  try {
    let response = await queries.getCustomerByUsername(customerSchema, params);

    let res = {};
    res.id = response[0]._id;
    res.name = response[0].name;
    res.mobile = response[0].mobile;
    res.email_id = response[0].email_id;
    res.password = response[0].password;
    res.city = response[0].city;
    res.state = response[0].state;
    res.country = response[0].country;
    res.address = response[0].address;
    res.nick_name = response[0].nick_name;
    res.about = response[0].about;
    res.latitude = response[0].latitude;
    res.longitude = response[0].longitude;
    res.image_url = response[0].image_url;

    return { status: 200, body: res };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_CUSTOMER_BY_ID******************** */
exports.getCustomerByID = async (params) => {
  try {
    let response = await queries.getCustomerByID(customerSchema, params.id);
    let res = {};
    res.id = response[0]._id;
    res.name = response[0].name;
    res.mobile = response[0].mobile;
    res.email_id = response[0].email_id;
    res.password = response[0].password;
    res.city = response[0].city;
    res.state = response[0].state;
    res.country = response[0].country;
    res.address = response[0].address;
    res.nick_name = response[0].nick_name;
    res.about = response[0].about;
    res.latitude = response[0].latitude;
    res.longitude = response[0].longitude;
    res.image_url = response[0].image_url;
    return { status: 200, body: res };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_ORDERS******************** */**********************************************************************************************
exports.getOrdersForCustomer = async (params) => {
  try {
    let response = await getOrdersForCustomer(params.id);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_FAVORITES******************** */****************************************************************************************** */
exports.getFavoritesForCustomer = async (body) => {
  try {
    let response = await pool.query(queries.getFavoritesForCustomer, [
      body.latitude,
      body.longitude,
      body.latitude,
      body.id,
    ]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************MAKE_FAVORITE******************** */
exports.makeFavoriteCustomer = async (body) => {
  try {
    let response = await makeFavoriteCustomer(favoriteSchema, body);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************MAKE_UN_FAVORITE******************** */
exports.makeUnFavoriteCustomer = async (body) => {
  try {
    let response = await makeUnFavoriteCustomer(favoriteSchema, body);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

// //*********************MAKE_UN_FAVORITE******************** */
// exports.makeUnFavoriteCustomer = async (body) => {
//   try {
//     let response = await pool.query(queries.makeUnFavoriteCustomer, [
//       body.customer_id,
//       body.restaurant_id,
//     ]);

//     return { status: 200, body: response };
//   } catch (error) {
//     console.log(error);
//     const message = error.message ? error.message : "Internal Server Error";
//     const code = error.statusCode ? error.statusCode : 500;
//     return { status: code, body: { message } };
//   }
// };

//*********************GetCart******************** */************************************************************************************************************ */
exports.getCart = async (query) => {
  try {
    let response = await pool.query(queries.getCart, [query.id]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GetCheckoutCart******************** */************************************************************************************************ */
exports.getCheckoutCart = async (query) => {
  try {
    let response = await pool.query(queries.getCheckoutCart, [query.id]);
    let address = await pool.query(queries.getAddress, [query.id, query.id]);

    return { status: 200, body: { items: response, address: address } };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************ADD ADDRESS******************** */
exports.addAddress = async (body) => {
  try {
    let response = await addAddress(addressSchema, body);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************DELETE_CART******************** */
exports.deleteCart = async (body) => {
  try {
    let r1 = await queries.deleteOrderItems(orderItemSchema, body);

    let r2 = await queries.deleteOrderItems(orderSchema, body);

    return { status: 200, body: r2 };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

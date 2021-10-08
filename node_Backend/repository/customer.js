const pool = require("../database/dbConnection");
const queries = require("../queries/customer");
exports.signup = async (customer) => {
  try {
    let response = await pool.query(queries.insertCustomer, [
      customer.name,
      customer.email_id,
      customer.password,
    ]);
    return { status: 200, body: response.values };
  } catch (error) {
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.signupCallback = (customer, callback) => {
  try {
    pool.query(
      queries.insertCustomer,
      [customer.email_id, customer.mobile, customer.password],
      (error, result) => {
        callback(error, result);
      }
    );
  } catch (err) {
    callback(err);
  }
};

exports.updateCustomer = async (customer) => {
  try {
    let response = await pool.query(queries.updateCustomer, [
      customer.name,
      customer.email_id,
      customer.mobile,
      customer.city,
      customer.state,
      customer.country,
      customer.nick_name,
      customer.about,
      customer.image_url,
      customer.address,
      customer.latitude,
      customer.longitude,
      customer.id,
    ]);
    return { status: 200, body: response.values };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.logincallback = (customer, callback) => {
  try {
    pool.query(
      queries.loginCustomer,
      [customer.email_id, customer.password],
      (error, result) => {
        callback(error, result[0]);
      }
    );
  } catch (err) {
    callback(err);
  }
};

exports.insertOrder = async (order) => {
  try {
    let response = await pool.query(queries.insertOrder, [
      order.customer_id,
      order.restaurant_id,
      order.price,
      // order.order_date,
      order.delivery_type,
      order.order_status,
    ]);

    return { status: 200, body: { id: response.insertId } };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

exports.updateOrder = async (order) => {
  try {
    let response = await pool.query(queries.updateOrder, [
      order.customer_id,
      order.restaurant_id,
      order.price,
      order.order_date,
      order.delivery_type,
      order.order_status,
      order.id,
    ]);

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
    let response = await pool.query(queries.updateOrderStatus, [
      order.order_status,
      order.id,
    ]);

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
    let response = await pool.query(queries.getCustomerByUsername, [
      params.email_id,
      params.email_id,
    ]);

    return { status: 200, body: response[0] };
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
    let response = await pool.query(queries.getCustomerByID, [params.id]);

    return { status: 200, body: response[0] };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_ORDERS******************** */
exports.getOrdersForCustomer = async (params) => {
  try {
    let response = await pool.query(queries.getOrdersForCustomer, [params.id]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

//*********************GET_FAVORITES******************** */
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
    let response = await pool.query(queries.makeFavoriteCustomer, [
      body.customer_id,
      body.restaurant_id,
    ]);

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
    let response = await pool.query(queries.makeUnFavoriteCustomer, [
      body.customer_id,
      body.restaurant_id,
    ]);

    return { status: 200, body: response };
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal Server Error";
    const code = error.statusCode ? error.statusCode : 500;
    return { status: code, body: { message } };
  }
};

const index = require("../index");
const queries = require("../queries/customer");
exports.signup = async (customer) => {
  try {
    let response = await index.connection.query(queries.insertCustomer, [
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
  console.log(3);
  try {
    index.connection.query(
      queries.insertCustomer,
      [customer.name, customer.email_id, customer.password],
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
    let response = await index.connection.query(queries.updateCustomer, [
      customer.name,
      customer.email_id,
      customer.password,
      customer.city,
      customer.state,
      customer.country,
      customer.nick_name,
      customer.about,
      customer.image_url,
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
    index.connection.query(
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

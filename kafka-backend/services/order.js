const pool = require("../database/dbConnection");
const queries = require("../queries/customer");

function handle_request(body, callback) {
  console.log("Inside Order kafka backend");
  let response = pool.query(
    queries.updateOrder,
    [
      order.customer_id,
      order.restaurant_id,
      order.price,
      order.order_date,
      order.delivery_type,
      order.order_status,
      order.id,
    ],
    (error, result) => {
      if (error) callback(error, "Cannot Update");
      else if (result) callback(null, result);
    }
  );
}

exports.handle_request = handle_request;

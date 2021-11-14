const pool = require("../database/dbConnection");
const queries = require("../queries/customer");

function handle_request(body) {
  console.log("Inside Order kafka backend");
  let response = pool.query(
    queries.updateOrder,
    [
      body.customer_id,
      body.restaurant_id,
      body.price,
      body.order_date,
      body.delivery_type,
      body.order_status,
      body.id,
    ],
    (error, result) => {
      if (error) {
        console.log("************Inside Order kakfa service************");
        console.log("Error");
        console.log(error);
      } else if (result) {
        console.log("************Inside Order kakfa service************");
        console.log("Success");
        console.log(result);
      }
    }
  );
}

exports.handle_request = handle_request;

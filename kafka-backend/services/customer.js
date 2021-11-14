const pool = require("../database/dbConnection");
const queries = require("../queries/customer");

function handle_request(body) {
  console.log("Inside customer kafka backend");
  let response = pool.query(
    queries.updateCustomer,
    [
      body.name,
      body.email_id,
      body.mobile,
      body.city,
      body.state,
      body.country,
      body.nick_name,
      body.about,
      body.image_url,
      body.address,
      body.latitude,
      body.longitude,
      body.id,
    ],
    (error, result) => {
      if (error) {
        console.log("************Inside kakfa service************");
        console.log("Error");
        console.log(error);
        // callback(error, "Cannot Update");
      } else if (result) {
        console.log("************Inside kakfa service************");
        console.log("Success");
        console.log(result);
        // callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;

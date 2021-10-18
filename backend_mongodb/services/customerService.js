const logger = require("tracer").colorConsole();
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const customerSchema = require("../db/schema/customer").createModel();
const operations = require("../db/operations");
const { request } = require("express");

exports.saveCustomerDetails = async (request) => {
  try {
    let response = {};
    if (!request.body._id)
      response = await operations.saveDocuments(customer, request.body, {
        runValidators: true,
      });
    else
      response = await operations.updateField(
        customer,
        { _id: request.body._id },
        request.body
      );
    return { status: 200, body: response };
  } catch (err) {
    logger.error(err);
    const message = err.message
      ? err.message
      : "Error while fetching credentials";
    const code = err.statusCode ? err.statusCode : 500;
    return { status: code, body: { message } };
  }
};

const express = require("express");
const router = express.Router();
const customerService = require("../services/customerService");

router.post("/customer/signup", async (request, response) => {
  console.log(request);
  try {
    const data = await customerService.saveCustomerDetails(request);
    response.status(data.status).json(data.body);
  } catch (err) {
    logger.error(err);
    const message = err.message ? err.message : "Error while Saving students";
    const code = err.statusCode ? err.statusCode : 500;
    return response.status(code).json({ message });
  }
});

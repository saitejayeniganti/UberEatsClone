const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));
const logger = require("tracer").colorConsole();
const cr = require("./routes/customerRoute");
const connection = require("./db/connection");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function initializeApplication() {
  try {
    app.use(cr);
    await connection.createConnection();
    app.listen(process.env.PORT || 8080, () => {
      logger.debug("App listening on port 8080");
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

initializeApplication()
  .then((response) => logger.info("Server Running"))
  .catch((error) =>
    logger.error(`Error in Initalizing Application  : ${error}`)
  );

module.exports = app;

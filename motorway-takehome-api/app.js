const express = require('express');
const helmet = require("helmet");

const db = require("./models");

const { globalErrorHandler } = require('./handlers');
const promiseRetry = require('promise-retry');

const app = express();

app.use(helmet());

require("./routes/vehicle.routes")(app);

app.use(globalErrorHandler);

const initPromise = promiseRetry(
  async (retry) => {
    await db.sequelize.authenticate().catch(retry);
  },
  {
    factor: 1.2,
    minTimeout: 1000,
    maxTimeout: 2000
  }
).then(() => db.sequelize.sync({ alter: true }));


module.exports = initPromise.then(() => app);

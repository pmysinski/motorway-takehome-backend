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
    console.log('Connecting to database...')
    return db.sequelize.authenticate().catch((e) => {
      console.error('Unable to connect to the database: ', e);
      retry(e)
    });
  },
  {
    forever: true,
    factor: 1.2,
    minTimeout: 1000,
    maxTimeout: 2000
  }
).then(() => {
  console.log('Connected. Syncing...')
  return db.sequelize.sync({ alter: true })
});


module.exports = initPromise.then(() => app);

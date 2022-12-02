const { validationResult } = require('express-validator');

const expressValidationError = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array().map(el => `${el['param']} - has Error: ${el['msg']}`).toString());
    err.status = 400;
    next(err);
  } else {
    next();
  }
};

// there has to be unused next otherwise express logs errors by itself
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status: status,
      message: err.message || "Internal Server Error",
    },
  });
}

module.exports = {
  expressValidationError,
  globalErrorHandler,
}
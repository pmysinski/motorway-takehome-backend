module.exports = app => {
  const vehicle = require("../controllers/vehicle.controller");
  const router = require("express").Router();

  router.get("/:id", vehicle.findOne);

  app.use('/api/vehicles', router);
};

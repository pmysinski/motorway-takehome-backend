const db = require("../models");
const Vehicle = db.Vehicle;
const Op = db.Sequelize.Op;


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (vehicle) {
      res.send(vehicle);
    } else {
      res.status(404).send({
        message: 'Vehicle not found'
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving vehicle"
    });
  }
};
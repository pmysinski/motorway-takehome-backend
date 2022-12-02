const Sequelize = require("sequelize");

const config = require("../config/config.js");

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Vehicle = require("./vehicle.model")(sequelize, Sequelize);
db.StateLog = require("./stateLogs.model")(sequelize, Sequelize);

db.Vehicle.hasMany(db.StateLog, { as: "stateLog" });
db.StateLog.belongsTo(db.Vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});


module.exports = db;
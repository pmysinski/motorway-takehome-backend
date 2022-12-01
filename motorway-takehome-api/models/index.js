const Sequelize = require("sequelize");

const config = require("../config/config.js");

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'postgres',

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


db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  db.sequelize.sync({ alter: true }).then(() => {

  }).catch((error) => {
    console.error('Unable to sync the database: ', error);
  });
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});



module.exports = db;
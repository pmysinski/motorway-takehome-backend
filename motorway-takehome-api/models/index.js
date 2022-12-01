const Sequelize = require("sequelize");

const dbConfig = require("../configs/dbconfig.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    // TODO: debug only
    logging: true,
  }
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
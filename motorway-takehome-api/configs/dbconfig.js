module.exports = {
    HOST: "db",
    USER: "user",
    PASSWORD: "password",
    DB: "motorway",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
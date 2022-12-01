module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicle", {
    make: {
      type: Sequelize.DataTypes.TEXT
    },
    model: {
      type: Sequelize.DataTypes.TEXT
    },
    state: {
      type: Sequelize.DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

  return Vehicle;
};
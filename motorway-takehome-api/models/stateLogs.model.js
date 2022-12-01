module.exports = (sequelize, Sequelize) => {
  const StateLog = sequelize.define("stateLog", {
    state: {
      type: Sequelize.DataTypes.TEXT
    },
    timestamp: {
      type: Sequelize.DataTypes.DATE
    }
  }, {
    timestamps: false,
    indexes:[
      {
        unique: false,
        fields:['timestamp']
      }
     ]
  });

  return StateLog;
};
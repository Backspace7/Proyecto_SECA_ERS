// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const actuators = sequelizeClient.define('actuators', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activated: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false
    },
    threshold: {
      type: DataTypes.FLOAT,
      defaultValue:0
    },
    automatic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    minutes: {
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  actuators.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return actuators;
};

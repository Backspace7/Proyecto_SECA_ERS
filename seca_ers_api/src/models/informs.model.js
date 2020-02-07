// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const informs = sequelizeClient.define('informs', {
    Tmax: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Tmin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Tpro: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Rsol: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  informs.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return informs;
};

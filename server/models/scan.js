'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scan = sequelize.define('Scan', {
    scan_name: DataTypes.STRING,
    scan_link: DataTypes.STRING
  }, {});
  Scan.associate = function(models) {
    // associations can be defined here
    Scan.belongsTo(models.User, {
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    })
  };
  return Scan;
};
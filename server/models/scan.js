'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scan = sequelize.define('Scan', {
    scan_name: { type: DataTypes.STRING, notEmpty: true },
    scan_link: { type: DataTypes.STRING, notEmpty: true, isUrl: true }
  }, {});
  Scan.associate = function(models) {
    Scan.belongsTo(models.User, {
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    })
    Scan.hasMany(models.Room)
  };
  return Scan;
};
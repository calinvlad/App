'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_name: DataTypes.STRING,
    room_link: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    Room.belongsTo(models.Scan, {
      foreignKey: {
        field: 'ScanId',
        allowNull: false
      }
    })
    Room.belongsTo(models.User, {
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    })
  };
  return Room;
};
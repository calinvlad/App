'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsTo(models.User, {
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    })
  };
  return Role;
};
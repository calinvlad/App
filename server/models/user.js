'use strict';
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
    .then(() => console.log('USER PASSWORD FROM HOOK: ', user.password))
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    company_name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    Role: {
      type: DataTypes.STRING
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Scan)
    User.hasMany(models.Room)
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User;
};
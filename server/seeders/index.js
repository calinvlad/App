// Seed folder for cleaning up databases
// Check into that later
// See seeders folder

const {
  sequelize,
  User,
  Scan
} = require('../models')

const Promise = require('bluebird')
const scans = require('./scans.json')
const users = require('./users.json')

sequelize.sync({force: true}) 
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      scans.map(scan => {
        Scan.create(scan)
      })
    )
  })
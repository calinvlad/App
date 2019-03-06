const {User, Scan, Room} = require('../../models')
const jwt = require('jsonwebtoken')
const configuration = require('../../config/configuration')
const nodemailer = require("nodemailer");

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, configuration.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [{
          model: Scan
        }]
      })
      res.send(users)
    }
    catch(error) {
      res.statut(400).send({
        error: 'Something is wrong with the server. If the problem persists, contact us.'
      })
    }
  },
  async register (req, res) {
    try {
      // console.log(`USER NAME: ${req.body.company_name}, USER PARRWORD: ${req.body.password}`)
      const user = await User.create(req.body)
      // console.log(`USER NAME: ${user.company_name}, USER PARRWORD: ${user.password}`)
      res.send(user.toJSON())
    }
    catch(err) {
      res.status(400).send({
        error: 'This company is already registered'
      })
    }
  },
  async login (req, res) {
    try {
      const {company_name, email, password} = req.body
      const user = await User.findOne({
        where: {
          company_name: company_name
        }
      })

      if(!user) {
        res.status(403).send({
          error: `Your account data is incorrect`
        })
      }

      const isPasswordValid = await user.comparePassword(password)

      if(!isPasswordValid) {
        res.status(403).send({
          error: `Your account data is incorrect`
        })
      }

      const userJson = user.toJSON()

      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    }
    catch(err) {
      res.status(500).send({
        error: `Can't connect to the server. If the problem persists, contact us.`
      })
    }
  }
}
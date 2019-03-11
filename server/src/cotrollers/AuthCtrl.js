const {User, Scan, Room} = require('../../models')
const jwt = require('jsonwebtoken')
const configuration = require('../../config/configuration')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, configuration.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      // const user = await User.create(req.body)
      const user = await User.create({
        company_name: req.body.company_name,
        email: req.body.email,
        password: req.body.password,
        Role: 'Author'
      })
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
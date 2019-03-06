const {User} = require('../../models')
const jwt = require('jsonwebtoken')
const configuration = require('../../config/configuration')
const nodemailer = require("nodemailer");

function jwtSignUser (user) {
  // seconds * minutes * hours * days
  const TWO_MIN = 60 * 2
  // const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, configuration.authentication.jwtSecret, {
    expiresIn: TWO_MIN
  })
}

module.exports = {
  async forgot(req, res) {
    try {
      const Email = req.body.email
      if(Email !== undefined) {
        const user = await User.findOne({
          where: {
            email: Email
          },
        })
        const userJson = user.toJSON()
        const token = jwtSignUser(userJson)

        async function main(){
          // SETUP NODEMAILER
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'calinvlad.t@gmail.com', // generated ethereal user
              pass: 'nikeul12' // generated ethereal password
            }
          })
          // CREATE A DECENT EMAIL
          let mailOptions = {
            from: 'calinvlad.t@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: "Hello,", // Subject line,
            text: `http://127.0.0.1:8080/reset/${token}`
          }
          // send mail with defined transport object
          let info = await transporter.sendMail(mailOptions)
          console.log(`Message send to ${user.company_name}`)
        }

        main().catch(console.error)
        res.status(200).send({
          success: 'Your email was sent!'
        })
      }
    }
    catch(error) {
      res.status(404).send({
        error: 'Company not found. If the problem persists, contact our suport team.'
      })
    }
  },
  async getUserData(req, res) {
    try {
      const token = req.params.Token
      const Now = Date.now() / 1000
      var decoded = jwt.decode(token, {complete: true})
      // console.log('DATE NOW: ', Now)
      // console.log('DATE THEN: ', decoded.payload.exp)
      // console.log(Now > decoded.payload.exp)
      if(Now > decoded.payload.exp) {
        res.status(500).send({
          error: 'Your link is not valid'
        })
      }
      else {
        const user = await User.findOne({
          where: {
            id: decoded.payload.id
          }
        })
        res.send(user)
      }
      
    }
    catch(error) {
      res.status(403).send({
        error: 'Something went wrong with your data.'
      })
    }
  },
  async reset(req, res) {
    try {
      const UserId = req.body.id
      // console.log('USERID: ', UserId)

      const user = await User.findOne({
        where: {
          id: UserId
        }
      })
      user.update(req.body)
      
      res.send(user)
    } catch(error) {
      res.status(403).send({
        error: `ERROR: ${error}`
      })
    }
  }
}
const passport = require('passport')
const {User} = require('../../models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const configuration = require('../../config/configuration')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configuration.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
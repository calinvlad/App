module.exports = {
  authentication: {
    jwtSecret: process.env.jWT_SECRET || 'secret'
  }
}
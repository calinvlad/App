const AuthCtrl = require('./cotrollers/AuthCtrl')
const AuthCtrlPolicy = require('./policies/AuthCtrlPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthCtrlPolicy.register,
    AuthCtrl.register)
  
  app.post('/login',
    AuthCtrl.login)
}
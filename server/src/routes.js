const AuthCtrl = require('./cotrollers/AuthCtrl')
const AuthCtrlPolicy = require('./policies/AuthCtrlPolicy')
const ScanCtrl = require('./cotrollers/ScanCtrl')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // User
  app.get('/users',
    AuthCtrl.index)

  app.post('/register',
    AuthCtrlPolicy.register,
    AuthCtrl.register)
  
  app.post('/login',
    AuthCtrl.login)

  // Scans
  app.get('/scans',
    ScanCtrl.index)

  app.get('/scans/:UserId',
    ScanCtrl.show)

  app.post('/scans/:UserId',
    isAuthenticated,
    ScanCtrl.post)
}
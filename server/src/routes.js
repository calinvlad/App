const AuthCtrl = require('./cotrollers/AuthCtrl')
const AuthCtrlPolicy = require('./policies/AuthCtrlPolicy')
const ScanCtrl = require('./cotrollers/ScanCtrl')
const RoomCtrl = require('./cotrollers/RoomCtrl')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // User
  app.get('/users', AuthCtrl.index)
  app.post('/register', AuthCtrlPolicy.register, AuthCtrl.register)
  app.post('/login', AuthCtrl.login)

  // Scans
  app.get('/scans', ScanCtrl.index)
  app.get('/scans/:UserId', ScanCtrl.show)
  app.get('/scans/:UserId/:ScanId', ScanCtrl.getById)
  app.post('/scans/:UserId', isAuthenticated, ScanCtrl.post)
  app.put('/scans/:UserId/:ScanId', isAuthenticated, ScanCtrl.update)
  app.delete('/scans/:UserId/:ScanId', isAuthenticated, ScanCtrl.delete)

  // ROOMS
  app.get('/rooms', RoomCtrl.index)
  app.get('/rooms/:UserId/:ScanId', RoomCtrl.show)
  app.post('/rooms/:UserId/:ScanId', isAuthenticated, RoomCtrl.post)
  app.get('/rooms/:UserId/:ScanId/:RoomId', RoomCtrl.getById)
  app.put('/rooms/:UserId/:ScanId/:RoomId', isAuthenticated, RoomCtrl.update)
  app.delete('/rooms/:UserId/:ScanId/:RoomId', isAuthenticated, RoomCtrl.delete)
} 
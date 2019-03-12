// ADMINISTRATOR
const CompanyCtrl = require('./cotrollers/Admin/CompanyCtrl')
const PropertyCtrl = require('./cotrollers/Admin/PropertyCtrl')
const PropertyRoomCtrl = require('./cotrollers/Admin/PropertyRoomCtrl')

// PUBLIC
const AuthCtrl = require('./cotrollers/AuthCtrl')
const AuthResetCtrl = require('./cotrollers/AuthResetCtrl')
const AuthCtrlPolicy = require('./policies/AuthCtrlPolicy')
const ScanCtrl = require('./cotrollers/ScanCtrl')
const RoomCtrl = require('./cotrollers/RoomCtrl')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // Admin
  app.get('/admin/companies', CompanyCtrl.index)
  app.get('/admin/companies/:company_name', CompanyCtrl.getByName)
  app.get('/admin/companies/:company_name/scans', PropertyCtrl.getCompanyScans)
  app.post('/admin/companies/:company_name/scans', PropertyCtrl.createCompanyScan)
  app.put('/admin/companies/:company_name/scans/:scan_id', PropertyCtrl.editCompanyScan)
  app.delete('/admin/companies/:company_name/scans/:scan_id', PropertyCtrl.deleteCompanyScan)
  
  app.get('/admin/companies/:company_name/scans/:property_name', PropertyRoomCtrl.getPropertyByName)
  app.post('/admin/companies/:company_name/scans/:property_name', PropertyRoomCtrl.createPropertyRoom)
  app.put('/admin/companies/:company_name/scans/:property_name/:room_id', PropertyRoomCtrl.editPropertyRoom)
  app.delete('/admin/companies/:company_name/scans/:property_name/:room_id', PropertyRoomCtrl.deletePropertyRoom)

  // User
  // app.get('/users', AuthCtrl.index)
  // app.get('/users/:company_name', AuthCtrl.getById)
  app.post('/register', AuthCtrlPolicy.register, AuthCtrl.register)
  app.post('/login', AuthCtrl.login)
  app.post('/forgot', AuthResetCtrl.forgot)
  app.get('/reset/:Token', AuthResetCtrl.getUserData)
  app.put('/reset/:Token', AuthResetCtrl.reset)

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
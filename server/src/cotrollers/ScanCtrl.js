const Sequelize = require('sequelize')
const {Scan, User} = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      const scans = await Scan.findAll(req.params, {
        include: [{
          model: User,
          as: 'UserId'
        }]
      })
      res.send(scans)
    }
    catch(error) {
      res.status(400).send({
        error: 'Something is wrong with the server. If the problem persists, contact us.'
      })
    }
  },
  async show(req, res) {
    try {
      const UserId = req.params.UserId
      const scan = await Scan.findAll({
        where: {
          UserId: UserId
        }
      })
      res.send(scan)
    }
    catch(error) {
      res.status(400).send({
        error: 'The server is not responding. If the problem persists, contact us.'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.params.UserId
      const ScanName = req.body.scan_name
      const ScanLink = req.body.scan_link
      const scan = await Scan.create({
        UserId: UserId,
        scan_name: ScanName,
        scan_link: ScanLink
      })
      res.send(scan)
    }
    catch(error) {
      res.status(400).send({
        error: 'You do not have permission to do that'
      })
    }
  }
}
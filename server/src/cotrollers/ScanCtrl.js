const Sequelize = require('sequelize')
const {Scan, User, Room} = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      const scans = await Scan.findAll({
        include: [{
          model: Room
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
        },
        include: [{
          model: Room
        }]
      })
      res.send(scan)
    }
    catch(error) {
      res.status(400).send({
        error: 'The server is not responding. If the problem persists, contact us.'
      })
    }
  },
  async getById(req, res) {
    try {
      const UserId = req.params.UserId
      const ScanId = req.params.ScanId
      const scan = await Scan.findOne({
        where: {
          UserId: UserId,
          id: ScanId
        },
        include: [{
          model: Room
        }]
      })
      res.send(scan)
    }
    catch(error) {
      res.status(404).send({
        error: 'Scan not found'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
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
  },
  async update(req, res) {
    try {
      const UserId = req.user.id
      const ScanId = req.params.ScanId
      await Scan.update(req.body, {
        where: {
          id: ScanId,
          UserId: UserId
        }
      })
      res.send(req.body)
    }
    catch (error) {
      res.status(400).send({
        error: 'You are not allowed to post this scan'
      })
    }
  },
  async delete (req, res) {
    try {
      const UserId = req.user.id
      const ScanId = req.params.ScanId
      console.log('USERID: ', UserId)
      console.log('ScanId: ', ScanId)
      const scan = await Scan.findOne({
        where: {
          UserId: UserId,
          id: ScanId
        }
      })
      if(!scan) {
        res.status(403).send({
          error: 'You do not have permission to do that.'
        })
      }
      else {
        await scan.destroy()
        res.send(scan)
      }
    }
    catch(error) {
      res.status(400).send({
        error: `Something went wrong while deleting the scan.
                Make sure you don't have any Rooms left.`
      })
    }
  }
}
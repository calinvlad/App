const Sequelize = require('sequelize')
const {Room, Scan, User} = require('../../models')

module.exports = {
  async index(req, res) {
    try {
      const rooms = await Room.findAll(req.params, {
        include: [{
          model: Scan,
          as: 'ScanId'
        },{
          model: User,
          as: 'UserId'
        }]
      })
      res.send(rooms)
    }
    catch(error) {
      res.status(403).send({
        error: `Can't get the rooms from the server...`
      })
    }
  },
  async show(req, res) {
    try {
      const ScanId = req.params.ScanId
      const room = await Room.findAll({
        where: {
          ScanId: ScanId
        }
      })
      res.send(room)
    }
    catch(error) {
      res.status(400).send({
        error: 'The server is not responding. If the problem persists, contact us.'
      })
    }
  },
  async post(req, res) {
    try {
      const UserId = req.user.id
      const ScanId = req.params.ScanId
      const RoomName = req.body.room_name
      const RoomLink = req.body.room_link
      const room = await Room.create({
        UserId: UserId,
        ScanId: ScanId,
        room_name: RoomName,
        room_link: RoomLink
      })
      res.send(room)
    }
    catch(error) {
      res.status(400).send({
        error: 'You do not have permission to do that'
      })
    }
  },
  async getById(req, res) {
    try {
      const UserId = req.params.UserId
      const ScanId = req.params.ScanId
      const RoomId = req.params.RoomId
      const room = await Room.findOne({
        where: {
          UserId: UserId,
          ScanId: ScanId,
          id: RoomId,
        }
      })
      res.send(room)
    }
    catch(error) {
      res.status(404).send({
        error: 'Room not found'
      })
    }
  },
  async update(req, res) {
    try {
      const UserId = req.user.id
      const ScanId = req.params.ScanId
      const RoomId = req.params.RoomId

      await Room.update(req.body, {
        where: {
          id: RoomId,
          UserId: UserId,
          ScanId: ScanId 
        }
      })
      res.send(req.body)
    }
    catch (error) {
      res.status(400).send({
        error: 'You are not allowed to post this room'
      })
    }
  },
  async delete (req, res) {
    try {
      const UserId = req.user.id
      const ScanId = req.params.ScanId
      const RoomId = req.params.RoomId

      const room = await Room.findOne({
        where: {
          UserId: UserId,
          ScanId: ScanId,
          id: RoomId
        }
      })
      if(!room) {
        res.status(403).send({
          error: 'You do not have permission to do that.'
        })
      }
      else {
        await room.destroy()
        res.send(room)
      }
    }
    catch(error) {
      res.status(400).send({
        error: 'Something went wrong while deleting the room.'
      })
    }
  }
}
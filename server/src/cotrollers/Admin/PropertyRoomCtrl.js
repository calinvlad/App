const {User, Scan, Room} = require('../../../models')

module.exports = {
  async getPropertyByName(req, res) {
    try {
      const CompanyName = req.params.company_name
      const PropertyName = req.params.property_name
      const Company = await User.findOne({
        where: {
          company_name: CompanyName
        }
      })
      const Property = await Scan.findOne({
        where: {
          UserId: Company.id,
          scan_name: PropertyName
        }
      })
      const Rooms = await Room.findAll({
        where: {
          UserId: Company.id,
          ScanId: Property.id
        }
      })
      res.send(Rooms)
    }
    catch(error) {
      res.status(403).send({error: 'We could not find your rooms'})
    }
  },
  async createPropertyRoom(req, res) {
    try {
      const CompanyName = req.params.company_name
      const PropertyName = req.params.property_name
      const Company = await User.findOne({
        where: {
          company_name: CompanyName
        }
      })
      const Property = await Scan.findOne({
        where: {
          UserId: Company.id,
          scan_name: PropertyName
        }
      })
      const PropertyRoom = await Room.create({
        UserId: Company.id,
        ScanId: Property.id,
        room_name: req.body.room_name,
        room_link: req.body.room_link
      })
      res.send(PropertyRoom)
    }
    catch(error) {
      res.status(403).send({error: 'We could not create your room'})
    }
  },
  async editPropertyRoom(req, res) {
    try {
      const CompanyName = req.params.company_name
      const PropertyName = req.params.property_name
      const PropertyRoomId = req.params.room_id
      
      const Company = await User.findOne({
        where: {
          company_name: CompanyName
        }
      })
      const Property = await Scan.findOne({
        where: {
          UserId: Company.id,
          scan_name: PropertyName
        }
      })
      const PropertyRoom = await Room.findOne({
        where: {
          UserId: Company.id,
          ScanId: Property.id,
          id: PropertyRoomId
        }
      })
      await PropertyRoom.update({
        room_name: req.body.room_name,
        room_link: req.body.room_link
      })
      res.send(PropertyRoom)
    }
    catch(error) {
      res.status(403).send({error: 'We could not edit your room'})
    }
  },
  async deletePropertyRoom(req, res) {
    try {
      const CompanyName = req.params.company_name
      const PropertyName = req.params.property_name
      const PropertyRoomId = req.params.room_id
      
      const Company = await User.findOne({
        where: {
          company_name: CompanyName
        }
      })
      const Property = await Scan.findOne({
        where: {
          UserId: Company.id,
          scan_name: PropertyName
        }
      })
      const PropertyRoom = await Room.findOne({
        where: {
          UserId: Company.id,
          ScanId: Property.id,
          id: PropertyRoomId
        }
      })
      console.log('Property: ', PropertyRoom)
      if(PropertyRoom) {
        PropertyRoom.destroy()
        res.send(PropertyRoom)
      }
      else if(error) {
        res.status(400).send({error: 'Server could not delete the room'})
      }
    }
    catch(error) {
      res.status(400).send({error: 'We could not edit your room'})
    }
  }
}
const {User, Scan, Room} = require('../../../models')

module.exports = {
  // FIND ALL COMPANIES
  async index(req, res) {
    try {
      const users = await User.findAll({
        include: [{
          model: Scan
        },
        {
          model: Room
        }]
      })
      console.log('USERS: ', users)
      res.send(users)
    }
    catch(error) {
      res.statut(400).send({
        error: 'Something is wrong with the server. If the problem persists, contact us.'
      })
    }
  },
  // FIND THE COMPANY BY NAME
  async getByName(req, res) {
    try {
      const CompanyName = req.params.company_name
      const users = await User.findOne({
        where: {
          company_name: CompanyName
        }
      })
      res.send(users)
    }
    catch(error) {
      res.statut(400).send({
        error: 'Something is wrong with the server. If the problem persists, contact us.'
      })
    }
  }
}
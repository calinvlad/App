const {User, Scan, Room} = require('../../../models')

module.exports = {
  // FIND THE COMPANY'S Properties
  async getCompanyScans (req, res) {
    try {
      const Company = await User.findOne({
        where: {
          company_name: req.params.company_name
        }
      })
      try {
        const CompanyId = Company.id
        const Scans = await Scan.findAll({
          where: {
            UserId: CompanyId
          },
          include: [{
            model: Room
          }]
        })
        res.send(Scans)
      }
      catch(error) {
        res.status(400).send({
          error: `Server can't fetch the company`
        })
      }
    }
    catch(error) {
      res.status(400).send({
        error: 'Something is wrong with the server. If the problem persists, contact us.'
      })
    }
  },
  // CREATE A PROPERTY FOR THE COMPANY
  async createCompanyScan (req, res) {
    try {
      const Company = await User.findOne({
        where: {
          company_name: req.params.company_name
        }
      })
      try {
        const CompanyId = Company.id
        const scan = await Scan.create({
          scan_name: req.body.scan_name,
          scan_link: req.body.scan_link,
          UserId: CompanyId
        })
        res.send(scan)
      }
      catch(error) {
        res.status(400).send({
          error: `Server can't post the scan`
        })
      }
    } catch(error) {
      res.status(400).send({
        error: 'Something is wrong here.'
      })
    }
  },
  // EDIT THE COMPANY'S SCAN 
  async editCompanyScan (req, res) {
    try {
      const Company = await User.findOne({
        where: {
          company_name: req.params.company_name
        }
      })
      try {
        const CompanyId = Company.id
        const ScanId = req.params.scan_id
        const scan = await Scan.findOne({
          where: {
            id: ScanId,
            UserId: CompanyId
          }
        })
        if(scan) {
          const updateScan = scan.update({
            scan_name: req.body.scan_name,
            scan_link: req.body.scan_link
          })
          res.send(updateScan)
        }
        res.status(403).send({message: 'You are not allowed'})
      }
      catch(error) {
        res.status(400).send({
          error: `Server can't post the scan`
        })
      }
    } catch(error) {
      res.status(400).send({
        error: 'Something is wrong here.'
      })
    }
  },
  // DELETE THE COMPANY'S SCAN
  async deleteCompanyScan (req, res) {
    try {
      const Company = await User.findOne({
        where: {
          company_name: req.params.company_name
        }
      })
      try {
        const CompanyId = Company.id
        const ScanId = req.params.scan_id
        console.log('SCAN: ', ScanId)
        const scan = await Scan.findOne({
          where: {
            id: ScanId,
            UserId: CompanyId
          }
        })
        if(scan) {
          console.log('SCAN: ', scan)
          const deleteScan = scan.destroy()
          res.send(deleteScan)
        }
        res.status(403).send({message: 'There is no scan'})
      }
      catch (error) {
        res.status(403).send({error: 'You are not allowed to remove the scan'})
      }
    }
    catch (error) {
      res.status(400).send({
        error: 'Something is wrong here.'
      })
    }
  }
}
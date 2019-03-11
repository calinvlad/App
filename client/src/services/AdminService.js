import Api from '@/services/Api'

export default {
  index () {
    return Api().get('/admin/companies')
  },
  getCompanyByName (CompanyName) {
    return Api().get(`/admin/companies/${CompanyName}`)
  },
  getCompanyScans (CompanyName) {
    return Api().get(`/admin/companies/${CompanyName}/scans`)
  },
  createCompanyScan (CompanyName, scan) {
    return Api().post(`/admin/companies/${CompanyName}/scans`, scan)
  },
  editCompanyScan (CompanyName, companyScan) {
    return Api().put(`/admin/companies/${CompanyName}/scans/${companyScan.id}`, companyScan)
  },
  removeCompanyScan (CompanyName, companyScan) {
    return Api().delete(`/admin/companies/${CompanyName}/scans/${companyScan.id}`)
  }
}

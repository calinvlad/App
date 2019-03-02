import Api from '@/services/Api'

export default {
  show (UserId) {
    return Api().get(`/scans/${UserId}`)
  },
  post (scan) {
    return Api().post(`/scans/${scan.UserId}`, scan)
  },
  getById (UserId, ScanId) {
    return Api().get(`/scans/${UserId}/${ScanId}`)
  },
  update (scan) {
    return Api().put(`/scans/${scan.UserId}/${scan.id}`, scan)
  },
  destroy (scan) {
    return Api().delete(`/scans/${scan.UserId}/${scan.id}`)
  }
}

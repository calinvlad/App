import Api from '@/services/Api'

export default {
  show (UserId) {
    return Api().get(`/scans/${UserId}`)
  },
  post (scan) {
    return Api().post(`/scans/${scan.UserId}`, scan)
  }
}

import Api from '@/services/Api'

export default {
  show (UserId, ScanId) {
    return Api().get(`/rooms/${UserId}/${ScanId}`)
  },
  post (room) {
    return Api().post(`/rooms/${room.UserId}/${room.ScanId}`, room)
  },
  getById (UserId, ScanId, RoomId) {
    return Api().get(`/rooms/${UserId}/${ScanId}/${RoomId}`)
  },
  update (room) {
    return Api().put(`/rooms/${room.UserId}/${room.ScanId}/${room.id}`, room)
  },
  destroy (room) {
    return Api().delete(`/rooms/${room.UserId}/${room.ScanId}/${room.id}`)
  }
}

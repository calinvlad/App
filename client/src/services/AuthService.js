import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  forgot (email) {
    return Api().post('forgot', email)
  },
  getUserData (Token) {
    return Api().get(`/reset/${Token}`)
  },
  reset (Token, response) {
    return Api().put(`/reset/${Token}`, response)
  }
}

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('users')
  },
  getById (CompanyName) {
    return Api().get(`/users/${CompanyName}`)
  },
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

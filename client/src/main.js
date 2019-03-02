import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

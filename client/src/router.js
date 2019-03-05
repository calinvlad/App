import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Scan from './components/Scan/Scan'
import CreateScan from './components/Scan/CreateScan'
import EditScan from './components/Scan/EditScan'
import CreateRoom from './components/Room/CreateRoom'
import EditRoom from './components/Room/EditRoom'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/:UserId/properties',
      name: 'scan',
      component: Scan
    },
    {
      path: '/:UserId/properties/create',
      name: 'createscan',
      component: CreateScan,
      beforeEnter: (to, from, next) => {
        const isUserLoggedIn = store.state.isUserLoggedIn
        if (isUserLoggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/:UserId/properties/:ScanId/edit',
      name: 'editscan',
      component: EditScan,
      beforeEnter: (to, from, next) => {
        const isUserLoggedIn = store.state.isUserLoggedIn
        if (isUserLoggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/:UserId/:ScanId/rooms/create',
      name: 'createroom',
      component: CreateRoom,
      beforeEnter: (to, from, next) => {
        const isUserLoggedIn = store.state.isUserLoggedIn
        if (isUserLoggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/:UserId/:ScanId/rooms/:RoomId',
      name: 'editroom',
      component: EditRoom,
      beforeEnter: (to, from, next) => {
        const isUserLoggedIn = store.state.isUserLoggedIn
        if (isUserLoggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    }
  ]
})

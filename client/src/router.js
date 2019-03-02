import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Scan from './components/Scan/Scan'
import CreateScan from './components/Scan/CreateScan'
import EditScan from './components/Scan/EditScan'

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
      path: '/:UserId/scans',
      name: 'scan',
      component: Scan
    },
    {
      path: '/:UserId/scans/create',
      name: 'createscan',
      component: CreateScan
    },
    {
      path: '/:UserId/scans/:ScanId/edit',
      name: 'editscan',
      component: EditScan
    }
  ]
})

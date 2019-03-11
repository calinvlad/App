import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Forgot from './components/User/Forgot'
import Reset from './components/User/Reset'
import Scan from './components/Scan/Scan'
import CreateScan from './components/Scan/CreateScan'
import EditScan from './components/Scan/EditScan'
import CreateRoom from './components/Room/CreateRoom'
import EditRoom from './components/Room/EditRoom'

import NotFound from './views/404/NotFound'

import Companies from './components/Admin/Companies'
import Company from './components/Admin/Company'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/404', name: 'notfound', component: NotFound },
    { path: '*', redirect: '/404' },
    { path: '/', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/forgot', name: 'forgot', component: Forgot },
    { path: '/reset/:Token', name: 'reset', component: Reset },
    { path: '/:UserId/properties', name: 'scan', component: Scan },
    { path: '/:UserId/properties/create', name: 'createscan', component: CreateScan },
    { path: '/:UserId/properties/:ScanId/edit', name: 'editscan', component: EditScan },
    { path: '/:UserId/:ScanId/rooms/create', name: 'createroom', component: CreateRoom },
    { path: '/:UserId/:ScanId/rooms/:RoomId', name: 'editroom', component: EditRoom },
    { path: '/admin/companies', name: 'companies', component: Companies },
    { path: '/admin/companies/:company_name', name: 'company', component: Company }

  ]
})

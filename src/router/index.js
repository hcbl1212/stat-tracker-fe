import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import Router from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

Vue.use(Router)

Vue.use(VueAxios, axios)

var router = new Router({
  routes: [
    {
      path: '/',
      meta: {auth: undefined},
      components: {
        main: require('@/components/Landing.vue'),
        navbar: require('@/components/SignedOutNavbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    },
    {
      path: '/profile',
      meta: {auth: true},
      components: {
        main: require('@/components/Profile.vue'),
        navbar: require('@/components/Navbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    },
    {
      path: '/dashboard',
      meta: {auth: true},
      components: {
        main: require('@/components/Dashboard.vue'),
        navbar: require('@/components/Navbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    },
    {
      path: '/login',
      meta: {auth: false},
      components: {
        main: require('@/components/SignInForm.vue'),
        navbar: require('@/components/SignedOutNavbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    },
    {
      path: '/view-stat',
      meta: {auth: true},
      components: {
        main: require('@/components/ViewStat.vue'),
        navbar: require('@/components/Navbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    },
    {
      path: '/log-stat',
      meta: {auth: true},
      components: {
        main: require('@/components/MetricRoleInstance.vue'),
        navbar: require('@/components/Navbar.vue'),
        footer: require('@/components/Footer.vue')
      }
    }
  ]
})

Vue.router = router

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'permission',
  parseUserData: function (data) {
    return data.user
  },
  token: [{request: 'Authorization', response: 'Authorization', authType: 'bearer', foundIn: 'header'}],
  tokenName: 'JWT'
})

export default router

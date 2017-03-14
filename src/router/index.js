import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SignedOutNavbar from '@/components/SignedOutNavbar'
import Footer from '@/components/Footer'
import Dashboard from '@/components/Dashboard'
import SignedInNavbar from '@/components/Navbar'

Vue.use(Router)

Vue.use(VueAxios, axios)

var router = new Router({
  routes: [
    {
      path: '/',
      components: {
        main: Hello,
        navbar: SignedOutNavbar,
        footer: Footer
      }
    },
    {
      path: '/dashboard',
      components: {
        main: Dashboard,
        navbar: SignedInNavbar,
        footer: Footer
      }
    }
  ]
})

Vue.router = router

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

export default router

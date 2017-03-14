import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SignedOutNavbar from '@/components/SignedOutNavbar'
import Footer from '@/components/Footer'
import Dashboard from '@/components/Dashboard'
import SignedInNavbar from '@/components/Navbar'

Vue.use(Router)

export default new Router({
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

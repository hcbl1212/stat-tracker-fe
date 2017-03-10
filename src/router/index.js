import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Navbar from '@/components/Navbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        navbar: Navbar,
        hello: Hello
      }
    }
  ]
})

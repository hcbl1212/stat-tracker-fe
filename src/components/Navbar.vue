<template>
  <div class='navbar topnav' id='topnav'>
    <a v-on:click='logout()' href='javascript:void(0);' class='rightSidebar sign-out'>Sign Out</a>
    <links :links='navLinks'></links>
  </div>
</template>

<script>
  import Links from './Links.vue'

  export default {
    name: 'navbar',
    data () {
      return {
        navLinks: [
          {path: 'dashboard', description: 'Dashboard', class: 'dashboard'},
          {path: 'view-stat', description: 'View Stats', class: 'view-stat'},
          {path: 'log-stat', description: 'Log Stats', class: 'log-stat'},
          {path: 'profile', description: 'Profile', class: 'rightSidebar profile'}
        ]
      }
    },
    components: {
      links: Links
    },
    methods: {
      logout () {
        this.$auth.logout({
          url: '/users/sign_out',
          makeRequest: true,
          success () {
            localStorage.clear()
            console.log('success ' + this.context)
          },
          error () {
            console.log('error ' + this.context)
          }
        })
      }
    }
  }
</script>

<style >
  .topnav {
      background-color: #66CCFF;
      overflow: hidden;
  }

  .topnav a {
      float: left;
      display: block;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
  }

  .topnav a:hover {
      background-color: #CCFFCC;
      color: black;
  }

  .topnav a.active {
      background-color: #66CCFF;
      color: white;
  }

  .topnav a.rightSidebar {
    float:right;
  }
</style>

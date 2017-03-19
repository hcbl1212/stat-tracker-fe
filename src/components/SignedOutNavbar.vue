<template>
  <div class='navbar topnav' id='topnav'>
    <links :links='navLinks'></links>
  </div>
</template>

<script>
  import Links from './Links.vue'

  export default {
    name: 'SignedOutNavbar',
    data () {
      return {
        navLinks: [
          {path: '/', description: 'Stat Tracker', class: 'landing'},
          {path: '/login', description: 'Sign In', class: 'rightNavbar sign-in'}
        ]
      }
    },
    components: {
      links: Links
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .topnav a.rightNavbar {
    float: right;
  }
</style>

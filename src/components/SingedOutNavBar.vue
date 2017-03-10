<template>
  <div class="navbar topnav" id="topnav">
    <a v-for="link in links" :href='link.path'>{{link.description}}</a>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        links: [
          {path: '#', description: 'Home'},
          {path: '#', description: 'News'},
          {path: '#', description: 'Contact'},
          {path: '#', description: 'About'}
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  /* Add a black background color to the top navigation */
.topnav {
    background-color: #66CCFF;
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
    background-color: #CCFFCC;
    color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
    background-color: #66CCFF;
    color: white;
}

</style>

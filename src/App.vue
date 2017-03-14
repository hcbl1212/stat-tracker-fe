<template>
  <div id="app">
    <header>
      <router-view name='navbar'></router-view>
    </header>
    <div v-if="$auth.ready()">
      <router-view name='main'></router-view>
    </div>
    <router-view name='footer'></router-view> 
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    var _this = this
    // Set up $auth.ready with other arbitrary loaders (ex: language file).
    setTimeout(function () {
      _this.loaded = true
    }, 500)
  },
  created () {
    console.dir(this.$auth.ready())
    console.dir(this.axios)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
}
</style>

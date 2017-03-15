<template>
  <div id="app">
    <header>
      <router-view name='navbar'></router-view>
    </header>
    <router-view name='main'></router-view>
    <router-view name='footer'></router-view> 
  </div>
</template>

<script>
export default {
  name: 'app'
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

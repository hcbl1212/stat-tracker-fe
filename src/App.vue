<template>
  <div id="app">
    <header>
      <router-view name='navbar'></router-view>
    </header>
    <router-view name='hello'></router-view>
    <footer></footer>
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
}
</style>

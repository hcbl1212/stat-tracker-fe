<template>
  <div class="dashboard">
    <h1>I am the the dashboard</h1>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        viewStats: {},
        logStats: {}
      }
    },
    mounted () {
      // console.dir(this.$auth.user().email)
    }
  }
</script>

<style scoped>

</style>

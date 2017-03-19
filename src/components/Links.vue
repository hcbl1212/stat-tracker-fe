<template>
  <span>
    <router-link v-for='link in links' :to='link.path' :class='link.class' :id='link.id' :key='link.id'>
      {{link.description}}
    </router-link>
  </span>
</template>

<script>
  export default {
    name: 'links',
    props: ['links'],
    methods: {
      logout () {
        this.$auth.logout({
          makeRequest: true,
          success () {
            localStorage.clear()
            console.log('success ' + this)
          },
          error () {
            console.log('error ' + this.context)
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>

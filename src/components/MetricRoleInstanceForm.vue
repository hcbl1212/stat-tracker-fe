<template>
  <form class="form"  v-on:submit.prevent='update()'>
    <slot></slot>
  </form>
</template>
<script>
  // import UserStore from '@/store/modules/user.js'

  export default {
    name: 'metric_role_instance_form',
    mounted () {
      // this.$store = UserStore
    },
    data () {
      return {
        context: 'form context'
      }
    },
    props: [
    ],
    methods: {
      update () {
      }
    }
}
</script>
<style scoped>
</style>

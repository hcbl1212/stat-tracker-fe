<template>
  <form class="form"  v-on:submit.prevent='update()'>
    <slot></slot>
  </form>
</template>
<script>

  import store from '@/store/index.js'
  export default {
    name: 'metric_role_instance_form',
    mounted () {
      this.$store = store
    },
    data () {
      return {
        context: 'form context'
      }
    },
    props: [
      'user',
      'role',
      'metric',
      'count'
    ],
    methods: {
      update () {
        // TODO: validate the user input
        let mri = Object.assign({}, this._props)
        this.$store.dispatch('CREATE_METRIC_ROLE_INSTANCE', mri)
      }
    }
}
</script>
<style scoped>
</style>

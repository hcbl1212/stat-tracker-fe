<template>
  <div :class="[{'active': active}, 'tab-body']" v-show="active">
    <slot></slot> 
  </div>
</template>

<script>
  export default {
    name: 'tab',
    created () {
      this.active = this.isActive
    },
    mounted () {
      this.$parent.addTab(this)
    },
    data () {
      return {
        context: 'tab context',
        active: false
      }
    },
    props: {
      'title': {
        required: true,
        type: String
      },
      'isActive': {
        required: false,
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

<style>

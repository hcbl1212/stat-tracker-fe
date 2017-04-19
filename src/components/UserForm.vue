<template>
  <form class="form"  v-on:submit.prevent='update()'>
    <slot></slot>
  </form>
</template>
<script>
  import UserStore from '@/store/modules/user.js'

  export default {
    name: 'form',
    mounted () {
      this.$store = UserStore
    },
    data () {
      return {
        context: 'form context'
      }
    },
    props: [
      'user'
    ],
    methods: {
      update () {
        let inputElements = this.$el.getElementsByTagName('input')
        let confirmRegex = /^confirm-*/
        let tempUser = {}
        let noError = true
        for (let element of inputElements) {
          let idToFind
          // if the element is a confirm element
          if (confirmRegex.test(element.id)) {
            // then lets get its counter part
            idToFind = element.id.substring(8, element.length)
            // if the value has changed from the original value
            // lets compare it to see if the confirm and the the changed are the same are the same
            let alphaElement = this.$el.querySelector('#' + idToFind)
            let betaElement = this.$el.querySelector('#' + element.id)
            let errorElement = this.$el.querySelector('#error-' + element.id)
            if (betaElement.value !== alphaElement.value) {
              errorElement.innerText = idToFind.charAt(0).toUpperCase() + idToFind.substr(1) + ' and confirmation do not match.'
              noError = false
            } else {
              errorElement.innerText = ''
            }
          } else {
            idToFind = element.id
          }
          if (noError && this.user[idToFind] !== undefined && element.value !== '') {
            tempUser[idToFind] = element.value
          }
        }// end of for
        if (noError === true) {
          this.user = Object.assign(this.user, tempUser)
          this.$store.dispatch('UPDATE_USER', this.user)
        }
      }
    }
}
</script>
<style scoped>
</style>

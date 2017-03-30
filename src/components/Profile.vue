<template>
  <div class="form-container profile" style='max-width:700px;'>
    <h1> {{cloneUser.name}}'s Profile</h1>
    <h1 class='error' v-model='error'> {{error}}</h1>
          
    <form v-on:submit.prevent='update()' style='max-width:700px;'>
      <div class='field-wrap' style="width:75%;">
        <textBox :label='nameLabel' :textbox='nameInput' v-model='user.name' value='user.name'></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;'>
        <textBox :label='emailLabel' :textbox='emailInput' v-model='user.email' value='user.email'></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;margin-left:35px;'>
        <textBox :label='confirmEmailLabel' :textbox='confirmEmailInput'  value=''></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;'>
        <textBox :label='passwordLabel' :textbox='passwordInput' v-model='user.password' value=''></textBox>
      </div> 
      <div class='field-wrap' style='width:35%;display:inline-block;margin-left:35px;'>
        <textBox :label='confirmPasswordLabel' :textbox='confirmPasswordInput'  value=''></textBox>
      </div> 
      <button class='button button-block update-profile'>Update Profile</button>
    </form>
  </div>
</template>

<script>
  import TextBoxWithLabel from './TextBoxWithLabel.vue'

  export default {
    name: 'profile',
    mounted () {
      // console.dir(this.$auth.user())
      // making a shallow copy of the user for reference later
      this.$data.cloneUser = {...this.$auth.user()}
    },
    data () {
      return {
        context: 'profile context',
        userName: '',
        user: this.$auth.user(),
        cloneUser: this.$auth.user(),
        error: '',
        nameInput: {
          type: 'name',
          id: 'name',
          required: true
        },
        nameLabel: {
          placeHolder: '',
          class: 'name'
        },
        emailInput: {
          type: 'email',
          id: 'email',
          required: true
        },
        emailLabel: {
          placeHolder: '',
          class: 'email-address'
        },
        confirmEmailInput: {
          type: 'email',
          id: 'confirm-email',
          required: true
        },
        confirmEmailLabel: {
          placeHolder: 'Confirm Email',
          class: 'confirm-email-address'
        },
        passwordInput: {
          type: 'password',
          id: 'password',
          required: true
        },
        passwordLabel: {
          placeHolder: 'Password',
          class: 'password'
        },
        confirmPasswordInput: {
          type: 'password',
          id: 'confirm-password',
          required: true
        },
        confirmPasswordLabel: {
          placeHolder: 'Confirm Password',
          class: 'confirm-password'
        }
      }
    },
    components: {
      textBox: TextBoxWithLabel
    },
    methods: {
      update () {
        let inputElements = this.$el.getElementsByTagName('input')
        let confirmRegex = /^confirm-*/
        for (let element in inputElements) {
          if (confirmRegex.test(element)) {
            let idToFind = element.substring(8, element.length)
            if (this.user[idToFind] !== this.cloneUser[idToFind]) {
              // let alphaElement = this.$el.querySelector(idToFind)
              // let betaElement = this.$el.querySelctor(element)
            }
          }
        }
      },
      matchingFields (fieldId, fieldToMatchId) {
        // if field to match matches this value
        let field = document.findElementById(field)
        let fieldToMatch = document.findElementById(fieldToMatchId)
        return field.value === fieldToMatch.value
      }
    }
  }
</script>

<style scoped>

<style>

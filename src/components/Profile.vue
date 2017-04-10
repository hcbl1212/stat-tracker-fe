<template>
  <div class="form-container profile" style='max-width:700px;'>
    <h1> {{user.name}}'s Profile</h1>
    <h1 class='error' v-model='error'> {{error}}</h1>
          
    <form v-on:submit.prevent='update()' style='max-width:700px;'>
      <div class='field-wrap' style="width:75%;">
        <span class="error error-display" id="error-name"></span>
        <textBox ref="name" :label='nameLabel' :textbox='nameInput' v-model='user.name' value='user.name'></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;'>
        <span class="error error-display" id="error-email"></span>
        <textBox ref="email":label='emailLabel' :textbox='emailInput' v-model='user.email' value='user.email'></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;margin-left:35px;'>
        <span class="error error-display" id="error-confirm-email"></span>
        <textBox ref="confirm-email" :label='confirmEmailLabel' :textbox='confirmEmailInput'  value=''></textBox>
      </div>
      <div class='field-wrap' style='width:35%;display:inline-block;'>
        <span class="error error-display" id="error-password"></span>
        <textBox ref="password":label='passwordLabel' :textbox='passwordInput' v-model='user.password' value=''></textBox>
      </div> 
      <div class='field-wrap' style='width:35%;display:inline-block;margin-left:35px;'>
        <span class="error error-display" id="error-confirm-password"></span>
        <textBox ref="confirm-password" :label='confirmPasswordLabel' :textbox='confirmPasswordInput'  value=''></textBox>
      </div> 
      <button class='button button-block update-profile'>Update Profile</button>
    </form>
  </div>
</template>

<script>
  import TextBoxWithLabel from './TextBoxWithLabel.vue'
  import InputAndLabel from '@/utilities/inputAndLabel.js'
  import UserStore from '@/store/modules/user.js'

  let inputs = [
    new InputAndLabel({placeHolder: 'Full Name', class: 'name'}, {type: 'name', id: 'name', required: true}),
    new InputAndLabel({placeHolder: 'Email', class: 'email'}, {type: 'email', id: 'email', required: true}),
    new InputAndLabel({placeHolder: 'Confirm Email', class: 'confirm-email'}, {type: 'email', id: 'confirm-email', required: true}),
    new InputAndLabel({placeHolder: 'Password', class: 'password'}, {type: 'password', id: 'password', required: true}),
    new InputAndLabel({placeHolder: 'Confirm Password', class: 'confirm-password'}, {type: 'password', id: 'confirm-password', required: true})
  ]

  export default {
    name: 'profile',
    beforeCreate () {
      this.$store = UserStore
      this.$store.commit('SET_USER', this.$auth.user())
    },
    mounted () {
      for (let input of inputs) {
        this.$data[input.getLabel().dataName] = input.getLabel()
        this.$data[input.getInput().dataName] = input.getInput()
      }
    },
    data () {
      return {
        context: 'profile context',
        error: '',
        nameInput: {
        },
        nameLabel: {
        },
        emailInput: {
        },
        emailLabel: {
        },
        confirmEmailInput: {
        },
        confirmEmailLabel: {
        },
        passwordInput: {
        },
        passwordLabel: {
        },
        confirmPasswordInput: {
        },
        confirmPasswordLabel: {
        }
      }
    },
    components: {
      textBox: TextBoxWithLabel
    },
    computed: {
      user: {
        get () {
          return this.$store.getters.user
        },
        set (user) {
          this.$store.dispatch('UPDATE_USER', user)
        }
      }
    },
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
            if (this.user[idToFind] !== this.cloneUser[idToFind]) {
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
            }
          } else {
            idToFind = element.id
          }
          if (noError && this.user[idToFind] !== undefined) {
            tempUser[idToFind] = element.value
          }
        }// end of for
        if (noError) {
          this.user = Object.assign(this.user, tempUser)
        }
      }
    }
  }
</script>

<style scoped>
  .error-display {
    display: inline-block;
    width: 110%;
  }
<style>

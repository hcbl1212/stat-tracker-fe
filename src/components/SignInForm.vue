<template>
  <div class='form-container sign-in-form'>
    <h1> Sign In</h1>
    <h1 class='error' v-model='error'> {{error}}</h1>
          
    <form v-on:submit.prevent='login()'>
      <div class='field-wrap'>
        <textBox :label='emailLabel' :textbox='emailInput' v-model='data.body.email' value=''></textBox>
      </div>
      <div class='field-wrap'>
        <textBox :label='passwordLabel' :textbox='passwordInput' v-model='data.body.password' value=''></textBox>
      </div> 
      <button class='button button-block login-button'>Log In</button>
    </form>
  </div>
</template>

<script>

  import TextBoxWithLabel from './TextBoxWithLabel.vue'

  export default {
    name: 'SignInForm',
    data () {
      return {
        context: 'login context',
        data: {
          body: {
            email: '',
            password: ''
          },
          rememberMe: false
        },
        error: '',
        emailInput: {
          type: 'email',
          id: 'email-address',
          required: true
        },
        emailLabel: {
          placeHolder: 'Email Address',
          class: 'email-address'
        },
        passwordInput: {
          type: 'password',
          id: 'password',
          required: true
        },
        passwordLabel: {
          placeHolder: 'Password',
          class: 'password'
        }
      }
    },
    components: {
      textBox: TextBoxWithLabel
    },
    mounted () {
     // console.log(this.$auth.redirect())
    },
    methods: {
      login () {
        // resetting any earlier errors
        this.error = ''
        this.$auth.login({
          url: 'users/sign_in',
          // fetchUser: false,
          token: [{request: 'Authorization', response: 'Authorization', authType: 'bearer', foundIn: 'header'}],
          params: {
            email: this.data.body.email,
            password: this.data.body.password
          },
          rememberMe: this.data.rememberMe,
          redirect: '/dashboard',
          success (res) {
            // setting the user manually because
            // we return the user differently
            // than how the jwt module is expecting it
            // this.$auth.user(res.data.user)
            // this.$auth.authenticated = true
            // this.$auth.currentToken = localStorage.getItem('default-JWT')
          },
          error (res) {
            this.error = res.response.data.error.toUpperCase().replace('_', ' ')
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>

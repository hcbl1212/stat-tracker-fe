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
        error: null,
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
          class: 'password',
          id: 'password'
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
        this.error = null
        this.$auth.login({
          url: 'users/sign_in',
          fetchUser: false,
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
            this.$auth.user(res.data.user)
          },
          error (res) {
            this.error = res.response.data.error.toUpperCase().replace('_', ' ')
          }
        })
      },
      clearPlaceHolder (labelId) {
        var element = document.getElementsByClassName(labelId)[0]
        if (event.target.value === '') {
          element.style.display = 'initial'
        } else {
          element.style.display = 'none'
        }
      }
    }
  }
</script>

<style scoped>

   .error {
      color: red;
    }

  .form-container {
    background: #66CCFF;;
    color: white;
    padding: 10px 20px 40px 20px;
    max-width: 600px;
    margin: 40px auto;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  }

  .field-wrap {
    position: relative;
    margin-bottom: 40px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .top-row:after {
    content: "";
    display: table;
    clear: both;
  }
  .top-row > div {
    float: left;
    width: 48%;
    margin-right: 4%;
  }
  .top-row > div:last-child {
    margin: 0;
  }

  .button {
    border: 0;
    outline: none;
    border-radius: 0;
    padding: 15px 0;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .1em;
    background: #003399;
    color: #ffffff;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    -webkit-appearance: none;
  }

  .button:hover, .button:focus {
    background: #CCFFCC;
    color: black;
  }

  .button-block {
    display: block;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>

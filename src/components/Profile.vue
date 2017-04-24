<template>
  <div class="form-container profile" style='max-width:700px;'>
    <h1> {{user.name}}'s Profile</h1>
    <h1 v-show="updateStatus.status === 500" class='error'> {{updateStatus.message}}</h1>
    <h1 v-show="updateStatus.status === 200" class='saved'> {{updateStatus.message}}</h1>
    <tabs>
      <tab title='Name'  :is-active='true'>
        <userForm :user='user' style='max-width:700px;'>
          <div class='field-wrap' style="width:75%;">
            <span class="error error-display" id="error-name"></span>
            <textBox ref="name" :label='nameLabel' :textbox='nameInput' v-model='user.name' value='user.name'></textBox>
          </div>
          <div class='field-wrap' style='width:35%;display:inline-block;'>
            <span class="error error-display" id="error-password"></span>
            <textBox ref="original-password" :label='originalPasswordLabel'
                 :textbox='originalPasswordInput' v-model='user.originalPassword' value=''></textBox>
          </div> 
          <button class='button button-block update-profile font-size-x-large'>Update Name</button>
        </userForm>
      </tab>
      <tab title='Email'>
        <userForm :user='user' style='max-width:700px;'>
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
            <textBox ref="original-password" :label='originalPasswordLabel'
                 :textbox='originalPasswordInput' v-model='user.originalPassword' value=''></textBox>
          </div> 
          <button class='button button-block update-profile font-size-x-large'>Update Email</button>
        </userForm>     
      </tab>
      <tab title='Password'>
        <userForm :user='user' style='max-width:700px;'>
          <div class='field-wrap' style='width:35%;display:inline-block;'>
            <span class="error error-display" id="error-password"></span>
            <textBox ref="password":label='passwordLabel' :textbox='passwordInput' v-model='user.password' value=''></textBox>
          </div> 
          <div class='field-wrap' style='width:35%;display:inline-block;margin-left:35px;'>
            <span class="error error-display" id="error-confirm-password"></span>
            <textBox ref="confirm-password" :label='confirmPasswordLabel' :textbox='confirmPasswordInput'  value=''></textBox>
          </div> 
          <div class='field-wrap' style='width:35%;display:inline-block;'>
            <span class="error error-display" id="error-password"></span>
            <textBox ref="original-password" :label='originalPasswordLabel'
                 :textbox='originalPasswordInput' v-model='user.originalPassword' value=''></textBox>
          </div> 
          <button class='button button-block update-profile font-size-x-large'>Update Password</button>
        </userForm>    
      </tab>
    </tabs> 
  </div>
</template>

<script>
  import {TextBoxWithLabel, Tab, Tabs, UserForm, ProfileTextBoxesWithLabels, store} from '@/imports/profile_imports.js'
  let inputs = new ProfileTextBoxesWithLabels().getInputs()

  export default {
    name: 'profile',
    beforeCreate () {
      this.$store = store
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
        },
        originalPasswordInput: {
        },
        originalPasswordLabel: {
        }
      }
    },
    components: {
      textBox: TextBoxWithLabel,
      tab: Tab,
      tabs: Tabs,
      userForm: UserForm
    },
    computed: {
      user: {
        get () {
          return this.$store.getters.user
        },
        set (user) {
          this.$store.dispatch('UPDATE_USER', user)
        }
      },
      updateStatus: {
        get () {
          return this.$store.getters.updateStatus
        },
        set (updateStatus) {
          this.$store.dispatch('UPDATE_STATUS', updateStatus)
        }
      }
    }
  }
</script>

<style scoped>
<style>

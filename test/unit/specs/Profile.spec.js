import Vue from 'vue'
import Profile from '@/components/Profile'
import InputAndLabel from '@/utilities/inputAndLabel.js'

describe('Profile.vue', () => {
  it('should set the user', () => {
    let inputs = [
      new InputAndLabel({placeHolder: 'Full Name', class: 'name'}, {type: 'name', id: 'name', required: true}),
      new InputAndLabel({placeHolder: 'Email', class: 'email'}, {type: 'email', id: 'email', required: true}),
      new InputAndLabel({placeHolder: 'Confirm Email', class: 'confirm-email'}, {type: 'email', id: 'confirm-email', required: true}),
      new InputAndLabel({placeHolder: 'Password', class: 'password'}, {type: 'password', id: 'password', required: true}),
      new InputAndLabel({placeHolder: 'Confirm Password', class: 'confirm-password'}, {type: 'password', id: 'confirm-password', required: true})
    ]

    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    for (let input of inputs) {
      vm.$data[input.getLabel().dataName] = input.getLabel()
      vm.$data[input.getInput().dataName] = input.getInput()
    }
    vm.$auth.user({id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    vm.user = vm.$auth.user()
    Vue.nextTick(() => {
      expect(vm.user.id).to.equal(159)
      expect(vm.user.name).to.equal('Dr. Brian')
      expect(vm.user.email).to.equal('brian@this.com')
    })
  })

  it('should render prepopulated data from previous test', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#name').value).to.equal('Dr. Brian')
      expect(vm.$el.querySelector('#email').value).to.equal('brian@this.com')
    })
  })
})

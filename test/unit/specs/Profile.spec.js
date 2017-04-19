import Vue from 'vue'
import Profile from '@/components/Profile'
import * as moxios from 'moxios'
// import sinon from 'sinon'

describe('Profile.vue', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should set the user', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
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

  it('should not update the users information if original password does not match the users password', (done) => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    vm.$auth.user({id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    vm.user = vm.$auth.user()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#name').value).to.equal('Dr. Brian')
      vm.$el.querySelector('#name').value = 'Dr. Brian Ludwig'
      vm.$el.querySelector('#originalPassword').value = 'passworda'
      vm.$el.querySelector('button.button').click()
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 400,
          response: {message: 'Password does not match current user\'s password.'}
        }).then(() => {
          expect(vm.$el.querySelector('.error').textContent).to.equal(' Password does not match current user\'s password.')
          done()
        })
      })
    })
  })

  it('should not update the users email if confirmation email does not match the new email ', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    vm.$auth.user({id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    vm.user = vm.$auth.user()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#Name-tab-header').classList.contains('active')).to.equal(true)
      expect(vm.$el.querySelector('#Email-tab-header').classList.contains('active')).to.equal(false)
      vm.$el.querySelector('#Email-tab-header').click()
      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#Name-tab-header').classList.contains('active')).to.equal(false)
        expect(vm.$el.querySelector('#Email-tab-header').classList.contains('active')).to.equal(true)
        expect(vm.$el.querySelector('#email').value).to.equal('brian@this.com')
        vm.$el.querySelector('#confirm-email').value = 'brian2@this.com'
        vm.$el.querySelector('#originalPassword').value = 'passworda'
        vm.$el.querySelectorAll('button.button')[1].click()
        Vue.nextTick(() => {
          expect(vm.$el.querySelector('#error-confirm-email').textContent)
          .to.equal('Email and confirmation do not match.')
        })
      })
    })
  })
})

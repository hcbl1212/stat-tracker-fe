import Vue from 'vue'
import Profile from '@/components/Profile'

describe('Profile.vue', () => {
  let server
  beforeEach(function () {
    server = sinon.fakeServer.create()
  })

  afterEach(function () {
    server.restore()
  })

  it('should set the user', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    vm.$auth.user({id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    vm.user = vm.$auth.user()
    vm.$data.cloneUser = {...vm.$auth.user()}
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

  it('should not update the users information if it is dirty but the confirm do not match original', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    server.respondWith('PUT', '/users/' + vm.user.id, [200, {}, ''])
    vm.$auth.user({id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    vm.user = vm.$auth.user()
    vm.$data.cloneUser = {id: 159, name: 'Dr. Brian', email: 'brian999@this.com'}
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#name').value).to.equal('Dr. Brian')
      expect(vm.$el.querySelector('#email').value).to.equal('brian@this.com')
      let e = document.createEvent('HTMLEvents')
      e.initEvent('keyup', true, true)
      e.keyCode = 13
      vm.$el.querySelector('#name').value = 'Dr. Brian Ludwig'
      vm.$el.querySelector('#email').value = 'brian1@this.com'
      vm.$el.querySelector('#confirm-email').value = 'brian2@this.com'
      vm.$el.querySelector('#password').value = 'password'
      vm.$el.querySelector('#confirm-password').value = 'passworda'
      vm.$el.querySelector('button.button').click()
      expect(vm.user.email).to.equal('brian@this.com')
      expect(vm.user.name).to.equal('Dr. Brian')
    })
  })

  it('should update the users information', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    server.respondWith('PUT', '/users/' + vm.user.id, [200, {}, ''])
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#name').value).to.equal('Dr. Brian')
      expect(vm.$el.querySelector('#email').value).to.equal('brian@this.com')
      let e = document.createEvent('HTMLEvents')
      e.initEvent('keyup', true, true)
      e.keyCode = 13
      vm.$el.querySelector('#name').value = 'Dr. Brian Ludwig'
      vm.$el.querySelector('#name').dispatchEvent(e)
      vm.$el.querySelector('#email').value = 'brian1@this.com'
      vm.$el.querySelector('#email').dispatchEvent(e)
      vm.$el.querySelector('#confirm-email').value = 'brian1@this.com'
      vm.$el.querySelector('#confirm-email').dispatchEvent(e)
      vm.$el.querySelector('#password').value = 'password'
      vm.$el.querySelector('#password').dispatchEvent(e)
      vm.$el.querySelector('#confirm-password').value = 'password'
      vm.$el.querySelector('#confirm-password').dispatchEvent(e)
      vm.$el.querySelector('button.button').click()
      Vue.nextTick(() => {
        expect(vm.$el.querySelector(' h1').textContent)
        .to.equal(' Dr. Brian Ludwig\'s Profile')
        expect(vm.user.name).to.equal('Dr. Brian Ludwig')
      })
    })
  })

  it('should update the users information if it is dirty but the confirm match original', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    server.respondWith('PUT', '/users/' + vm.user.id, [200, {}, ''])
    vm.$data.cloneUser = {id: 159, name: 'Dr. Brian', email: 'brian999@this.com'}
    Vue.nextTick(() => {
      expect(vm.$el.querySelector(' h1').textContent)
      .to.equal(' Dr. Brian\'s Profile')
      expect(vm.$el.querySelector('#name').value).to.equal('Dr. Brian')
      expect(vm.$el.querySelector('#email').value).to.equal('brian@this.com')
      let e = document.createEvent('HTMLEvents')
      e.initEvent('keyup', true, true)
      e.keyCode = 13
      vm.$el.querySelector('#name').value = 'Dr. Brian Ludwig'
      vm.$el.querySelector('#name').dispatchEvent(e)
      vm.$el.querySelector('#email').value = 'brian1@this.com'
      vm.$el.querySelector('#email').dispatchEvent(e)
      vm.$el.querySelector('#confirm-email').value = 'brian1@this.com'
      vm.$el.querySelector('#confirm-email').dispatchEvent(e)
      vm.$el.querySelector('#password').value = 'password'
      vm.$el.querySelector('#password').dispatchEvent(e)
      vm.$el.querySelector('#confirm-password').value = 'password'
      vm.$el.querySelector('#confirm-password').dispatchEvent(e)
      vm.$el.querySelector('button.button').click()
      Vue.nextTick(() => {
        expect(vm.$el.querySelector(' h1').textContent)
        .to.equal(' Dr. Brian Ludwig\'s Profile')
        expect(vm.user.name).to.equal('Dr. Brian Ludwig')
      })
    })
  })
})

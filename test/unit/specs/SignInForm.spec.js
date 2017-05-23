/*
import Vue from 'vue'
import Router from '@/router/index.js'
import SignInForm from '@/components/SignInForm'

describe('SignInForm', () => {
  let server
  beforeEach(function () {
    server = sinon.fakeServer.create()
  })

  afterEach(function () {
    server.restore()
  })

  it('should render correct contents', (done) => {
    const Constructor = Vue.extend(SignInForm)
    const vm = new Constructor().$mount()
    done()
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal(' Sign In')
    expect(vm.$el.querySelector('button.login-button').textContent).to.equal('Log In')
  })

  it('sets the correct default data', () => {
    expect(typeof SignInForm.data).to.equal('function')
    const vm = SignInForm.data()
    expect(vm.context).to.equal('login context')
    expect(vm.error).to.equal('')
    expect(vm.data.body.email).to.equal('')
    expect(vm.data.body.password).to.equal('')
    expect(vm.data.rememberMe).to.equal(false)
    expect(vm.emailInput.type).to.equal('email')
    expect(vm.emailInput.id).to.equal('email-address')
    expect(vm.emailInput.required).to.equal(true)
    expect(vm.emailLabel.placeHolder).to.equal('Email Address')
    expect(vm.emailLabel.class).to.equal('email-address')
    expect(vm.passwordInput.type).to.equal('password')
    expect(vm.passwordInput.id).to.equal('password')
    expect(vm.passwordInput.required).to.equal(true)
    expect(vm.passwordLabel.placeHolder).to.equal('Password')
    expect(vm.passwordLabel.class).to.equal('password')
  })

  it('should call the login user method', (done) => {
    const Constructor = Vue.extend(SignInForm)
    const vm = new Constructor({router: Router}).$mount()
    Vue.use(Router)
    server.respondWith('POST', 'users/sign_in', [200, {}, ''])
    done()
    let evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, true)
    Vue.nextTick(() => {
      done()
      vm.$el.querySelector('button').dispatchEvent(evt)
    })
  })
}) */

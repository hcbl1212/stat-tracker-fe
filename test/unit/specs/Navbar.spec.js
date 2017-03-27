import Vue from 'vue'
import Navbar from '@/components/Navbar'
import Router from '@/router/index.js'

describe('Navbar', () => {
  let server
  beforeEach(function () {
    server = sinon.fakeServer.create()
  })

  afterEach(function () {
    server.restore()
  })

  it('should logout the user', done => {
    Vue.use(Router)
    server.respondWith('POST', '/users/sign_out', [200, {}, ''])
    const Constructor = Vue.extend(Navbar)
    const vm = new Constructor({router: Router}).$mount()
    let evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, true)
    Vue.nextTick(() => {
      done()
      vm.$el.querySelector('a.sign-out').dispatchEvent(evt)
    })
  })

  it('sets the correct default data', () => {
    expect(typeof Navbar.data).to.equal('function')
    const vm = Navbar.data()
    expect(vm.navLinks[0].path).to.equal('dashboard')
    expect(vm.navLinks[0].description).to.equal('Dashboard')
    expect(vm.navLinks[0].class).to.equal('dashboard-link')
    expect(vm.navLinks[1].path).to.equal('view-stat')
    expect(vm.navLinks[1].description).to.equal('View Stats')
    expect(vm.navLinks[1].class).to.equal('view-stat-link')
    expect(vm.navLinks[2].path).to.equal('log-stat')
    expect(vm.navLinks[2].description).to.equal('Log Stats')
    expect(vm.navLinks[2].class).to.equal('log-stat-link')
    expect(vm.navLinks[3].path).to.equal('profile')
    expect(vm.navLinks[3].description).to.equal('Profile')
    expect(vm.navLinks[3].class).to.equal('rightSidebar profile-link')
  })
})

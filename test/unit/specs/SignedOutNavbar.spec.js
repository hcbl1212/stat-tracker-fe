import SignedOutNavbar from '@/components/SignedOutNavbar'

describe('SignedOutNavbar', () => {
  it('sets the correct default data', () => {
    expect(typeof SignedOutNavbar.data).to.equal('function')
    const vm = SignedOutNavbar.data()
    expect(vm.navLinks[0].path).to.equal('/')
    expect(vm.navLinks[0].description).to.equal('Stat Tracker')
    expect(vm.navLinks[0].class).to.equal('landing')
    expect(vm.navLinks[1].path).to.equal('/login')
    expect(vm.navLinks[1].description).to.equal('Sign In')
    expect(vm.navLinks[1].class).to.equal('rightNavbar sign-in')
  })
})

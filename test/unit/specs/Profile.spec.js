import Vue from 'vue'
import Profile from '@/components/Profile'

describe('Profile.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector(' h1').textContent)
      .to.equal('this is my profile')
  })
})

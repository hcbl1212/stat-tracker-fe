import Vue from 'vue'
import Landing from '@/components/Landing'

describe('Landing.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Landing)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.landing h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})

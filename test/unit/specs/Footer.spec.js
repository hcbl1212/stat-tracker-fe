import Vue from 'vue'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Footer)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('span').textContent)
      .to.equal(' facebook  |')
  })
})

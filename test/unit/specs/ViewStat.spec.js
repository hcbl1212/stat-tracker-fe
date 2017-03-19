import Vue from 'vue'
import ViewStat from '@/components/ViewStat'

describe('ViewStat.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ViewStat)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector(' h1').textContent)
      .to.equal('I am the View Stat template')
  })
})

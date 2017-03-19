import Vue from 'vue'
import LogStat from '@/components/LogStat'

describe('LogStat.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(LogStat)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector(' h1').textContent)
      .to.equal('I am the Log Stat template')
  })
})

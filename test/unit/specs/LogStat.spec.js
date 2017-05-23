import Vue from 'vue'
import LogStat from '@/components/MetricRoleInstance'
import * as moxios from 'moxios'

describe('LogStat.vue', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('it should set the default values', () => {
    expect(typeof LogStat.data).to.equal('function')
    const loginData = LogStat.data()
    expect(loginData.context).to.equal('metric role instance context')
    expect(loginData.selectedRole).to.equal('Select Role')
    expect(loginData.selectedMetric).to.equal('Select Metric')
    expect(loginData.showMRIMetric).to.equal(false)
    expect(loginData.showMRICount).to.equal(false)
  })

  it('it should display the proper roles in the role select box', (done) => {
    let Constructor = Vue.extend(LogStat)
    let vm = new Constructor().$mount()
    vm.$store.commit('SET_USER', {id: 159, name: 'Dr. Brian', email: 'brian@this.com'})
    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({
        status: 200,
        headers: {
          Authorization: 'Bearer: 12341324jlkj4132l4kj1234'
        },
        response: {
          data: {
            user: {
              roles: [
                {id: 1, name: 'Doctor'},
                {id: 2, name: 'Nurse'},
                {id: 3, name: 'Clinical Documentation Specialist'}
              ]
            }
          }
        }
      }).then((data) => {
        expect(vm.$el.querySelector(' h1').textContent)
        .to.equal(' Dr. Brian Log Stat ')
        // make a selection and then respond to that one
        vm.selectedRole = 2
        moxios.wait(() => {
          moxios.requests.mostRecent().respondWith({
            status: 200,
            headers: {
              Authorization: 'Bearer: 12341324jlkj4132l4kj1234'
            },
            response: {
              data: {
                role: {
                  metrics: [
                    {id: 1, description: 'Surgery'},
                    {id: 2, description: 'Mutation Removal'},
                    {id: 3, description: 'Pooper Scooper'}
                  ]
                }
              }
            }
          }).then(() => {
            vm.selectedMetric = 2
            console.log(vm.$el)
            vm.count = 15
            vm.$el.querySelector('button.button').click()
            moxios.wait(() => {
              moxios.requests.mostRecent().respondWith({
                status: 200,
                headers: {
                  Authorization: 'Bearer: 12341324jlkj4132l4kj1234'
                },
                response: {
                  data: {}
                }
              }).then(() => {
                done()
              })
            })
          })
        })
      })// end of first then
    })// end of moxios wait
  })
})

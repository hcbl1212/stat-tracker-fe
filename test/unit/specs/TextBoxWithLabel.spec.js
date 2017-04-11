import Vue from 'vue'
import TextBoxWithLabel from '@/components/TextBoxWithLabel'
/*
function getRenderedText (TextBoxWithLabel, propsData) {
  const Ctor = Vue.extend(TextBoxWithLabel)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}
*/
describe('TextBoxWithLabel', () => {
/*  it('renders correctly with different props', () => {
    expect(
      getRenderedText(TextBoxWithLabel, {
        textBox: {
          type: 'email',
          id: 'email-address',
          required: true
        },
        label: {
          placeHolder: 'Email Address',
          class: 'email-address'
        }
      })
    ).to.equal('email')
  })
*/
  it('should fire the emit event if called', () => {
    // this functionality is covered in the e2e
    // test by submitting the form, however
    // this functionality should be tested
    // to make sure the function can be called
    let textBox = new Vue(TextBoxWithLabel)
    let callback = sinon.spy(textBox, '$emit').withArgs('Dummy Value')
    textBox.emitInput(callback)
    // this confirms when emitInput is called that it
    // actually fires this.$emit('input', value)
    expect(callback.withArgs('Dummy Value').calledOnce)
  })

  it('should clear the the label after a key event with text in the input', done => {
    // let textBox = new Vue(TextBoxWithLabel)
    let vm = new Vue({
      template: "<span><textBox :label='emailLabel' :textbox='emailInput' v-model='data.body.email' value=''></textBox></span>",
      data () {
        return {
          context: 'login context',
          data: {
            body: {
              email: '',
              password: ''
            },
            rememberMe: false
          },
          error: '',
          emailInput: {
            type: 'email',
            id: 'email-address',
            required: true
          },
          emailLabel: {
            placeHolder: 'Email Address',
            class: 'email-address'
          }
        }
      },
      components: {
        textBox: TextBoxWithLabel
      }
    }).$mount()
    var e = document.createEvent('HTMLEvents')
    e.initEvent('keyup', true, true)
    e.keyCode = 13
    vm.$el.querySelector('#email-address').value = 'happy'
    vm.$el.querySelector('#email-address').dispatchEvent(e)
    Vue.nextTick(() => {
      done()
      expect(vm.$el.querySelector('label.email-address').style.display).to.equal('none')
    })
  })
  it('should not clear the the label after a key event with text in the input if the input is blank', done => {
    // let textBox = new Vue(TextBoxWithLabel)
    let vm = new Vue({
      template: "<span><textBox :label='emailLabel' :textbox='emailInput' v-model='data.body.email' value=''></textBox></span>",
      data () {
        return {
          context: 'login context',
          data: {
            body: {
              email: '',
              password: ''
            },
            rememberMe: false
          },
          error: '',
          emailInput: {
            type: 'email',
            id: 'email-address',
            required: true
          },
          emailLabel: {
            placeHolder: 'Email Address',
            class: 'email-address'
          }
        }
      },
      components: {
        textBox: TextBoxWithLabel
      }
    }).$mount()
    var e = document.createEvent('HTMLEvents')
    e.initEvent('keyup', true, true)
    e.keyCode = 13
    Vue.nextTick(() => {
      done()
      vm.$el.querySelector('input').dispatchEvent(e)
      expect(vm.$el.querySelector('label').textContent).to.equal('\n    Email Address*')
    })
  })
})

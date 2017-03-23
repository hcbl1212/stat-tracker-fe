<template>
  <span>
    <label :class='label.class' :id='label.id'>
      {{label.placeHolder}}<span class='req' v-if='textbox.required'>*</span>
    </label>

    <input 
      v-if="textbox.type === 'email'"
      ref='input'
      v-on:input="emitInput($event.target.value)" :value='value'
      :id='textbox.id' type='email'
      :required='textbox.required' autocomplete='off'
      v-on:keyup="clearPlaceHolder(label.class)"
    />

    <input
       v-else-if="textbox.type === 'password'"
      ref='input'
      v-on:input="emitInput($event.target.value)" :value='value'
      :id='textbox.id' type='password'
      :required='textbox.required' autocomplete='off'
      v-on:keyup="clearPlaceHolder(label.class)"
    />

    <input
       v-else 
      ref='input'
      v-on:input="emitInput($event.target.value)" :value='value'
       type='textbox':id='textbox.id'
      :required='textbox.required' autocomplete='off'
      v-on:keyup="clearPlaceHolder(label.class)"
    />
  </span>
</template>

<script>
  export default {
    name: 'textBoxWithLabel',
    props: ['label', 'textbox', 'value'],
    methods: {
      clearPlaceHolder (labelClass) {
        var element = document.getElementsByClassName(labelClass)[0]
        if (event.target.value === '') {
          element.style.display = 'initial'
        } else {
          element.style.display = 'none'
        }
      },
      emitInput (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>
  label {
    position: absolute;
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
    left: 13px;
    color: rgba(255, 255, 255, 0.5);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    -webkit-backface-visibility: hidden;
    pointer-events: none;
    font-size: 22px;
}
  label .req {
    margin: 2px;
    color: #CCFFCC;
  }
  label.active {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    left: 2px;
    font-size: 14px;
  }

  label.active .req {
    opacity: 0;
  }

  label.highlight {
    color: #ffffff;
  }

  input, textarea {
    font-size: 22px;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: #ffffff;
    border-radius: 0;
    -webkit-transition: border-color .25s ease, box-shadow .25s ease;
    transition: border-color .25s ease, box-shadow .25s ease;
  }

  input:focus, textarea:focus {
    outline: 0;
    border-color: #CCFFCC;
  }

  textarea {
    border: 2px solid #a0b3b0;
    resize: vertical;
  }


</style>

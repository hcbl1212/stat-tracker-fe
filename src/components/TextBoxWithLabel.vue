<template>
  <label :class='label.class' :id='label.id'>
    {{placeHolder}}<span class='req' v-if="required">*</span>
  </label>
  <input v-model='textbox.model' :id="textbox.id" :type='textbox.type' :required="required" autocomplete='off' v-on:keyup="clearPlaceHolder('label.class')"/>
</template>

<script>
  export default {
    name: 'textBoxWithLabel',
    props: ['label', 'textbox','required', 'placeholder']
    methods: {
      clearPlaceHolder (labelClass) {
        var element = document.getElementsByClassName(labelClass)[0]
        if (event.target.value === '') {
          element.style.display = 'initial'
        } else {
          element.style.display = 'none'
        }
      }
    }
  }
</script>

<style scoped>

</style>

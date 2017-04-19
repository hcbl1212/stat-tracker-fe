<template>
  <div class="top-tabs">
    <a href='#' v-for="tab in tabs" :class="[{'active': current === tab}, 'tab-header']" :id="tab.title + '-tab-header'" @click.prevent="changeTab(tab)">
      Change {{tab.title}}
    </a>
      <slot></slot> 
  </div>
</template>

<script>
 export default {
   name: 'tabs',
   mounted () {
     // console.log(this)
   },
   data () {
     return {
       context: 'tabs context',
       tabs: [],
       current: null
     }
   },
   methods: {
     addTab: function (tab) {
       this.tabs.push(tab)
       if (tab.active === true) {
         this.current = tab
       }
     },
     changeTab: function (tab) {
       // lets call any messages rather they are successful or errors
       this.$parent.$store.commit('SET_UPDATE_STATUS', {status: null, message: ''})
       this.current = tab
       this.tabs.forEach(function (value) {
         if (value === tab) {
           value.active = true
         } else {
           value.active = false
         }
       })
     }
   }
 }
</script>
<style scoped>
  .tab-header.active {
    border-bottom: none;
    background: #CCFFCC;
    color: black !important;
  }

  .tab-body.active {
    border: thin solid #CCFFCC;
  }

  div.top-tabs > .tab-header {
    border-left: thin solid #CCFFCC;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  div.top-tabs > .tab-header ~ .tab-header {
    border-left: none;
  }

  .tab-header {
    float: left;
    padding: 10px;
    padding-right: 30px;
    border: thin solid #CCFFCC;
    border-bottom: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: white;
  }

  .tab-body { 
    padding-top: 40px;
    clear: both;
    border-radius: 4px;
    border-top-left-radius: 0;
  }

</style>

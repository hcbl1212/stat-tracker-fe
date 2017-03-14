<template>
    <footer class="footer">
    <span v-for='item in footerInformation' class='content'> {{item.content}}  <span class='separator'>{{item.separator}}</span> </span> 
    </footer>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        footerInformation: [
          {content: 'facebook', separator: '|'},
          {content: 'twitter', separator: '|'},
          {content: 'instagram'}
        ]
      }
    }
  }

</script>

<style scoped>
  .footer {
    background-color: #66CCFF;
    overflow: hidden;
    bottom: 0;
    position: absolute;
    width: 100%;
    color: white;
    padding: 14px 16px;
  }
  .content {
    display: inline-block;
    margin-right: 15px;
  }
  .separator{
    color: #CCFFCC;
    display: inline-block;
    margin-left: 15px;
  }
</style>

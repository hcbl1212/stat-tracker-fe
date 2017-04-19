<template>
  <div id="app">
    <header>
      <router-view name='navbar'></router-view>
    </header>
    <router-view name='main'></router-view>
    <router-view name='footer'></router-view> 
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%
  }

  .saved {
    color: #CCFFCC; 
  }

  .error {
     color: red;
   }

   a {
    text-decoration: none;
   }
  .form-container {
    background: #66CCFF;;
    color: white;
    padding: 10px 20px 40px 20px;
    max-width: 600px;
    margin: 40px auto;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  }

  .field-wrap {
    position: relative;
    margin-bottom: 40px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  .top-row:after {
    content: "";
    display: table;
    clear: both;
  }

  .top-row > div {
    float: left;
    width: 48%;
    margin-right: 4%;
  }

  .top-row > div:last-child {
    margin: 0;
  }

  .button {
    border: 0;
    outline: none;
    border-radius: 0;
    padding: 15px 0;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .1em;
    background: #003399;
    color: #ffffff;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    -webkit-appearance: none;
  }

  .button:hover, .button:focus {
    background: #CCFFCC;
    color: black;
  }
  
  .font-size-x-large {
    font-size: x-large; 
  }

  .button-block {
    display: block;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }

</style>

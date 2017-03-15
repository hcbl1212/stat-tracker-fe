<template>
  <div class="form-container">
    <h1> Sign In</h1>
    <form>
      <div class="field-wrap">
        <label>
          Email Address<span class="req">*</span>
        </label>
        <input type="email"required autocomplete="off"/>
      </div>
      <div class="field-wrap">
        <label>
          Password<span class="req">*</span>
        </label>
        <input type="password"required autocomplete="off"/>
      </div> 
      <button class="button button-block">Log In</button>
    </form>
  </div>
</template>

<script>

  export default {
    name: 'SignInForm'
  }
</script>

<style scoped>

  .form-container {
    background: #66CCFF;;
    color: white;
    padding: 10px 20px 40px 20px;
    max-width: 600px;
    margin: 40px auto;
    border-radius: 4px;
    box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  }

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

  .button-block {
    display: block;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>

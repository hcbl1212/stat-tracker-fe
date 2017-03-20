// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.landing')
      .assert.containsText('h1', 'Welcome to Your Vue.js App');

    browser.element('css selector', '.sign-in', function(result) {
      if(result.status != -1) { //Element exists, do something
        browser.click('.sign-in')
        .waitForElementVisible('body',5000)
        .assert.elementPresent('.landing')
        .assert.containsText('h1', 'Sign In')
        .setValue('#email-address','bertha.lindgren@example.net')
        .setValue('#password','password');
        browser.element('css selector','.login-button',function(result1){
          if(result1.status != -1){
            browser.click('.login-button')
            .waitForElementVisible('.dashboard',5000)
            .assert.containsText('h1','I am the the dashboard')
            .end()
          } 
        })
      }
    }); 
  }
}

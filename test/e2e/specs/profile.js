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
        .setValue('#email-address','Standard10@ex.com')
        .setValue('#password','password');
        browser.element('css selector','.login-button',function(result1){
          if(result1.status != -1){
            browser.click('.login-button')
            .waitForElementVisible('.dashboard',5000)
            .assert.containsText('h1','I am the the dashboard');
            browser.element('css selector','.profile-link',function(result2){
              if(result1.status != -1){
                browser.click('.profile-link')
                .waitForElementVisible('.profile',5000)
                .assert.containsText('h1','Dr. Rupert')
                browser.element('css selector', '.update-profile', function(result3){
                  if(result1.status != -1){
                   browser.expect.element('.update-profile').text.to.equal('UPDATE NAME')   
                   browser.assert.elementPresent('#originalPassword')
                   .setValue('#originalPassword','poop')
                   browser.click('.update-profile')
                   .waitForElementVisible('.error',5000)
                   .assert.elementPresent('.error')
                   .assert.containsText('.error','Password does not match current user\'s password.')
                   browser.clearValue('#originalPassword')
                   .setValue('#originalPassword','password')
                   browser.click('.update-profile')
                   .waitForElementVisible('.saved',5000)
                   .assert.elementPresent('.saved')
                   .assert.containsText('.saved','Profile Successfully Updated.')
                   .end()
                  } 
                }); 
              }
            });
          } 
        })
      }
    }); 
  }
}

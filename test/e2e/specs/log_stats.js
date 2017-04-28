// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usagea
// #NOTE:::: if this tests fails make sure the user you are loggin in with
// has a role with value 1 and has a metric with an id of one as well
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
            browser.element('css selector','.log-stat-link',function(result2){
              if(result2.status != -1){
                browser.click('.log-stat-link')
                .pause(5000)
                .waitForElementVisible('.metric-role-instance',7000)
                .assert.containsText('h1','Dr. Rupert Spencer DDS Log Stat')
                .expect.element("#metric-select").to.have.css('display').which.equals('none')
                browser.element('css selector','#role-select',function(result3){
                  if(result3.status != -1){
                    browser.click('select[id="role-select"] option[value="1"]')
                    .pause(5000)
                    .waitForElementVisible('#metric-select',7000)
                    browser.element('css selector','#metric-select',function(result4){
                      if(result4.status != -1){
                        browser.click('select[id="metric-select"] option[value="1"]')
                        .waitForElementVisible('#metricValue',5000)
                        .end()
                      }
                    });
                  }
                });
              } 
            });
          }
        }); 
      }
    }); 
  }
}

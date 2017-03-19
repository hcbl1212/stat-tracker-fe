// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer+"/#/dashboard")
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.sign-in-form')
      .assert.containsText('h1','Sign In')
      .assert.containsText('label.email-address','Email Address')
      .assert.containsText('label.password', 'Password')
      .assert.containsText('button.login-button','LOG IN')
      .end()
  }
}
// .assert.elementCount('img', 1)

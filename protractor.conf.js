exports.config = {
  directConnect: true,
  chromeOnly: true,
  baseUrl: 'http://localhost:3000/',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  framework: 'mocha',

  onPrepare() {
    require('babel-register')

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false)
      }])
    }

    browser.addMockModule('disableNgAnimate', disableNgAnimate)
    browser.driver.manage().window().setSize(1280, 800)
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    // './**/*_spec.js'
    './agency/student/student_profile_spec.js'
  ],

  suites: {
    settings: './agency/settings/*_spec.js'
  },

  mochaOpts: {
    reporter: 'spec',
    timeout: 50000,
    slow: 4000
  }
}

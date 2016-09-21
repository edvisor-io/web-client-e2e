var url = (process.env.CI === 'true') ? 'https://e2e.edvisor.io:2999' : 'http://localhost:3000/'

exports.config = {
  directConnect: true,
  chromeOnly: true,
  baseUrl: url,

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
    browser.driver.manage().window().setPosition(-1280, 0)
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
    slow: 5000
  }
}

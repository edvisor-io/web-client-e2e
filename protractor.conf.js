var environmentMultiplier = 1
var url = 'http://localhost:3000/'
var directConnectFlag = true
if (process.env.CI === 'true') {
  environmentMultiplier = 2.5
  url = 'https://e2e.edvisor.io:2999'
  directConnectFlag = false
}

exports.config = {
  allScriptsTimeout: 11 * environmentMultiplier,
  baseUrl: url,
  chromeOnly: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  directConnect: directConnectFlag,
  framework: 'mocha',
  getPageTimeout: 10 * environmentMultiplier,

  mochaOpts: {
    reporter: 'spec',
    timeout: 80000 * environmentMultiplier,
    slow: 10000 * environmentMultiplier
  },

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
    './**/*_spec.js'
  ],

  suites: {
    settings: './agency/settings/*_spec.js'
  }
}

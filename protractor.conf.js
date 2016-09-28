var environmentMultiplier = 1
var url = 'http://localhost:3000/'
var xOffset = 0
var doWeShard = false
var howManyInstancesAtMost = 1

if (process.env.CI === 'true') {
  environmentMultiplier = 3
  url = 'https://e2e.edvisor.io:2999'
}

if (process.env.LM === 'true') {
  // positions it to the top left corner of an external monitor to the left
  xOffset = -1920
}

if (process.env.FT === 'true') {
  doWeShard = true
  howManyInstancesAtMost = 5
}

exports.config = {
  allScriptsTimeout: (11000 * environmentMultiplier),
  baseUrl: url,
  chromeOnly: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    maxInstances: howManyInstancesAtMost,
    name: 'windows10-chrome53',
    platform: 'Windows 10',
    screenResolution: '1280x800',
    shardTestFiles: doWeShard,
    version: '53.0',
    webdriverRemoteQuietExceptions: 'false'
  },

  directConnect: false,
  framework: 'mocha',
  getPageTimeout: (10000 * environmentMultiplier),

  mochaOpts: {
    reporter: 'spec',
    timeout: (80000 * environmentMultiplier),
    slow: (10000 * environmentMultiplier)
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

    // ignored in linux test environments
    browser.driver.manage().window().setSize(1280, 800)
    browser.driver.manage().window().setPosition(xOffset, 0)
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    './**/**/*_spec.js'
  ],

  suites: {
    auth: './auth/**/*_spec.js',
    courses: './agency/courses/*_spec.js',
    quotes: './agency/quotes/*_spec.js',
    studentListing: './agency/student/listing_spec.js',
    studentProfile: './agency/student/profile_spec.js',
    settings: './agency/settings/*_spec.js'
  }
}

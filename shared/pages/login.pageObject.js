import constants from '../constants'

export default class LoginPage {
  constructor() {
    this.emailField = element(by.css('input[name="email"]'))
    this.passwordField = element(by.css('input[name="password"]'))
    this.submitBtn = element(by.css('button[type="submit"]'))
  }

  login(login, pass) {
    this.emailField.sendKeys(login)
    this.passwordField.sendKeys(pass)
    this.submitBtn.click()
  }

  static waitForLoader() {
    var appLoader = element(by.css('.app-loader'))

    //wait until the loader has disappeared
    browser.wait(function() {
      return browser.isElementPresent(appLoader).then(function(presenceOfElement) {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

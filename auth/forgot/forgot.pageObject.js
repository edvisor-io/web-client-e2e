import constants from '../../shared/constants'

export default class ForgotPage {
  constructor() {
    this.emailField = element(by.css('input[name="email"]'))
    this.submitBtn = element(by.css('button[type="submit"]'))
    this.messageBox = element(by.css('div.sa-confirm-button-container'))
  }

  send(email) {
    this.emailField.sendKeys(email)
    this.submitBtn.click()
  }

  static waitForLoader() {
    var appLoader = element(by.css('.app-loader'))

    // wait for loader to go away
    browser.wait(function() {
      return browser.isElementPresent(appLoader).then(function(presenceOfElement) {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

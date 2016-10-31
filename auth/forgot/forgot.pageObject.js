import constants from '../../shared/constants'

export default class ForgotPage {
  constructor() {
    this.emailField = $('input[name="email"]')
    this.submitBtn = $('button[type="submit"]')
    this.messageBox = $('div.sweet-alert')
  }

  requestRecovery(email) {
    this.emailField.sendKeys(email)
    this.submitBtn.click()
  }

  static waitForLoader() {
    var appLoader = $('.app-loader')

    // wait for loader to go away
    browser.wait(() => {
      return browser.isElementPresent(appLoader).then((presenceOfElement) => {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

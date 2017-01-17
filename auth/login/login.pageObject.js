import constants from '../../shared/constants'

function waitTillVisible(element) {
  browser.wait(protractor.ExpectedConditions.visibilityOf(element), constants.TIMEOUT_TIME)
}

export default class LoginPage {
  constructor() {
    this.emailField = $('input[name="email"]')
    this.passwordField = $('input[name="password"]')
    this.submitBtn = $('button[type="submit"]')
  }

  login(login, pass) {
    waitTillVisible(this.emailField)
    this.emailField.sendKeys(login)
    this.passwordField.sendKeys(pass)
    this.submitBtn.click()
  }

  static waitForLoader() {
    var appLoader = $('div.app-loader')

    //wait until the loader has disappeared
    browser.wait(() => {
      return browser.isElementPresent(appLoader).then((presenceOfElement) => {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

import constants from '../../shared/constants'

export default class LoginPage {
  constructor() {
    this.emailField = $('input[name="email"]')
    this.passwordField = $('input[name="password"]')
    this.submitBtn = $('button[type="submit"]')
  }

  login(login, pass) {
    this.emailField.sendKeys(login)
    this.passwordField.sendKeys(pass)
    this.submitBtn.click()
  }

  static waitForLoader() {
    var appLoader = $('.app-loader')

    //wait until the loader has disappeared
    browser.wait(() => {
      return browser.isElementPresent(appLoader).then((presenceOfElement) => {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

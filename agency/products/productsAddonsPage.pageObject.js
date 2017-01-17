import constants from '../../shared/constants'

export default class AddonsPage {
  constructor() {
    this.newAddonsButton = element(by.id('ext32-new-btn'))
    this.nameField = $('input[name="name"]')
    this.saveButton = $('button[type="submit"]')

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickNewAddonsButton() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.newAddonsButton), constants.TIMEOUT_TIME)
    this.newAddonsButton.click()
  }

  inputName(name = 'Tea') {
    this.nameField.sendKeys(name)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  createNewAddon() {
    this.clickNewAddonsButton()
    this.inputName()
    this.clickSaveButton()
  }
}

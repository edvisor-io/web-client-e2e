import uuid from 'node-uuid'

export default class FeesPage {
  constructor() {
    this.newFeeButton = element(by.id('ext33-new-btn'))
    this.nameField = $('input[name="name"]')
    this.saveButton = $('button[type="submit"]')
  }

  clickNewFeeButton() {
    this.newFeeButton.click()
  }

  inputName(name = `${uuid.v4()}`) {
    this.nameField.sendKeys(name)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  createNewFee() {
    this.clickNewFeeButton()
    this.inputName()
    this.clickSaveButton()
  }
}

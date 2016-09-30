export default class AddonsPage {
  constructor() {
    this.newAddonsButton = element(by.id('ext32-new-btn'))
    this.nameField = $('input[name="name"]')
    this.saveButton = $('button[type="submit"]')
  }

  clickNewAddonsButton() {
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

import constants from '../../../shared/constants'

export default class SecondaryContactsArea {
  constructor() {
    this.contactsContainer = element(by.id('ext02-secondary-contact-container'))
    this.addContactButton = element(by.id('ext02-secondary-contact-toggle'))
    this.contactEditor = element(by.id('ext02-secondary-contact-form'))
    this.nameField = this.contactEditor.$('input[name="name"]')
    this.relationshipField = this.contactEditor.element(by.model('$select.search'))
    this.addContactConfirmButton = this.contactEditor.$('button[type="submit"]')
  }

  clickAddContactButton() {
    this.addContactButton.click()
  }

  addContact(name, relationship) {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.visibilityOf(this.addContactConfirmButton), constants.TIMEOUT_TIME)

    this.nameField.sendKeys(name)
    this.relationshipField.sendKeys(relationship)
    this.addContactConfirmButton.click()
  }
}

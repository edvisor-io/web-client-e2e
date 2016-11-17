import {ChosenWidget} from '../../../shared/widgets'

export default class SecondaryContactsArea {
  constructor() {
    this.container = element(by.id('ext02-secondary-contact-container'))
    this.addContactButton = element(by.id('ext02-secondary-contact-toggle'))
    this.contactEditorContainer = element(by.id('ext02-secondary-contact-form'))
    this.nameField = this.contactEditorContainer.$('input[name="name"]')
    this.relationshipField = this.contactEditorContainer.$('select[name="studentSecondaryContactRelationship"]')
    this.addContactConfirmButton = this.contactEditorContainer.$('button[type="submit"]')
  }

  addContact(name = 'Totoro', relationship = 'Friend') {
    this.addContactButton.click()
    this.nameField.sendKeys(name)
    ChosenWidget.setChosenValueWithExtraClicks(this.relationshipField, relationship)
    this.addContactConfirmButton.click()
  }
}

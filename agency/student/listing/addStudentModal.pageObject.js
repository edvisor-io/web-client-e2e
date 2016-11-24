import {ChosenWidget} from '../../../shared/widgets'

export default class AddStudentModal {
  constructor() {
    this.container = element(by.id('ext02-add-student-form'))
    this.assignedToField = this.container.element(by.name('assignedTo'))
    this.firstNameField = this.container.element(by.name('firstname'))
    this.lastNameField = this.container.element(by.name('lastname'))
    this.emailField = this.container.element(by.name('email'))
    this.nationalityField = this.container.element(by.name('nationality'))
    this.submitButton = this.container.$('button[type="submit"]')
  }

  fillAndSubmitForm(assignedTo, firstname, lastname, email, nationality) {
    ChosenWidget.setChosenValue(this.assignedToField, assignedTo) // this may also need Chosen.setAutocompleteValue
    this.firstNameField.sendKeys(firstname)
    this.lastNameField.sendKeys(lastname)
    this.emailField.sendKeys(email)
    ChosenWidget.setValueOfAutocomplete(this.nationalityField, nationality) // changed for staging
    this.submitButton.click()
  }
}

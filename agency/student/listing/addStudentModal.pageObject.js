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

  addStudent(assignedTo, firstname, lastname, email, nationality) {
    ChosenWidget.setChosenValue(this.assignedToField, assignedTo)
    this.firstNameField.sendKeys(firstname)
    this.lastNameField.sendKeys(lastname)
    this.emailField.sendKeys(email)
    ChosenWidget.setChosenValue(this.nationalityField, nationality)
    this.submitButton.click()
  }
}
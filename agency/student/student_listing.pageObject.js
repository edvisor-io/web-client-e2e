import Widgets from '../../shared/widgets'
import constants from '../../shared/constants'

var btn = element(by.id(constants.ADD_STUDENT_BTN_ID))

export default class StudentListingPage {
  constructor() {
    this.nopeAlert = element(by.css('.alert-box-message'))
  }

  static openAddStudentModal() {
    btn.click()
  }

  static waitForOverlay() {
    var expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(btn), 5000)
  }

  static addStudent(assignedTo, firstname, lastname, email, nationality) {
    var container = element(by.id('ext02-add-student-form'))
    var assignedToField = container.element(by.name('assignedTo'))
    var firstnameField = container.element(by.name('firstname'))
    var lastnameField = container.element(by.name('lastname'))
    var emailField = container.element(by.name('email'))
    var nationalityField = container.element(by.name('nationality'))
    var submitBtn = container.element(by.css('button[type="submit"]'))

    Widgets.setChosenValue(assignedToField, assignedTo)
    firstnameField.sendKeys(firstname)
    lastnameField.sendKeys(lastname)
    emailField.sendKeys(email)
    Widgets.setChosenValue(nationalityField, nationality)
    submitBtn.click()
  }
}

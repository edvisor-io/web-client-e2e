import Widgets from '../../shared/widgets'
import constants from '../../shared/constants'

// var buttonAddStudent = element(by.id('add-student-button'))
var buttonSearch = element(by.id('ext02-search-student-btn'))

export default class StudentListingPage {

  constructor() {
    this.nopeAlert = $('.alert-box-message')
    this.buttonAddStudent = element(by.id('add-student-button'))

    this.searchContainer = element(by.css('.ui-select-container'))
    this.searchResultName = this.searchContainer.element(by.binding('student | name | highlight: $select.search'))
    this.searchResultEmail = this.searchContainer.element(by.binding('student.email | highlight: $select.search'))
    this.searchResultOffice = this.searchContainer.element(by.binding('student.agency.name | highlight: $select.search'))
  }

  openAddStudentModal() {
    this.buttonAddStudent.click()
  }

  static openSearchBar() {
    buttonSearch.click()
  }

  static chooseBySecondaryContact() {
    element(by.id('ext02-search-student-select')).click()
    var bySecondaryContactElement = element(by.css('.select-menu ul.menu > li:nth-child(2)'))

    var expected = protractor.ExpectedConditions
    browser.wait(expected.visibilityOf(bySecondaryContactElement), constants.TIMEOUT)

    bySecondaryContactElement.click()
  }

  static waitForOverlay() {
    var expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(buttonAddStudent), constants.TIMEOUT)
  }

  static addStudent(assignedTo, firstname, lastname, email, nationality) {
    let container = element(by.id('ext02-add-student-form'))
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

  static inputSearchTerm(searchTerm) {
    var searchField = element(by.css('input[type="search"]'))
    searchField.sendKeys(searchTerm)
  }
}

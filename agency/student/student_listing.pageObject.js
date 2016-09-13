import Widgets from '../../shared/widgets'
import constants from '../../shared/constants'

var btn = element(by.id(constants.ADD_STUDENT_BTN_ID))
var buttonSearch = element(by.id(constants.SEARCH_STUDENT_BTN_ID))

export default class StudentListingPage {
  constructor() {
    this.nopeAlert = element(by.css('.alert-box-message'))
    this.searchResultName = element(by.css('div[ng-bind-html="student | name | highlight: $select.search"]'))
    this.searchResultEmail = element(by.css('div[ng-bind-html="student.email | highlight: $select.search"]'))
    this.searchResultOffice = element(by.css('div[ng-bind-html="student.agency.name | highlight: $select.search"]'))
    this.uiSelectContainer = element(by.css('.ui-select-container'))
  }

  static openAddStudentModal() {
    btn.click()
  }

  static openSearchModal() {
    buttonSearch.click()
  }

  static openDropdown() {
    searchCriteriaDropdown.click()
  }

  static chooseBySecondaryContact() {
    element(by.id('ext02-search-student-select')).click()
    var bySecondaryContactElement = element(by.css('.select-menu ul.menu > li:nth-child(2)'))

    var expected = protractor.ExpectedConditions
    browser.wait(expected.visibilityOf(bySecondaryContactElement), 1000)

    bySecondaryContactElement.click()
  }

  static waitForOverlay() {
    var expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(btn), 5000)
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
    // var expected = protractor.ExpectedConditions
    // browser.wait(expected.visibilityOf(searchField), 5000)

    // browser.driver.sleep(60000)
    searchField.sendKeys(searchTerm)
  }
}

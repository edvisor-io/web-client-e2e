import {ChosenWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

export default class StudentListingPage {

  constructor() {
    this.selectAllStudentsCheckbox = $('.select-box')
    this.exportButton = $('.action-bar #ext02-export-data')
    this.exportMessage = $('.e-alert_inner-container')

    this.nopeAlert = $('.alert-box-message')

    this.buttonAddStudent = element(by.id('add-student-button'))
    this.buttonSearch = element(by.id('ext02-search-student-btn'))

    this.dropdownSearchStudent = element(by.id('ext02_search_student_select_chosen'))
    this.bySecondaryContactOption = $('.chosen-results > li:nth-child(2)')

    this.studentsTableContainer = $('.students-table')
    this.firstStudentInTable = this.studentsTableContainer.all(by.css('.table-student-name')).get(0)

    this.searchContainer = $('.ui-select-container')
    this.searchField = this.searchContainer.element(by.css('input[type="search"]'))
    this.searchResultName = this.searchContainer.element(by.binding('student | name | highlight: $select.search'))
    this.searchResultEmail = this.searchContainer.element(by.binding('student.email | highlight: $select.search'))
    this.searchResultOffice = this.searchContainer.element(by.binding('student.agency.name | highlight: $select.search'))

    this.containerAddStudentModal = element(by.id('ext02-add-student-form'))
    this.assignedToField = this.containerAddStudentModal.element(by.name('assignedTo'))
    this.firstNameField = this.containerAddStudentModal.element(by.name('firstname'))
    this.lastNameField = this.containerAddStudentModal.element(by.name('lastname'))
    this.emailField = this.containerAddStudentModal.element(by.name('email'))
    this.nationalityField = this.containerAddStudentModal.element(by.name('nationality'))
    this.submitButton = this.containerAddStudentModal.element(by.css('button[type="submit"]'))
  }

  openAddStudentModal() {
    this.buttonAddStudent.click()
  }

  openSearchBar() {
    this.buttonSearch.click()
  }

  openSearchDropdown() {
    this.dropdownSearchStudent.click()
  }

  focusSearchContainer() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.searchContainer), constants.TIMEOUT_TIME)

    this.searchContainer.click()
  }

  clickSearchResult() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.searchResultName), constants.TIMEOUT_TIME)

    this.searchResultName.click()
  }

  chooseBySecondaryContact() {
    var expected = protractor.ExpectedConditions
    browser.wait(expected.visibilityOf(this.bySecondaryContactOption), constants.TIMEOUT_TIME)

    this.bySecondaryContactOption.click()
  }

  // static waitForOverlay() {
  //   var expected = protractor.ExpectedConditions
  //   browser.wait(expected.elementToBeClickable(buttonAddStudent), constants.TIMEOUT)
  // }

  addStudent(assignedTo, firstname, lastname, email, nationality) {
    ChosenWidget.setChosenValue(this.assignedToField, assignedTo)
    this.firstNameField.sendKeys(firstname)
    this.lastNameField.sendKeys(lastname)
    this.emailField.sendKeys(email)
    ChosenWidget.setChosenValue(this.nationalityField, nationality)
    this.submitButton.click()
  }

  inputSearchTerm(searchTerm) {
    this.searchField.sendKeys(searchTerm)
  }

  clickSelectAllStudentsCheckbox() {
    this.selectAllStudentsCheckbox.click()
  }

  clickExportButton() {
    this.exportButton.click()
  }

  clickFirstStudentInTable() {
    this.firstStudentInTable.click()
  }
}

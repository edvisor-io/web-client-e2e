import constants from '../../../shared/constants'

export default class SearchBar {
  constructor() {
    this.searchBar = $('.search-bar')
    this.dropdownSearchStudent = this.searchBar.element(by.id('ext02_search_student_select_chosen'))
    this.bySecondaryContactOption = this.searchBar.$('.chosen-results > li:nth-child(2)')

    this.searchContainer = this.searchBar.$('.ui-select-container')
    this.searchField = this.searchContainer.$('input[type="search"]')
    this.searchResultName = this.searchContainer
      .element(by.binding('student | name | highlight: $select.search'))
    this.searchResultEmail = this.searchContainer
      .element(by.binding('student.email | highlight: $select.search'))
    this.searchResultOffice = this.searchContainer
      .element(by.binding('student.agency.name | highlight: $select.search'))
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

  inputSearchTerm(searchTerm) {
    this.searchField.sendKeys(searchTerm)
  }
}

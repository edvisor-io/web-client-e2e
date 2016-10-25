import AddStudentModal from './listing/addStudentModal.pageObject'
import SearchBar from './listing/searchBar.pageObject'
import constants from '../../shared/constants'

export default class StudentListingPage {
  constructor() {
    this.SearchBar = SearchBar

    this.viewingPipelineDropdown = $('pipeline-select')
    this.allStudentsOption = this.viewingPipelineDropdown.all(by.css('button')).get(-2)

    this.addStudentButton = $('#add-student-button')
    this.buttonSearch = element(by.id('ext02-search-student-btn'))

    this.filterListButton = element.all(by.css('#ext02-filter-list > div > div')).get(0)
    this.filterListFirstOption = element.all(by.css('#ext02-filter-list ul.menu > li')).get(0)
    this.filterListFirstOptionInFirstOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(0)
    this.filterListSecondOptionInFirstOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(1)

    this.currentPageField = $('div.page-display input')
    this.nextButton = $('button.btn--default.next')
    this.exportButton = $('.action-bar #ext02-export-data')
    this.exportMessage = $('.e-alert_inner-container')
    this.selectAllStudentsCheckbox = $('div.ag-header-cell-label label.checkbox')

    this.secondPipelineTab = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.secondPipelineTabCountElement = this.secondPipelineTab.$('span.subtitle')
    this.thirdPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(2))
    this.thirdPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(3))
    this.pipelineTabsOverflowDropdown = element.all(by.css('#ext02-tab-selection > li')).last()
    this.lastPipelineTab = element.all(by.css('ul.inner-dropdown li')).last()
    this.lastPipelineTabTitleSpanElement = this.lastPipelineTab.all(by.css('span')).first()

    this.firstStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(0)
    this.secondStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(1)
    this.assignButton = $('#ext02-listings-assign-btn')
    this.lastOfficeInDropdown = element.all(by
      .css('div.assign div.menu-container > ul > li')).last()
    this.firstOwnerOption = element.all(by
      .css('div.assign div.menu-container > ul.submenu.open > div > li')).first()
    this.confirmMoveStudentButton = element.all(by.css('div.e-alert_buttons button')).get(1)

    this.studentsTableContainer = $('.students-table')
    this.firstStudentInTable = this.studentsTableContainer
      .all(by.css('.table-student-name')).get(0)
    this.firstStudentInTableCheckboxContainer = this.studentsTableContainer
      .all(by.css('div.ag-cell')).first()

    this.alertBoxMessage = $('.alert-box-message')
    this.alertDanger = $('.alert-danger')
  }

  openSearchBar() {
    this.buttonSearch.click()
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

  clickSecondPipelineTab() {
    this.secondPipelineTab.click()
  }

  calculatePages(studentCount) {
    let paginationNumber = 20
    return Math.ceil(studentCount / paginationNumber)
  }

  clickNextButton(howManyClicks) {
    for (let i = 1; i < howManyClicks; i++) {
      this.nextButton.click()
    }
  }

  goToLastPageOfTab(studentCount) {
    let clicksNeeded = this.calculatePages(studentCount)
    this.clickNextButton(clicksNeeded)
  }

  addStudent(assignedTo, firstname, lastname, email, nationality) {
    this.addStudentButton.click()
    const addStudentModal = new AddStudentModal()
    addStudentModal.fillAndSubmitForm(assignedTo, firstname, lastname, email, nationality)
  }

  selectViewingAllStudents() {
    this.viewingPipelineDropdown.click()
    this.allStudentsOption.click()
  }

  reassignFirstTwoStudents() {
    this.firstStudentCheckbox.click()
    this.secondStudentCheckbox.click()
    this.assignButton.click()
    this.lastOfficeInDropdown.click()
    this.firstOwnerOption.click()
    this.confirmMoveStudentButton.click()
  }

  openPipelineTabsOverflowDropdown() {
    this.pipelineTabsOverflowDropdown.click()
  }

  selectLastPipelineTab() {
    this.lastPipelineTab.click()
  }

  filterByAgentsUnassigned() {
    this.filterListButton.click()
    this.filterListFirstOption.click()
    this.filterListFirstOptionInFirstOption.click()
  }

  filterByAgentsFirst() {
    this.filterListButton.click()
    this.filterListFirstOption.click()
    this.filterListFirstOptionInFirstOption.click()
    this.filterListSecondOptionInFirstOption.click()
  }
}

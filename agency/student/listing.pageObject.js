import AddStudentModal from './listing/addStudentModal.pageObject'
import SearchBar from './listing/searchBar.pageObject'

export default class StudentListingPage {
  constructor() {
    this.AddStudentModal = AddStudentModal
    this.SearchBar = SearchBar

    this.buttonAddStudent = element(by.id('add-student-button'))
    this.buttonSearch = element(by.id('ext02-search-student-btn'))

    this.currentPageField = $('div.page-display input')
    this.nextButton = $('button.btn--default.next')
    this.exportButton = $('.action-bar #ext02-export-data')
    this.exportMessage = $('.e-alert_inner-container')
    this.selectAllStudentsCheckbox = $('div.ag-header-cell-label label.checkbox')

    this.secondPipelineTab = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.secondPipelineTabCountElement = this.secondPipelineTab.$('span.subtitle')
    this.thirdPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(2))
    this.thirdPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(3))
    this.studentsTableContainer = $('.students-table')
    this.firstStudentInTable = this.studentsTableContainer
      .all(by.css('.table-student-name')).get(0)

    this.nopeAlert = $('.alert-box-message')
  }

  openAddStudentModal() {
    this.buttonAddStudent.click()
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

  calculatePaginations(studentCount) {
    let paginationNumber = 20
    return Math.floor(studentCount / paginationNumber)
  }

  clickNextButton(howManyClicks) {
    for (let i = howManyClicks; i >= 0; i--) {
      this.nextButton.click()
    }
  }

  goToLastPageOfTab(studentCount) {
    let clicksNeeded = this.calculatePaginations(studentCount)
    this.clickNextButton(clicksNeeded)
  }
}

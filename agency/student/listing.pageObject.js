import AddStudentModal from './listing/addStudentModal.pageObject'
import SearchBar from './listing/searchBar.pageObject'

export default class StudentListingPage {
  constructor() {
    this.AddStudentModal = AddStudentModal
    this.SearchBar = SearchBar

    this.selectAllStudentsCheckbox = $('.select-box')
    this.exportButton = $('.action-bar #ext02-export-data')
    this.exportMessage = $('.e-alert_inner-container')

    this.buttonAddStudent = element(by.id('add-student-button'))
    this.buttonSearch = element(by.id('ext02-search-student-btn'))

    this.firstPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.secondPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(2))
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

  clickFirstPipelineTab() {
    this.firstPipelineTab.click()
  }
}

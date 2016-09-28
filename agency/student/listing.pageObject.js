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
}

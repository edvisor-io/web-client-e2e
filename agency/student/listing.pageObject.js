import SearchBar from './listing/searchBar.pageObject'
import AddStudentModal from './listing/addStudentModal.pageObject'
import PipelineTabs from './listing/pipelineTabs.pageObject'
import FilterNavigationDownloadCustomizeBar from './listing/filterNavigationDownloadCustomizeBar.pageObject'
import BatchOptions from './listing/batchOptions.pageObject'
import ListArea from './listing/listArea.pageObject'
import constants from '../../shared/constants'

export default class StudentListingPage {
  constructor() {
    this.SearchBar = SearchBar
    this.PipelineTabs = PipelineTabs
    this.FilterNavigationDownloadCustomizeBar = FilterNavigationDownloadCustomizeBar
    this.ListArea = ListArea

    this.viewingPipelineDropdown = $('pipeline-select')
    this.allStudentsOption = this.viewingPipelineDropdown.all(by.css('button')).get(-2)

    this.addStudentButton = $('#add-student-button')
    this.buttonSearch = element(by.id('ext02-search-student-btn'))

    // this.selectAllStudentsCheckbox = $('div.ag-header-cell-label label.checkbox')
    // this.assignButton = $('#ext02-listings-assign-btn')
    // this.lastOfficeInDropdown = element.all(by
    //   .css('div.assign div.menu-container > ul > li')).last()
    // this.firstOwnerOption = element.all(by
    //   .css('div.assign div.menu-container > ul.submenu.open > div > li')).first()
    this.confirmMoveStudentButton = element.all(by.css('div.e-alert_buttons button')).get(1)

    this.exportMessage = $('.e-alert_inner-container')
    this.alertBoxMessage = $('.alert-box-message')
    this.alertDanger = $('.alert-danger')
  }

  openSearchBar() {
    this.buttonSearch.click()
  }

  clickSelectAllStudentsCheckbox() {
    const batchOptions = new BatchOptions()
    batchOptions.selectAllStudentsCheckbox.click()
  }

  clickExportButton() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.exportButton.click()
  }

  clickFirstStudentInTable() {
    const listArea = new ListArea()
    listArea.clickFirstStudentInTable()
  }

  clickSecondPipelineTab() {
    const pipelineTabs = new PipelineTabs()
    pipelineTabs.secondPipelineTab.click()
  }

  clickThirdPipelineTab() {
    const pipelineTabs = new PipelineTabs()
    pipelineTabs.thirdPipelineTab.click()
  }

  clickFourthPipelineTab() {
    const pipelineTabs = new PipelineTabs()
    pipelineTabs.fourthPipelineTab.click()
  }

  calculatePages(studentCount) {
    let paginationNumber = 20
    return Math.ceil(studentCount / paginationNumber)
  }

  clickNextButtonTillEnd(howManyClicks) {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    for (let i = 1; i < howManyClicks; i++) {
      filterNavigationDownloadCustomizeBar.nextButton.click()
    }
  }

  goToLastPageOfTab(studentCount) {
    let clicksNeeded = this.calculatePages(studentCount)
    this.clickNextButtonTillEnd(clicksNeeded)
  }

  // recursive not working, for counting elements in subsequent function
  // clickAndCount(pageLeft, countArray) {
  //   if (pageLeft === 0) {
  //     return Promise.resolve(countArray)
  //   } else {
  //     return this.nextButton.click().then(() => {
  //       countArray.push(this.checkboxElements.count())
  //       console.log(countArray)
  //       return pageLeft--
  //     }).then(pageLeft => this.clickAndCount(pageLeft, countArray))
  //   }
  // }
  countClickNextButtonAndCount(studentCount) {
    var countArray = []
    const listArea = new ListArea()
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    countArray.push(listArea.checkboxElements.count())
    let clicksNeeded = this.calculatePages(studentCount)
    for (let i = 1; i < clicksNeeded; i++) {
      filterNavigationDownloadCustomizeBar.nextButton.click()
      browser.sleep(2000) // to allow next page to load and be counted from
      countArray.push(listArea.checkboxElements.count())
    }
    return Promise.all(countArray).then(countArray => countArray.reduce((a, b) => a + b))
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
    const listArea = new ListArea()
    listArea.firstStudentCheckbox.click()
    listArea.secondStudentCheckbox.click()
    const batchOptions = new BatchOptions()
    batchOptions.assignButton.click()
    batchOptions.lastOfficeInDropdown.click()
    batchOptions.firstOwnerOption.click()
    this.confirmMoveStudentButton.click()
  }

  openPipelineTabsOverflowDropdown() {
    const pipelineTabs = new PipelineTabs()
    pipelineTabs.pipelineTabsOverflowDropdown.click()
  }

  selectLastPipelineTab() {
    const pipelineTabs = new PipelineTabs()
    pipelineTabs.lastPipelineTab.click()
  }

  filterByAgentsUnassigned() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.filterListButton.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOption.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOptionInFirstOption.click()
  }

  filterByAgentsFirst() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.filterListButton.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOption.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOptionInFirstOption.click()
    filterNavigationDownloadCustomizeBar.filterListSecondOptionInFirstOption.click()
  }

  filterByCustomFields() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.filterListButton.click()
    browser.executeScript('arguments[0].scrollIntoView(true)', filterNavigationDownloadCustomizeBar.filterListLastOption)
    filterNavigationDownloadCustomizeBar.filterListLastOption.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOptionInLastOption.click()
    filterNavigationDownloadCustomizeBar.filterListFirstOptionInFirstOptionInLastOption.click()
  }
}

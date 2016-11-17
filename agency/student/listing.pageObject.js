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

    this.confirmMoveStudentButton = element.all(by.css('div.e-alert_buttons button')).get(1)

    this.exportMessage = $('.e-alert_inner-container')
    this.alertBoxMessage = $('.alert-box-message') // deprecated, use more specific locator below
    this.alertDanger = $('.alert-danger')
  }

  openSearchBar() {
    this.buttonSearch.click()
  }

  removeAllFilters() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.activeFilterElements.count().then((count) => {
      for (let i = 0; i < count; i++) {
        filterNavigationDownloadCustomizeBar.activeFilterElements.get(i).$('svg').click()
      }
    })
  }
  removeFirstFilter() {
    const filterNavigationDownloadCustomizeBar = new FilterNavigationDownloadCustomizeBar()
    filterNavigationDownloadCustomizeBar.firstActiveFilterRemoveButton.click()
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
    listArea.firstStudentInTable.click()
  }

  clickSecondStudentInTable() {
    const listArea = new ListArea()
    listArea.secondStudentInTable.click()
  }

  clickThirdStudentInTable() {
    const listArea = new ListArea()
    listArea.thirdStudentInTable.click()
  }
  clickFourthStudentInTable() {
    const listArea = new ListArea()
    listArea.fourthStudentInTable.click()
  }
  clickFifthStudentInTable() {
    const listArea = new ListArea()
    listArea.fifthStudentInTable.click()
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
    let clicksNeeded = this.calculatePages(studentCount)
    countArray.push(listArea.checkboxElements.count())
    for (let i = 1; i < clicksNeeded; i++) {
      filterNavigationDownloadCustomizeBar.nextButton.click()
      browser.sleep(constants.SLEEP_MEDIUM) // allow next page to load and be counted from
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

  reassignTwoStudentsToAnOffice() {
    const listArea = new ListArea()
    listArea.thirdStudentCheckbox.click()
    listArea.fourthStudentCheckbox.click()
    const batchOptions = new BatchOptions()
    batchOptions.assignButton.click()
    batchOptions.lastOfficeInDropdown.click()
    batchOptions.firstOwnerOption.click()
    this.confirmMoveStudentButton.click()
  }

  reassignTwoStudentsToAUser() {
    const listArea = new ListArea()
    listArea.firstStudentCheckbox.click()
    listArea.secondStudentCheckbox.click()
    const batchOptions = new BatchOptions()
    batchOptions.assignButton.click()
    batchOptions.firstUserInDropdown.click()
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
    // filterNavigationDownloadCustomizeBar.filterListFirstOptionInFirstOption.click() // erroneously clicking another also
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

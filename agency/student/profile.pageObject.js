import GoalsTabArea from './profile/goalsTabArea.pageObject'
import QuotesInvoicesTabArea from './profile/quotesInvoicesTabArea.pageObject'
import FilesTabArea from './profile/filesTabArea.pageObject'
import StudentInformationArea from './profile/studentInformationArea.pageObject'
import SecondaryContactsArea from './profile/secondaryContactsArea.pageObject'
import AssignedToArea from './profile/assignedToArea.pageObject'
import PipelineArea from './profile/pipelineArea.pageObject'
import TasksArea from './profile/tasksArea.pageObject'
import NotesArea from './profile/notesArea.pageObject'
import RecentActivitiesArea from './profile/recentActivitiesArea.pageObject'
import ArchiveStudentModal from './profile/archiveStudentModal.pageObject'
import InvoicesPage from '../invoices/invoices.pageObject'
import constants from '../../shared/constants'

export default class StudentProfilePage {
  constructor() {
    this.StudentInformationArea = StudentInformationArea
    this.SecondaryContactsArea = SecondaryContactsArea
    this.AssignedToArea = AssignedToArea
    this.PipelineArea = PipelineArea
    this.NotesArea = NotesArea
    this.RecentActivitiesArea = RecentActivitiesArea
    this.FilesTabArea = FilesTabArea
    this.container = $('section.student-profile')

    this.backToStudentsButton = element(by.id('ext02-back'))

    this.tabsContainer = element(by.id('ext02-tabs'))
    this.goalsTabElement = this.tabsContainer
      .element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.quotesInvoicesTabElement = this.tabsContainer
      .element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(2))
    this.filesTabElement = this.tabsContainer
      .element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(3))
    this.informationContainer = this.container.$('student-edit-information')
    this.assignedToLabel = $('student-sidebar-owner photo-initials + div > p')

    this.archiveStudentButton = element(by.id('ext02-archive-student'))
    this.restoreStudentButton = element(by.id('ext02-restore-student-btn'))

    this.alertBoxMessage = $('.alert-box-message') // deprecated, please replace with more specific options below
    this.alertSuccessMessage = $('div.alert-success')
    this.confirmDeleteButton = $('div.sweet-alert button.confirm')
  }

  fillAndSaveANote(note) {
    const notesArea = new NotesArea()
    notesArea.inputTextIntoField(note)
    notesArea.clickSaveButton()
  }

  getNoteAsPromise() {
    const notesArea = new NotesArea()
    return notesArea.field.getAttribute('value')
  }

  makeNewInvoice() {
    this.quotesInvoicesTabElement.click()
    const quotesInvoicesTabArea = new QuotesInvoicesTabArea()
    quotesInvoicesTabArea.newInvoiceButton.click()
    const invoicesPage = new InvoicesPage()
    invoicesPage.clickNextThroughNewInvoiceSteps()
    invoicesPage.saveButton.click()
  }

  addTask(taskTitle = 'Do a followup call', dueTime = '11:00pm') {
    const tasksArea = new TasksArea()
    tasksArea.fillAndSaveNewTaskForm(taskTitle, dueTime)
  }

  clickBackToStudentsButton() {
    this.backToStudentsButton.click()
  }

  fillAndSaveStudentInformation(firstName, lastName, email, phoneNumber, gender, homeAddress, cityCountry, postalCode, passportNumber) {
    const studentInformationArea = new StudentInformationArea()
    studentInformationArea.inputFirstName(firstName)
    studentInformationArea.inputLastName(lastName)
    studentInformationArea.inputEmail(email)
    studentInformationArea.inputPhoneNumber(phoneNumber)
    studentInformationArea.selectGender(gender)
    studentInformationArea.selectBirthday()
    studentInformationArea.inputHomeAddress(homeAddress)
    studentInformationArea.selectCityCountry(cityCountry)
    studentInformationArea.inputPostalCode(postalCode)
    studentInformationArea.selectNationality()
    studentInformationArea.inputPassportNumber(passportNumber)
    studentInformationArea.clickSaveButton()
  }

  changeStudentFirstName(firstName) {
    const studentInformationArea = new StudentInformationArea()
    studentInformationArea.inputFirstName(firstName)
    studentInformationArea.clickSaveButton()
  }

  goToGoalsTab() {
    this.goalsTabElement.click()
  }

  goToQuotesInvoicesTab() {
    this.quotesInvoicesTabElement.click()
  }

  goToFilesTab() {
    this.filesTabElement.click()
  }

  addSecondaryContact() {
    const secondaryContactsArea = new SecondaryContactsArea()
    secondaryContactsArea.addContact()
  }

  getPipelinesAsPromise() {
    const pipelineArea = new PipelineArea()
    let pipelinesArray = []
    for (let i = 0; i < pipelineArea.currentPipelines.count; i++) {
      pipelinesArray.push(pipelineArea.currentPipelines[i].getText())
    }
    return pipelinesArray
  }

  getStatusesAsPromise() {
    const pipelineArea = new PipelineArea()
    let statusesArray = []
    for (let i = 0; i < pipelineArea.currentPipelineStatuses.count; i++) {
      statusesArray.push(pipelineArea.currentPipelineStatuses[i].getText())
    }
    return statusesArray
  }

  assignStatusSecondOptionInFirstPipeline() {
    const pipelineArea = new PipelineArea()
    pipelineArea.clickChangePipelineFirstButton()
    pipelineArea.clickChangePipelineStatusOption()
    pipelineArea.clickPipelineStatusSecondOption()
  }

  assignStatusThirdOptionInFirstPipeline() {
    const pipelineArea = new PipelineArea()
    pipelineArea.clickChangePipelineFirstButton()
    pipelineArea.clickChangePipelineStatusOption()
    pipelineArea.pipelineStatusThirdOption.click()
  }

  assignToNewlyMadePipeline() {
    const pipelineArea = new PipelineArea()
    pipelineArea.clickAddToAnotherPipelineButton()
    pipelineArea.clickAddToAnotherPipelineFirstOption()
    pipelineArea.clickAddToAnotherPipelineStatusesSecondOption()
  }

  addRecord() {
    this.goToGoalsTab()
    const goalsTabArea = new GoalsTabArea()
    goalsTabArea.fillAndSaveNewRecordForm()
  }

  reassignToOffice(newOffice) {
    const assignedToArea = new AssignedToArea()
    assignedToArea.clickChangeOwnerButton()
    assignedToArea.setAsNewOffice(newOffice)
    assignedToArea.clickMoveStudentConfirmButton()
  }

  reassignOwner(newOwner = 'Nicolas Miller') {
    const assignedToArea = new AssignedToArea()
    assignedToArea.clickChangeOwnerButton()
    assignedToArea.setAsNewOwner(newOwner)
  }

  startNewQuoteV1() {
    const quotesInvoicesTabArea = new QuotesInvoicesTabArea()
    quotesInvoicesTabArea.clickNewQuoteV1Button()
  }

  archiveStudent() {
    this.archiveStudentButton.click()
    const archiveStudentModal = new ArchiveStudentModal()
    archiveStudentModal.fillAndSaveForm()
  }

  unarchiveStudent() {
    this.restoreStudentButton.click()
  }

  uploadFile() {
    const filesTabArea = new FilesTabArea()
    filesTabArea.fileUpload.sendKeys('/Users/Beastie/development/edvisorio/web-client-e2e/shared/images/angular.png')
  }

  deleteFile() {
    const filesTabArea = new FilesTabArea()
    filesTabArea.lastRowDeleteButton.click()
    browser.sleep(constants.SLEEP_SHORT)
    this.confirmDeleteButton.click()
  }
}

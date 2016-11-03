import StudentInformationArea from './profile/studentInformationArea.pageObject'
import SecondaryContactsArea from './profile/secondaryContactsArea.pageObject'
import AssignedToArea from './profile/assignedToArea.pageObject'
import PipelineArea from './profile/pipelineArea.pageObject'
import TasksArea from './profile/tasksArea.pageObject'
import GoalsTabArea from './profile/goalsTabArea.pageObject'
import NotesArea from './profile/notesArea.pageObject'
import RecentActivitiesArea from './profile/recentActivitiesArea.pageObject'
import SettingsPage from '../settings/settings.pageObject'

import uuid from 'node-uuid'

export default class StudentProfilePage {
  constructor() {
    this.StudentInformationArea = StudentInformationArea
    this.SecondaryContactsArea = SecondaryContactsArea
    this.AssignedToArea = AssignedToArea
    this.PipelineArea = PipelineArea
    this.RecentActivitiesArea = RecentActivitiesArea
    this.container = $('section.student-profile')

    this.backToStudentsButton = element(by.id('ext02-back'))

    this.tabsContainer = $('#ext02-tabs')
    this.goalsTabElement = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))

    this.informationContainer = this.container.$('student-edit-information')
    this.assignedToLabel = $('student-sidebar-owner photo-initials + div > p')

    this.alertBoxMessage = $('.alert-box-message') // deprecated, please replace with more specific options below
    this.alertSuccessMessage = $('div.alert-success')
  }

  saveANote() {
    const notesArea = new NotesArea()
    notesArea.inputTextIntoField()
    notesArea.clickSaveButton()
  }

  addTask(taskTitle = 'Do a followup call', dueTime = '11:00pm') {
    const tasksArea = new TasksArea()
    tasksArea.fillAndSaveNewTaskForm(taskTitle, dueTime)
  }

  clickBackToStudentsButton() {
    this.backToStudentsButton.click()
  }

  inputFirstName(firstName = `${uuid.v4()}`) {
    const studentInformationArea = new StudentInformationArea()
    studentInformationArea.firstNameField.clear()
    studentInformationArea.firstNameField.sendKeys(firstName)
  }

  clickSaveButton() {
    const studentInformationArea = new StudentInformationArea()
    studentInformationArea.saveButton.click()
  }

  goToGoalsTab() {
    this.goalsTabElement.click()
  }

  addSecondaryContact() {
    const secondaryContactsArea = new SecondaryContactsArea()
    secondaryContactsArea.addContact()
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
}

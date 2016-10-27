import SecondaryContactsArea from './profile/secondaryContactsArea.pageObject'
import AssignedToArea from './profile/assignedToArea.pageObject'
import PipelineArea from './profile/pipelineArea.pageObject'
import TasksArea from './profile/tasksArea.pageObject'
import GoalsTabArea from './profile/goalsTabArea.pageObject'
import RecentActivitiesArea from './profile/recentActivitiesArea.pageObject'
import SettingsPage from '../settings/settings.pageObject'

import uuid from 'node-uuid'

export default class StudentProfilePage {
  constructor() {
    this.SecondaryContactsArea = SecondaryContactsArea
    this.AssignedToArea = AssignedToArea
    this.PipelineArea = PipelineArea
    this.RecentActivitiesArea = RecentActivitiesArea

    this.backToStudentsButton = element(by.id('ext02-back'))

    this.tabsContainer = $('#ext02-tabs')
    this.goalsTabElement = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.container = $('section.student-profile')
    this.informationContainer = this.container.$('student-edit-information')
    this.studentSidebarOwnerContainer = this.container
      .$('student-sidebar-owner')

    this.alertBoxMessage = $('.alert-box-message')

    this.studentInfoContainer = $('#ext02-info')
    this.assignedToLabel = this.studentSidebarOwnerContainer
      .$('photo-initials + div > p')
    this.firstNameField = this.informationContainer
      .element(by.name('firstname'))
    this.lastNameField = this.informationContainer.element(by.name('lastname'))
    this.emailField = this.informationContainer.element(by.name('email'))
    this.nationalityField = this.informationContainer
      .element(by.name('nationality'))

    this.saveButton = this.studentInfoContainer.$('button[type="submit"]')
  }

  addTask(taskTitle = 'Do a followup call', dueTime = '11:00pm') {
    const tasksArea = new TasksArea()
    tasksArea.fillAndSaveNewTaskForm(taskTitle, dueTime)
  }

  clickBackToStudentsButton() {
    this.backToStudentsButton.click()
  }

  inputFirstName(firstName = `${uuid.v4()}`) {
    this.firstNameField.clear()
    this.firstNameField.sendKeys(firstName)
  }

  clickSaveButton() {
    this.saveButton.click()
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

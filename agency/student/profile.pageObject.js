import SecondaryContactsArea from './profile/secondaryContactsArea.pageObject'
import AssignedToArea from './profile/assignedToArea.pageObject'
import PipelineArea from './profile/pipelineArea.pageObject'

export default class StudentProfilePage {
  constructor() {
    this.SecondaryContactsArea = SecondaryContactsArea
    this.AssignedToArea = AssignedToArea
    this.PipelineArea = PipelineArea

    this.backToStudentsButton = element(by.id('ext02-back'))

    this.container = element(by.css('section.student-profile'))
    this.informationContainer = this.container.$('student-edit-information')
    this.studentSidebarOwnerContainer = this.container
      .$('student-sidebar-owner')

    this.tasksContainer = this.container.$('.sidebar-tasks')
    this.taskTitleField = this.tasksContainer
      .element(by.model('addTask.data.details'))
    this.taskDatePicker = this.tasksContainer
      .element(by.model('data.date'))
    this.taskTimeDropdown = this.tasksContainer.element(by.model('data.time'))
    this.assignToField = this.tasksContainer.$('select + div')
    this.submitTaskButton = this.tasksContainer.$('button[type="submit"]')
    this.alertBoxMessage = element(by.css('.alert-box-message'))

    this.assignedToLabel = this.studentSidebarOwnerContainer
      .$('photo-initials + div > p')
    this.firstNameField = this.informationContainer
      .element(by.name('firstname'))
    this.lastNameField = this.informationContainer.element(by.name('lastname'))
    this.emailField = this.informationContainer.element(by.name('email'))
    this.nationalityField = this.informationContainer
      .element(by.name('nationality'))
  }

  addTask(taskTitle, dueTime) {
    this.taskTitleField.sendKeys(taskTitle)
    this.taskTimeDropdown.sendKeys(dueTime)
    this.submitTaskButton.click()
  }

  clickBackToStudentsButton() {
    this.backToStudentsButton.click()
  }
}

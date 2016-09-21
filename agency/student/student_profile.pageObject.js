import SecondaryContactsArea from './profile_secondary_contacts.pageObject'
import AssignedToArea from './profile_assignedto_area.pageObject'
import PipelineArea from './profile_pipeline_area.pageObject'

export default class StudentProfilePage {
  constructor() {
    this.SecondaryContactsArea = SecondaryContactsArea
    this.AssignedToArea = AssignedToArea
    this.PipelineArea = PipelineArea

    this.backToStudentsButton = element(by.id('ext02-back'))

    this.container = element(by.css('section.student-profile'))
    this.informationContainer = this.container.element(by.css('student-edit-information'))
    this.studentSidebarOwnerContainer = this.container.element(by.css('student-sidebar-owner'))

    this.tasksContainer = this.container.$('.sidebar-tasks')
    this.taskTitleField = this.tasksContainer.element(by.model('addTask.data.details'))
    this.taskDatePicker = this.tasksContainer.element(by.model('data.date'))
    this.taskTimeDropdown = this.tasksContainer.element(by.model('data.time'))
    this.assignToField = this.tasksContainer.element(by.css('select + div'))
    this.submitTaskButton = this.tasksContainer.element(by.css('button[type="submit"]'))
    this.alertBoxMessage = element(by.css('.alert-box-message'))

    this.assignedToLabel = this.studentSidebarOwnerContainer.$('photo-initials + div > p')
    this.firstNameField = this.informationContainer.element(by.name('firstname'))
    this.lastNameField = this.informationContainer.element(by.name('lastname'))
    this.emailField = this.informationContainer.element(by.name('email'))
    this.nationalityField = this.informationContainer.element(by.name('nationality'))
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

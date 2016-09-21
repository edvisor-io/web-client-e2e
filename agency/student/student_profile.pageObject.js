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

    this.overviewContainer = this.container.$('.student-sidebar')
    // this.changeOwnerButton = this.overviewContainer.element(by.id('ext02-change-owner-btn'))
    // this.officeField = this.overviewContainer.element(by.name('agency'))
    // this.changeOfficeExceptionModal = element(by.css('.e-alert_body'))
    // this.ownerField = this.overviewContainer.element(by.name('name'))
    // this.studentAgencyName = this.overviewContainer.element(by.id('student-agency-name'))
    // this.studentOwner = this.overviewContainer.element(by.css('photo-initials + div > p'))
    // this.submitButton = this.overviewContainer.element(by.css('button[type="submit"]'))

    this.pipelinesContainer = this.overviewContainer.element(by.tagName('student-sidebar-pipelines'))
    this.changePipelineFirstButton = this.pipelinesContainer.all(by.css('.btn-group-dropdown > button[type="button"]')).get(0)
    this.changePipelineSecondButton = this.pipelinesContainer.all(by.css('div button')).get(1)
    this.changePipelineStatusRelativeOption = this.pipelinesContainer.$('button#this-pipeline-toggle')
    this.pipelineStatusSecondRelativeOption = this.pipelinesContainer.$('div.student-status_status button:nth-child(2)')
    this.firstHeader = this.pipelinesContainer.all(by.css('h5:nth-child(1)')).get(0)
    this.secondHeader = this.pipelinesContainer.all(by.css('h5:nth-child(1)')).get(1)
    this.studentStatusSecondList = this.pipelinesContainer.all(by.css('.student-status_list')).get(1)
    this.studentStatusFirstCheckbox = this.studentStatusSecondList.all(by.css('input[type="checkbox"]')).get(0)
    this.studentStatusSecondCheckbox = this.studentStatusSecondList.all(by.css('input[type="checkbox"]')).get(1)
    this.studentStatusThirdCheckbox = this.studentStatusSecondList.all(by.css('input[type="checkbox"]')).get(2)

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

  // clickOverviewChangeOwnerButton() {
  //   this.changeOwnerButton.click()
  // }

  // setAsNewOffice(newOffice) {
  //   ChosenWidget.setChosenValue(this.officeField, newOffice)
  //   this.submitButton.click()
  // }

  // setAsNewOwner(newOwner) {
  //   ChosenWidget.setChosenValue(this.ownerField, newOwner)
  //   this.submitButton.click()
  // }

  // clickChangePipelineFirstButton() {
  //   this.changePipelineFirstButton.click()
  // }

  clickChangePipelineSecondButton() {
    this.changePipelineSecondButton.click()
  }

  // clickChangePipelineStatusRelativeOption() {
  //   this.changePipelineStatusRelativeOption.click()
  // }

  // clickPipelineStatusSecondRelativeOption() {
  //   this.pipelineStatusSecondRelativeOption.click()
  // }

  clickStudentStatusThreeCheckboxes() {
    this.studentStatusFirstCheckbox.click()
    this.studentStatusSecondCheckbox.click()
    this.studentStatusThirdCheckbox.click()
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

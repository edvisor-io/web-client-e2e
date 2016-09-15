import {ChosenWidget} from '../../shared/widgets'

export default class StudentProfilePage {
  constructor() {
    this.container = element(by.css('section.student-profile'))
    this.informationContainer = this.container.element(by.css('student-edit-information'))
    this.studentSidebarOwnerContainer = this.container.element(by.css('student-sidebar-owner'))
    this.overviewContainer = this.container.$('.student-sidebar')

    this.changeOwnerButton = this.overviewContainer.element(by.id('ext02-change-owner-btn'))
    this.officeField = this.overviewContainer.element(by.name('agency'))
    this.ownerField = this.overviewContainer.element(by.name('name'))
    this.submitButton = this.overviewContainer.element(by.css('button[type="submit"]'))
    this.studentAgencyName = this.overviewContainer.element(by.id('student-agency-name'))
    this.studentOwner = this.overviewContainer.element(by.css('photo-initials + div > p'))

    this.changeOfficeExceptionModal = element(by.css('.e-alert_body'))

    this.changePipelineButton = this.overviewContainer.$('.btn-group-dropdown > button[type="button"]')
    this.changePipelineStatus = this.overviewContainer.$('button#this-pipeline-toggle')
    this.pipelineOptionDeciding = this.overviewContainer.$('div.student-status_status button:nth-child(2)')
    this.headerStatus = this.overviewContainer.$('h5:nth-child(1)')

    this.assignedToLabel = this.studentSidebarOwnerContainer.$('photo-initials + div > p')
    this.firstNameField = this.informationContainer.element(by.name('firstname'))
    this.lastNameField = this.informationContainer.element(by.name('lastname'))
    this.emailField = this.informationContainer.element(by.name('email'))
    this.nationalityField = this.informationContainer.element(by.name('nationality'))
  }

  clickOverviewChangeOwnerButton() {
    this.changeOwnerButton.click()
  }

  setAsNewOffice(newOffice) {
    ChosenWidget.setChosenValue(this.officeField, newOffice)
    this.submitButton.click()
  }

  setAsNewOwner(newOwner) {
    ChosenWidget.setChosenValue(this.ownerField, newOwner)
    this.submitButton.click()
  }

  // resolveChangeOfficeExceptionModal() {
  //   // browser.pause()
  //   if (this.changeOfficeExceptionModal == true) {
  //     let moveStudentButton = this.changeOfficeExceptionModal.element(by.css('button[ng-click="resolve()"]'))
  //     moveStudentButton.click()
  //   }
  // }

  clickChangePipelineButton() {
    this.changePipelineButton.click()
  }

  clickChangePipelineStatus() {
    this.changePipelineStatus.click()
  }

  clickStatusDeciding() {
    this.pipelineOptionDeciding.click()
  }
}

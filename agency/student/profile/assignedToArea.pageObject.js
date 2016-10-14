import {ChosenWidget} from '../../../shared/widgets'

export default class AssignedToArea {
  constructor() {
    this.container = element.all(by
      .css('section.student-profile .student-sidebar .card')).get(0)
    this.changeOwnerButton = this.container
      .element(by.id('ext02-change-owner-btn'))
    this.officeField = this.container.element(by.name('agency'))
    this.saveButton = this.container.$('button[type="submit"]')
    this.changeOfficeExceptionModal = $('.e-alert_inner-container')
    this.moveStudentButton = this.changeOfficeExceptionModal.$('.btn--default')
    this.ownerField = this.container.element(by.name('name'))
    this.agencyName = this.container.element(by.id('student-agency-name'))
    this.ownerName = this.container.$('photo-initials + div > p')
  }

  clickChangeOwnerButton() {
    this.changeOwnerButton.click()
  }

  setAsNewOffice(newOffice) {
    ChosenWidget.setChosenValue(this.officeField, newOffice)
    this.saveButton.click()
  }

  clickMoveStudentButton() {
    this.moveStudentButton.click()
  }

  setAsNewOwner(newOwner) {
    ChosenWidget.setChosenValue(this.ownerField, newOwner)
    this.saveButton.click()
  }
}

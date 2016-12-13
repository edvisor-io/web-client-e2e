import {ChosenWidget} from '../../../shared/widgets'
import constants from '../../../shared/constants'

export default class AssignedToArea {
  constructor() {
    this.container = element.all(by
      .css('section.student-profile .student-sidebar .card')).get(0)
    this.changeOwnerButton = this.container
      .element(by.id('ext02-change-owner-btn'))
    this.officeField = this.container.element(by.name('agency'))
    this.saveButton = this.container.$('button[type="submit"]')
    this.changeOfficeExceptionModal = $('.e-alert_inner-container')
    this.moveStudentConfirmButton = this.changeOfficeExceptionModal.all(by.css('button')).last()
    this.ownerField = this.container.element(by.name('name'))
    this.agencyName = this.container.element(by.id('student-agency-name'))
    this.ownerName = this.container.$('photo-initials + div > p')
  }

  clickChangeOwnerButton() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.changeOwnerButton), constants.TIMEOUT_TIME)
    this.changeOwnerButton.click()
  }

  setAsNewOffice(newOffice = 'Bogotá Office') {
    ChosenWidget.setChosenValue(this.officeField, newOffice)
    this.saveButton.click()
  }

  clickMoveStudentConfirmButton() {
    this.moveStudentConfirmButton.click()
  }

  setAsNewOwner(newOwner) {
    ChosenWidget.setChosenValue(this.ownerField, newOwner)
    this.saveButton.click()
  }
}

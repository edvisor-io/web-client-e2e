import constants from '../../shared/constants'

import uuid from 'node-uuid'

export default class CoursePage {
  constructor() {
    this.nameField = $('input[name="offeringName"]')
    this.saveButton = $('button[type="submit"]')

    this.backToCoursesButton = element(by.id('ext14-course-edit-breadcrump'))
    this.deleteButton = element(by.id('ext14-course-edit-delete'))
    this.confirmDeleteYesButton = element(by.css('button.btn--danger'))
  }

  waitTillClickable(element) {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), constants.TIMEOUT_TIME)
  }

  inputName(name = `${uuid.v4()}`) {
    this.waitTillClickable(this.nameField)
    this.nameField.sendKeys(name)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  clickBackToCoursesButton() {
    this.backToCoursesButton.click()
  }

  fillAndSaveForm(name) {
    this.inputName(name)
    this.clickSaveButton()
  }

  deleteCourse() {
    this.waitTillClickable(this.deleteButton)
    this.deleteButton.click()
    this.confirmDeleteYesButton.click()
  }
}

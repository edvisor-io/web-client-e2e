import constants from '../../../shared/constants'

export default class DuplicateCampusModal {
  constructor() {
    this.newCampusNameField = $('input[name="duplicateName"]')
    this.takeMeToTheNewCampusButton = $('button[type="submit"]')
  }

  waitTillClickable(element) {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), constants.TIMEOUT_TIME)
  }

  inputNewCampusName(name = 'Hogwarts') {
    this.waitTillClickable(this.newCampusNameField)
    this.newCampusNameField.clear()
    this.newCampusNameField.sendKeys(name)
  }

  clickTakeMeToTheNewCampusButton() {
    this.waitTillClickable(this.takeMeToTheNewCampusButton)
    this.takeMeToTheNewCampusButton.click()
  }
}

import constants from '../../../shared/constants'

export default class DuplicateCampusModal {
  constructor() {
    this.newCampusNameField = $('input[name="duplicateName"]')
    this.takeMeToTheNewCampusButton = $('button[type="submit"]')
  }

  inputNewCampusName(name = 'Hogwarts') {
    this.newCampusNameField.clear()
    this.newCampusNameField.sendKeys(name)
  }

  clickTakeMeToTheNewCampusButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.takeMeToTheNewCampusButton), constants.TIMEOUT_TIME)
    this.takeMeToTheNewCampusButton.click()
  }
}

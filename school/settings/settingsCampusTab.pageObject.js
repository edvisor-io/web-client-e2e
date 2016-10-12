import constants from '../../shared/constants'

export default class CampusTab {
  constructor() {
    this.duplicateButton = $('div.flex-spread > div > button')
    this.newCampusNameField = $('input[name="duplicateName"]')
    this.takeMeToTheNewCampusButton = $('button[type="submit"]')

    this.selectCampusDropdown = element.all(by.css('div.selected_item')).first()
    this.lastItemInDropdown = element.all(by.css('ul.menu li span')).last()

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickDuplicateButton() {
    this.duplicateButton.click()
  }

  inputNewCampusName(name = 'Hogwarts') {
    this.newCampusNameField.clear()
    this.newCampusNameField.sendKeys(name)
  }

  clickSelectCampusDropdown() {
    this.selectCampusDropdown.click()
  }

  clickTakeMeToTheNewCampusButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.takeMeToTheNewCampusButton), constants.TIMEOUT_TIME)
    this.takeMeToTheNewCampusButton.click()
  }

  duplicateCampus(campusName) {
    this.clickDuplicateButton()
    this.inputNewCampusName(campusName)
    this.clickTakeMeToTheNewCampusButton()
  }
}

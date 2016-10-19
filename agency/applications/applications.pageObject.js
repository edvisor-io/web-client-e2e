import NewApplicationPage from './applicationsNewApplications.pageObject'
import {UISelectWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

class ApplicationsPage {
  constructor() {
    this.NewApplicationPage = NewApplicationPage

    this.newApplicationModal = element(by.id('ext11-create-application-modal'))
    this.nameField = this.newApplicationModal.$('.ui-select-container')
    this.firstPrefillButton = this.newApplicationModal.all(by.css('button')).first()
    this.continueButton = this.newApplicationModal.$('button[type="submit"]')

    this.newApplicationButton = element(by.id('ext11-new-application-btn'))
  }

  clickNewApplicationButton() {
    this.newApplicationButton.click()
  }

  inputName(name = 'Alex') {
    UISelectWidget.clickUISelect(this.nameField, name)
  }

  clickFirstPrefillButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.firstPrefillButton), constants.TIMEOUT_TIME)
    this.firstPrefillButton.click()
  }

  inputSchool(school = '20') {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.schoolField), constants.TIMEOUT_TIME)
    UISelectWidget.clickUISelect(this.schoolField, school)
  }

  clickContinueButton() {
    this.continueButton.click()
  }
}

export default ApplicationsPage

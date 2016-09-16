import constants from '../shared/constants'

export default class AgencyNav {
  constructor() {
    this.navSidebar = element(by.css('.sidebar > ul'))
    this.studentsButton = this.navSidebar.element(by.id('ext28-students'))

    this.navHeader = element(by.css('header'))
    this.userDropdown = this.navHeader.element(by.css('.settings-dropdown'))

    this.settingsButton = this.userDropdown.element(by.id('ext27-settings'))
  }

  goToStudents() {
    this.studentsButton.click()
  }

  goToSettings() {
    let expected = protractor.ExpectedConditions

    this.userDropdown.click()
    browser.wait(expected.elementToBeClickable(this.settingsButton), constants.TIMEOUT_TIME)
    this.settingsButton.click()
  }
}

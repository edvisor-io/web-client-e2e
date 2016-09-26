import constants from '../shared/constants'

export default class AgencyNav {
  constructor() {
    this.navSidebar = element(by.css('.sidebar > ul'))
    this.studentsButton = this.navSidebar.element(by.id('ext28-students'))
    this.findCoursesButton = this.navSidebar.element(by.id('ext28-browse'))
    this.quotesButton = this.navSidebar.element(by.id('ext28-student-quote'))

    this.navHeader = element(by.css('header'))
    this.userDropdown = this.navHeader.element(by.css('.settings-dropdown'))
    this.settingsButton = this.userDropdown.element(by.id('ext27-settings'))
  }

  goToFindCourses() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.findCoursesButton), constants.TIMEOUT_TIME)
    this.findCoursesButton.click()
  }

  goToQuotes() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.quotesButton), constants.TIMEOUT_TIME)
    this.quotesButton.click()
  }

  goToStudents() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.studentsButton), constants.TIMEOUT_TIME)
    this.studentsButton.click()
  }

  goToSettings() {
    let expected = protractor.ExpectedConditions

    this.userDropdown.click()
    browser.wait(expected.elementToBeClickable(this.settingsButton), constants.TIMEOUT_TIME)
    this.settingsButton.click()
  }
}

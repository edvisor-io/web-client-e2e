import constants from '../shared/constants'

export default class AgencyNav {
  constructor() {
    this.navSidebar = $('.sidebar > ul')
    this.studentsButton = this.navSidebar.element(by.id('ext28-students'))
    this.findCoursesButton = this.navSidebar.element(by.id('ext28-browse'))
    this.quotesButton = this.navSidebar.element(by.id('ext28-student-quote'))
    this.productsPromotionsButton = this.navSidebar
      .element(by.id('ext28-offerings'))
    this.accommodationsButton = this.productsPromotionsButton
      .all(by.css('a')).get(1)
    this.addonsButton = this.productsPromotionsButton.all(by.css('a')).get(2)
    this.feesButton = this.productsPromotionsButton.all(by.css('a')).get(3)
    this.promotionsButton = this.productsPromotionsButton
      .all(by.css('a')).get(4)

    this.navHeader = $('header')
    this.userDropdown = this.navHeader.$('.settings-dropdown')
    this.settingsButton = this.userDropdown.element(by.id('ext27-settings'))
    this.manageSchoolsButton = this.userDropdown.element(by.id('ext27-schools'))
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
    browser.wait(expected.elementToBeClickable(this.navHeader), constants.TIMEOUT_TIME)
    this.userDropdown.click()

    browser.wait(expected.elementToBeClickable(this.settingsButton), constants.TIMEOUT_TIME)
    this.settingsButton.click()
  }

  goToManageSchools() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.navHeader), constants.TIMEOUT_TIME)
    this.userDropdown.click()

    browser.wait(EXPECTED.elementToBeClickable(this.manageSchoolsButton), constants.TIMEOUT_TIME)
    this.manageSchoolsButton.click()
  }

  openProductsPromotionsButton() {
    this.productsPromotionsButton.click()
  }

  clickAccommodationsButton() {
    this.accommodationsButton.click()
  }

  clickAddonsButton() {
    this.addonsButton.click()
  }

  clickFeesButton() {
    this.feesButton.click()
  }

  clickPromotionsButton() {
    this.promotionsButton.click()
  }
}

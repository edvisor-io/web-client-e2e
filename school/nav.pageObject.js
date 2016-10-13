import constants from '../shared/constants'

export default class SchoolNav {
  constructor() {
    this.navSidebar = $('.sidebar > ul')
    this.applicationsButton = element(by.id('ext30-applications'))
    this.productsAndAddonsButton = element(by.id('ext30-offerings'))
    this.promotionsButton = element(by.id('ext30-promotion'))

    this.navHeader = $('header')
    this.userDropdown = this.navHeader.$('.settings-dropdown')
    this.settingsButton = this.userDropdown.element(by.id('ext29-settings'))
    this.manageAgenciesButton = this.userDropdown.element(by.id('ext29-manage-agencies'))
  }

  goToApplications() {
    this.applicationsButton.click()
  }

  goToProductsAndAddons() {
    this.productsAndAddonsButton.click()
  }

  goToPromotions() {
    this.promotionsButton.click()
  }

  clickUserDropdown() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.userDropdown), constants.TIMEOUT_TIME)
    this.userDropdown.click()
  }

  clickSettingsButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.settingsButton), constants.TIMEOUT_TIME)
    this.settingsButton.click()
  }

  clickManageAgenciesButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.manageAgenciesButton), constants.TIMEOUT_TIME)
    this.manageAgenciesButton.click()
  }

  goToSettings() {
    this.clickUserDropdown()
    this.clickSettingsButton()
  }

  goToManageAgencies() {
    this.clickUserDropdown()
    this.clickManageAgenciesButton()
  }
}

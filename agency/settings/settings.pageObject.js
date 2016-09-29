import AgencyTab from './settingsAgencyTab.pageObject.js'
import TeamTab from './settingsTeamTab.pageObject'
import CompanyTab from './settingsCompanyTab.pageObject'
import PaymentTab from './settingsPaymentTab.pageObject'
import constants from '../../shared/constants'

class SettingsPage {
  constructor() {
    this.TeamTab = TeamTab
    this.AgencyTab = AgencyTab
    this.CompanyTab = CompanyTab
    this.PaymentTab = PaymentTab

    this.tabContainer = element(by.id('ext01-settings-tabs'))
    this.tabs = this.tabContainer.all(by.css('li'))
    this.companyTabButton = this.tabs.get(3)

    this.alertBoxMessage = $('.alert-box-message')
  }

  goToPersonalTab() {
    this.tabs.get(0).click()
  }

  goToAgencyTab() {
    this.tabs.get(1).click()
  }

  goToTeamTab() {
    this.tabs.get(2).click()
  }

  goToCompanyTab() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.companyTabButton), constants.TIMEOUT_TIME)
    this.companyTabButton.click()
  }

  goToPaymentTab() {
    this.tabs.get(4).click()
  }

  static waitForGhostTab() {
    var ghostTab = $('#ext01-settings-tabs > li#remove')

    // wait until the ghostTab has disappeared
    browser.wait(() => {
      return browser.isElementPresent(ghostTab).then(function(presenceOfElement) {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }
}

export default SettingsPage

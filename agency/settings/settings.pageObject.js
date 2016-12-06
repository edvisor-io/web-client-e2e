import PersonalTab from './settingsPersonalTab.pageObject'
import AgencyTab from './settingsAgencyTab.pageObject'
import TeamTab from './settingsTeamTab.pageObject'
import CompanyTab from './settingsCompanyTab.pageObject'
import PaymentTab from './settingsPaymentTab.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

class SettingsPage {
  constructor() {
    this.PersonalTab = PersonalTab
    this.AgencyTab = AgencyTab
    this.TeamTab = TeamTab
    this.CompanyTab = CompanyTab
    this.PaymentTab = PaymentTab

    this.tabContainer = element(by.id('ext01-settings-tabs'))
    this.tabs = this.tabContainer.all(by.css('li'))
    this.firstTabTitleElement = this.tabs.get(0).all(by.css('span')).get(0)
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

  testNeedsDuplicatePipeline() {
    browser.get(constants.LEGACY_URL_SETTINGS_OFFICES_TAB)
    LoginPage.waitForLoader()
    SettingsPage.waitForGhostTab()

    const settingsPage = new SettingsPage()
    const agencyTab = new settingsPage.AgencyTab()
    agencyTab.clickPipelineButton()
    agencyTab.clickDuplicateButton()
  }
}

export default SettingsPage

import SettingsPage from './settings.pageObject'
import constants from '../../shared/constants'
import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
// import uuid from 'node-uuid'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('the settings page', () => {
  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should add slots in TeamTab when slots are added in PaymentTab', () => {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToSettings()

    let settingsPage = new SettingsPage()
    settingsPage.goToTeamTab()

    // let teamTab = new settingsPage.TeamTab()
    // let inviteArea = new teamTab.InviteArea()
    // let maxSlots = inviteArea.getMaxSlots()

    settingsPage.goToPaymentTab()
    let paymentTab = new settingsPage.PaymentTab()
    paymentTab.clickChangeUsersAndSubscriptionButton()
    paymentTab.clickIncrementButton()
    paymentTab.clickChangeSubscriptionButton()
    browser.sleep(5000)
    paymentTab.clickOkButton()
  })

  it('should manually add a currency exchange rate', () => {
    const RATE = 1

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToSettings()

    let settingsPage = new SettingsPage()
    settingsPage.goToCompanyTab()

    let companyTab = new settingsPage.CompanyTab()
    let currencySettingsArea = new companyTab.CurrencySettingsArea()
    currencySettingsArea.clickManuallySetRadio()
    currencySettingsArea.clickSetRatesButton()
    currencySettingsArea.inputRate(RATE)
    currencySettingsArea.clickSaveButton()

    expect(settingsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  describe('Sales reps', () => {
    beforeEach(() => {
      let loginPage = new LoginPage()
      loginPage.login(constants.SALES_REP_EMAIL, constants.SALES_REP_PASS)
      LoginPage.waitForLoader()

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
    })

    it('can only see "Personal" tab under settings', () => {
      var tabTitle = 'Personal'
      var tabCount = 1
      var settingsPage = new SettingsPage()
      var tabTitleElement = settingsPage.tabs.get(0).all(by.css('span')).get(0)

      expect(settingsPage.tabs.count()).to.eventually.equal(tabCount)
      expect(tabTitleElement.getText()).to.eventually.equal(tabTitle)
    })
  })

  describe('Admins', () => {
    beforeEach(() => {
      let loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()
    })

    it('can see all the tabs', () => {
      var settingsPage = new SettingsPage()
      var allTabCount = 5

      expect(settingsPage.tabs.count()).to.eventually.be.at.least(allTabCount)
    })

    it('can remove an existing team member', () => {
      let settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      let TeamTab = new settingsPage.TeamTab()
      let TeamTabManageMembersPage = new TeamTab.ManageMembers()
      TeamTabManageMembersPage.clickLastManagerEditButton()
      TeamTabManageMembersPage.clickLastManagerDeleteButton()
      var countBefore = TeamTabManageMembersPage.getManagersCount()
      TeamTabManageMembersPage.clickDeleteButton()
      var countAfter = TeamTabManageMembersPage.getManagersCount()
      expect(countAfter).to.eventually.equal(countBefore)
      browser.sleep(5000)
    })

    it('can invite a new team member', () => {
      const firstname = 'NewTeamMember'
      const lastname = 'Lastname'
      const email = `${uuid.v4()}@test.io`
      const role = 'Manager'

      var settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      var teamTabPage = new settingsPage.TeamTab()
      var teamTabInvitePage = new teamTabPage.Invite()

      teamTabInvitePage.invite(firstname, lastname, email, role)

      var teamTabManageMembersPage = new teamTabPage.ManageMembers()

      var teamMemberCard = new teamTabManageMembersPage.TeamMember(teamTabManageMembersPage.managers.last())
      expect(teamMemberCard.name.getText()).to.eventually.equal(`${firstname} ${lastname}`)
    })
  })
})

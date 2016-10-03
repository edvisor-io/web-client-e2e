import SettingsPage from './settings.pageObject'
import QuotesPage from '../quotes/quotes.pageObject'
import CoursesPage from '../courses/courses.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import HomePage from '../../shared/pages/home.pageObject'
import AgencyNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

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

  describe('user slots maxed out', () => {
    it('should not allow new TeamTab invites before adding in PaymentTab', () => {
      const NO_SLOTS_ALERT_TEXT = 'You do not have any more slots available.'

      let loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      let settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      let teamTab = new settingsPage.TeamTab()
      let inviteArea = new teamTab.InviteArea()
      inviteArea.slotsElement.getText()
        .then((originalText) => {
          var originalUsedSlots = originalText.match(/\d+/g)[0]
          var originalMaxSlots = originalText.match(/\d+/g)[1]

          settingsPage.goToPaymentTab()
          let paymentTab = new settingsPage.PaymentTab()
          paymentTab.changeSubscription(originalMaxSlots, originalUsedSlots)

          settingsPage.goToTeamTab()
          expect(inviteArea.noSlotsAlert.getText()).to.eventually.equal(NO_SLOTS_ALERT_TEXT)

          settingsPage.goToPaymentTab()
          paymentTab.changeSubscription(originalUsedSlots, originalMaxSlots)
        })
    })

    it('should not allow new TeamTab invites before removing existing members', () => {
      const NO_SLOTS_ALERT_TEXT = 'You do not have any more slots available.'

      let loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      let settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      let teamTab = new settingsPage.TeamTab()
      let inviteArea = new teamTab.InviteArea()
      inviteArea.slotsElement.getText()
        .then((originalText) => {
          var originalUsedSlots = originalText.match(/\d+/g)[0]
          var originalMaxSlots = originalText.match(/\d+/g)[1]

          settingsPage.goToPaymentTab()
          let paymentTab = new settingsPage.PaymentTab()
          paymentTab.changeSubscription(originalMaxSlots, originalUsedSlots)

          settingsPage.goToTeamTab()
          expect(inviteArea.noSlotsAlert.getText()).to.eventually.equal(NO_SLOTS_ALERT_TEXT)

          let manageMembersArea = new teamTab.ManageMembersArea()
          let lastAdminCard = new manageMembersArea.TeamMember(manageMembersArea.lastAdminCard)
          lastAdminCard.clickEditButton()
          lastAdminCard.clickDeleteButton()
          manageMembersArea.clickConfirmDeleteButton()

          expect(inviteArea.noSlotsAlert.isPresent()).to.eventually.equal(false)

          settingsPage.goToPaymentTab()
          paymentTab.changeSubscription(originalUsedSlots, originalMaxSlots)
        })
    })

    it('should not allow a slot change to less than current team size until members are reduced', () => {
      const NO_SLOTS_ALERT_TEXT = 'You do not have any more slots available.'

      let loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      let settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      let teamTab = new settingsPage.TeamTab()
      let inviteArea = new teamTab.InviteArea()
      inviteArea.slotsElement.getText()
        .then((originalText) => {
          var originalUsedSlots = originalText.match(/\d+/g)[0]
          var originalMaxSlots = originalText.match(/\d+/g)[1]

          settingsPage.goToPaymentTab()
          let paymentTab = new settingsPage.PaymentTab()
          paymentTab.changeSubscription(originalMaxSlots, originalUsedSlots)
          paymentTab.clickChangeUsersAndSubscriptionButton()
          paymentTab.clickDecrementButton()
          expect(paymentTab.changeSubscriptionButton.isPresent()).to.eventually.equal(false)

          settingsPage.goToTeamTab()
          expect(inviteArea.noSlotsAlert.getText()).to.eventually.equal(NO_SLOTS_ALERT_TEXT)

          let manageMembersArea = new teamTab.ManageMembersArea()
          manageMembersArea.clickLastManagerEditButton()
          manageMembersArea.clickLastManagerDeleteButton()
          manageMembersArea.clickConfirmDeleteButton()

          settingsPage.goToPaymentTab()
          browser.driver.navigate().refresh()
          LoginPage.waitForLoader()
          paymentTab.clickChangeUsersAndSubscriptionButton()
          paymentTab.clickDecrementButton()
          expect(paymentTab.changeSubscriptionButton.isPresent()).to.eventually.equal(true)
        })
    })
  })

  it('should increase slots in TeamTab when added in PaymentTab', () => {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToSettings()

    let settingsPage = new SettingsPage()
    settingsPage.goToTeamTab()
    let teamTab = new settingsPage.TeamTab()
    let inviteArea = new teamTab.InviteArea()
    inviteArea.slotsElement.getText()
      .then((originalText) => {
        var originalMaxSlots = originalText.match(/\d+/g)[1]

        settingsPage.goToPaymentTab()
        let paymentTab = new settingsPage.PaymentTab()
        paymentTab.clickChangeUsersAndSubscriptionButton()
        paymentTab.clickIncrementButton()
        paymentTab.clickChangeSubscriptionButton()
        paymentTab.clickOkButton()

        settingsPage.goToTeamTab()
        inviteArea.slotsElement.getText()
          .then((newText) => {
            var newMaxSlots = newText.match(/\d+/g)[1]

            expect(+newMaxSlots).to.equal(+originalMaxSlots + 1)
          })
      })
  })

  describe('sales reps', () => {
    beforeEach(() => {
      let loginPage = new LoginPage()
      loginPage.login(constants.SALES_REP_EMAIL, constants.SALES_REP_PASS)
      LoginPage.waitForLoader()
    })

    it('should only see "Personal" tab under settings', () => {
      var tabTitle = 'Personal'
      var tabCount = 1
      var settingsPage = new SettingsPage()
      var tabTitleElement = settingsPage.tabs.get(0).all(by.css('span')).get(0)

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()

      expect(settingsPage.tabs.count()).to.eventually.equal(tabCount)
      expect(tabTitleElement.getText()).to.eventually.equal(tabTitle)
    })

    it('should not see the "Commissions" box on the home page', () => {
      let homePage = new HomePage()
      expect(homePage.totalCommissionBoxContent.isPresent()).to.eventually.equal(false)
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

    it('can invite a new team member', () => {
      const firstname = 'NewTeamMember'
      const lastname = 'Lastname'
      const email = `${uuid.v4()}@test.io`
      const role = 'Manager'

      var settingsPage = new SettingsPage()
      settingsPage.goToTeamTab()

      var teamTab = new settingsPage.TeamTab()
      var inviteArea = new teamTab.InviteArea()

      inviteArea.invite(firstname, lastname, email, role)

      var manageMembersArea = new teamTab.ManageMembersArea()

      var teamMemberCard = new manageMembersArea.TeamMember(manageMembersArea.managers.last())
      expect(teamMemberCard.name.getText()).to.eventually.equal(`${firstname} ${lastname}`)
    })
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
    currencySettingsArea.inputRateIntoFirstField(RATE)
    currencySettingsArea.clickInModalSaveButton()

    expect(settingsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should change the quoted amount according to manually set rates', () => {
    const EXCHANGE_RATE = 1000000.01
    const EXPECTED_MAX = 10.01 // is sufficient unless multi million CAD quote
    const SEARCH_TERM = 'Alex'

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
    currencySettingsArea.inputRateIntoFourthField(EXCHANGE_RATE)
    currencySettingsArea.clickInModalSaveButton()
    currencySettingsArea.clickManuallySetRadio()
    currencySettingsArea.clickSaveButton()

    agencyNav.goToQuotes()
    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.startQuoteUsingBasicSearch()
    // coursesPage.doBasicSearch()
    // coursesPage.selectFirstResultCheckbox()
    // coursesPage.clickStartQuoteButton()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.inputNameSearch(SEARCH_TERM)
    quotesEditPage.selectCurrencyFromDropdown()

    quotesEditPage.totalInCustomCurrency.getText()
      .then((text) => {
        let amountText = text.replace(/[^0-9\.]/g, '')
        expect(+amountText).to.be.at.most(EXPECTED_MAX)

        browser.get('/agency/en/504/settings/company')
        LoginPage.waitForLoader()
        currencySettingsArea.clickAutomaticallySetRadio()
        currencySettingsArea.clickSaveButton()
        browser.sleep(5000)
      })
  })
})

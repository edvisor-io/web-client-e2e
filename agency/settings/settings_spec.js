import SettingsPage from './settings.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import CoursesPage from '../courses/courses.pageObject'
import QuotesPage from '../quotes/quotes.pageObject'
import AgencyNav from '../nav.pageObject'
import HomePage from '../../shared/pages/home.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the settings page', () => {
  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  // being changed, don't fix
  describe('sales reps', () => {
    beforeEach(() => {
      const loginPage = new LoginPage()
      loginPage.login(constants.SALES_REP_EMAIL, constants.SALES_REP_PASS)
      LoginPage.waitForLoader()
    })

    it('should only see one "Personal" tab under settings', () => {
      const TAB_TITLE = 'Personal'
      const EXPECTED_TAB_COUNT = 1

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()

      const settingsPage = new SettingsPage()
      expect(settingsPage.tabs.count()).to.eventually.equal(EXPECTED_TAB_COUNT)
      expect(settingsPage.firstTabTitleElement.getText()).to.eventually.equal(TAB_TITLE)
    })

    it('should not see the "Commissions" box on the home page', () => {
      const homePage = new HomePage()
      expect(homePage.totalCommissionBoxContent.isPresent()).to.eventually.equal(false)
    })
  })

  describe('admins', () => {
    beforeEach(() => {
      const loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()
    })

    it('can see all the tabs', () => {
      const EXPECTED_TAB_COUNT = 5

      const settingsPage = new SettingsPage()
      expect(settingsPage.tabs.count()).to.eventually.be.at.least(EXPECTED_TAB_COUNT)
    })

    it('can invite a new team member', () => {
      const FIRST_NAME = 'Arthur'
      const LAST_NAME = 'Dent'
      const EMAIL = `${uuid.v4()}@earth.io`
      const ROLE = 'Manager'

      const settingsPage = new SettingsPage()
      settingsPage.goToPaymentTab()
      const paymentTab = new settingsPage.PaymentTab()
      paymentTab.clickChangeUsersAndSubscriptionButton()
      paymentTab.clickIncrementButton()
      paymentTab.clickChangeSubscriptionButton()
      paymentTab.clickOkButton()

      settingsPage.goToTeamTab()
      const teamTab = new settingsPage.TeamTab()
      const inviteArea = new teamTab.InviteArea()
      inviteArea.invite(FIRST_NAME, LAST_NAME, EMAIL, ROLE)

      const manageMembersArea = new teamTab.ManageMembersArea()

      const teamMemberCard = new manageMembersArea.TeamMember(manageMembersArea.managers.last())
      expect(teamMemberCard.name.getText()).to.eventually.equal(`${FIRST_NAME} ${LAST_NAME}`)
    })
  })

  // being changed, don't fix
  describe('user slots', () => {
    const NO_SLOTS_ALERT_TEXT = 'You do not have any more slots available.'

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

    it('when maxed out, should not allow new TeamTab invites before adding in PaymentTab', () => {
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

    it('when maxed out, should not allow new TeamTab invites before removing existing members', () => {
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
          manageMembersArea.clickLastManagerEditButton()
          manageMembersArea.clickLastManagerDeleteButton()
          manageMembersArea.clickConfirmDeleteButton()

          expect(inviteArea.noSlotsAlert.isPresent()).to.eventually.equal(false)

          settingsPage.goToPaymentTab()
          paymentTab.changeSubscription(originalUsedSlots, originalMaxSlots)
        })
    })

    it('when maxed out, should not allow a slot change to less than current team size until members are reduced', () => {
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

  describe('exchange rates', () => {
    beforeEach(() => {
      const loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()

      const settingsPage = new SettingsPage()
      settingsPage.goToCompanyTab()
    })

    it('should manually add an exchange rate', () => {
      const RATE = 1

      const settingsPage = new SettingsPage()
      const companyTab = new settingsPage.CompanyTab()
      const currencySettingsArea = new companyTab.CurrencySettingsArea()
      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSetRatesButton()
      currencySettingsArea.inputRateIntoFirstField(RATE)
      currencySettingsArea.clickInModalSaveButton()

      expect(settingsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('should change the quoted amount according to manually set rates', () => {
      const EXCHANGE_RATE = 0.00001
      const EXPECTED_MAX = 10.01 // is sufficient unless multi million CAD quote
      const SEARCH_TERM = 'Alex'

      const settingsPage = new SettingsPage()
      const companyTab = new settingsPage.CompanyTab()
      const currencySettingsArea = new companyTab.CurrencySettingsArea()
      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSetRatesButton()
      currencySettingsArea.inputRateIntoFiftySeventhField(EXCHANGE_RATE)
      currencySettingsArea.clickInModalSaveButton()
      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSaveButton()

      const agencyNav = new AgencyNav()
      agencyNav.goToQuotes()
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()

      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesEditPage = new quotesPage.QuotesEditPage()
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
      })
    })
  })

  describe('tier: Platform', () => {
    beforeEach(() => {
      const loginPage = new LoginPage()
      loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
    })

    it('should only show Office Information in Agency Tab', () => {
      const settingsPage = new SettingsPage()
      settingsPage.goToAgencyTab()

      const agencyTab = new settingsPage.AgencyTab()
      expect(agencyTab.headingsInInformationTab.count()).to.eventually.equal(1)
    })

    it('should only show Personal Info, Password and Language in Personal Tab', () => {
      const settingsPage = new SettingsPage()
      settingsPage.goToPersonalTab()

      const personalTab = new settingsPage.PersonalTab()
      expect(personalTab.rows.count()).to.eventually.equal(3)
    })
  })
})

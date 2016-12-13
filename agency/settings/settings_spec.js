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

describe('the agency app settings page', () => {
  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  describe('navigation', () => {})

  describe('sales reps', () => {
    before(() => {
      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.SALES_REP_EMAIL, constants.SALES_REP_PASS)
      LoginPage.waitForLoader()
    })

    after(() => {
      browser.driver.manage().deleteAllCookies()
    })

    it('in test default permissions, can see 4 tabs in settings', () => {
      const TAB_TITLE = 'Personal'
      const EXPECTED_TAB_COUNT = 4

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()

      const settingsPage = new SettingsPage()
      expect(settingsPage.tabs.count()).to.eventually.equal(EXPECTED_TAB_COUNT)
      expect(settingsPage.firstTabTitleElement.getText()).to.eventually.equal(TAB_TITLE)
    })

    it('cannot see the "Commissions" box on the home page', () => {
      const homePage = new HomePage()
      const UNWANTED_TITLE = 'TOTAL COMMISSION'

      browser.get('/agency/en/504/')
      LoginPage.waitForLoader()
      expect(homePage.secondBoxTitleElement.getText()).to.eventually.not.equal(UNWANTED_TITLE)
    })
  })

  describe('admins', () => { // being changed, don't fix
    before(() => {
      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()
    })

    beforeEach(() => {
      browser.get(constants.LEGACY_URL_SETTINGS_PERSONAL_TAB)
      LoginPage.waitForLoader()
      SettingsPage.waitForGhostTab()
    })

    after(() => {
      browser.driver.manage().deleteAllCookies()
    })

    it('can see all the tabs', () => {
      const EXPECTED_TAB_COUNT = 5
      LoginPage.waitForLoader()
      SettingsPage.waitForGhostTab()
      const settingsPage = new SettingsPage()
      expect(settingsPage.tabs.count()).to.eventually.be.at.least(EXPECTED_TAB_COUNT)
    })

    it('can invite a new team member', () => {
      const settingsPage = new SettingsPage()
      const teamTab = new settingsPage.TeamTab()
      const manageMembersArea = new teamTab.ManageMembersArea()

      const FIRST_NAME = 'Aaathur'
      const LAST_NAME = 'Dent'
      const EMAIL = `${uuid.v4()}@earth.io`
      const ROLE = 'Admin'

      // increment slots
      // const paymentTab = new settingsPage.PaymentTab()
      // settingsPage.goToPaymentTab()
      // paymentTab.clickChangeUsersAndSubscriptionButton()
      // paymentTab.clickIncrementButton()
      // paymentTab.clickChangeSubscriptionButton()
      // paymentTab.clickOkButton()

      settingsPage.goToTeamTab()
      teamTab.inviteNewTeamMember(FIRST_NAME, LAST_NAME, EMAIL, ROLE)
      expect(manageMembersArea.firstMemberNameElement.getText()).to.eventually.equal(`${FIRST_NAME} ${LAST_NAME}`)
    })
  })

  // being changed, don't fix
  describe.skip('user slots', () => {
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
    before(() => {
      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
      LoginPage.waitForLoader()
    })

    beforeEach(() => {
      browser.get(constants.LEGACY_URL_SETTINGS_PERSONAL_TAB)
      const settingsPage = new SettingsPage()
      settingsPage.goToCompanyTab()
    })

    after(() => {
      browser.driver.manage().deleteAllCookies()
    })

    it('manually adds an exchange rate', () => {
      const RATE = 1

      const settingsPage = new SettingsPage()
      const companyTab = new settingsPage.CompanyTab()
      const currencySettingsArea = new companyTab.CurrencySettingsArea()
      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSetRatesButton()
      currencySettingsArea.inputRateIntoFirstField(RATE)
      currencySettingsArea.removeIntercomButton()
      currencySettingsArea.clickInModalSaveButton()

      expect(settingsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('changes the quoted amount according to manually set rates', () => {
      const EXCHANGE_RATE = 0.00001
      const EXPECTED_MAX = 10.01 // is sufficient unless multi million CAD quote

      const settingsPage = new SettingsPage()
      const companyTab = new settingsPage.CompanyTab()
      const currencySettingsArea = new companyTab.CurrencySettingsArea()
      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSetRatesButton()
      currencySettingsArea.inputRateIntoFiftySeventhField(EXCHANGE_RATE)
      currencySettingsArea.removeIntercomButton()
      currencySettingsArea.clickInModalSaveButton()

      currencySettingsArea.clickManuallySetRadio()
      currencySettingsArea.clickSaveButton() // because quirky design

      const agencyNav = new AgencyNav()
      agencyNav.goToQuotes()
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()

      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.inputNameSearch()
      quotesEditPage.confirmChangeContinueButton.click()
      quotesEditPage.selectCurrencyFromDropdown()

      quotesEditPage.totalInCustomCurrency.getText()
        .then((text) => {
          let amountText = text.replace(/[^0-9\.]/g, '')
          expect(+amountText).to.be.at.most(EXPECTED_MAX)

          browser.get(constants.LEGACY_URL_SETTINGS_COMPANY_TAB)
          LoginPage.waitForLoader()
          currencySettingsArea.clickAutomaticallySetRadio()
          currencySettingsArea.clickSaveButton()
        })
    })
  })

  describe('tier: Platform', () => {
    before(() => {
      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()
    })

    beforeEach(() => {
      browser.get(constants.PLATFORM_URL_SETTINGS_PERSONAL_TAB)
      LoginPage.waitForLoader()
    })

    after(() => {
      browser.driver.manage().deleteAllCookies()
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

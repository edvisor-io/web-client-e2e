import SettingsPage from './settings.pageObject'
import constants from '../../shared/constants'
import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import uuid from 'node-uuid'

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

  describe('user slots maxed out', () => {
    it('should not allow new TeamTab invites before adding in PaymentTab', () => {
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

          settingsPage.goToPaymentTab()
          let paymentTab = new settingsPage.PaymentTab()
          paymentTab.clickChangeUsersAndSubscriptionButton()
        })
    })

    it('should not allow new TeamTab invites before removing existing members', () => {

    })
  })

  // it('should increase slots in TeamTab when added in PaymentTab', () => {
  //   let loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   let agencyNav = new AgencyNav()
  //   agencyNav.goToSettings()
  //
  //   let settingsPage = new SettingsPage()
  //   settingsPage.goToTeamTab()
  //   let teamTab = new settingsPage.TeamTab()
  //   let inviteArea = new teamTab.InviteArea()
  //   inviteArea.slotsElement.getText()
  //     .then(function(originalText) {
  //       var originalMaxSlots = originalText.match(/\d+/g)[1]
  //
  //       settingsPage.goToPaymentTab()
  //       let paymentTab = new settingsPage.PaymentTab()
  //       paymentTab.clickChangeUsersAndSubscriptionButton()
  //       paymentTab.clickIncrementButton()
  //       paymentTab.clickChangeSubscriptionButton()
  //       paymentTab.clickOkButton()
  //
  //       settingsPage.goToTeamTab()
  //       inviteArea.slotsElement.getText()
  //         .then(function(newText) {
  //           var newMaxSlots = newText.match(/\d+/g)[1]
  //
  //           expect(+newMaxSlots).to.equal(+originalMaxSlots + 1)
  //         })
  //     })
  // })
  //
  // it('should manually add a currency exchange rate', () => {
  //   const RATE = 1
  //
  //   let loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   let agencyNav = new AgencyNav()
  //   agencyNav.goToSettings()
  //
  //   let settingsPage = new SettingsPage()
  //   settingsPage.goToCompanyTab()
  //
  //   let companyTab = new settingsPage.CompanyTab()
  //   let currencySettingsArea = new companyTab.CurrencySettingsArea()
  //   currencySettingsArea.clickManuallySetRadio()
  //   currencySettingsArea.clickSetRatesButton()
  //   currencySettingsArea.inputRate(RATE)
  //   currencySettingsArea.clickSaveButton()
  //
  //   expect(settingsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  // })
  //
  // describe('Sales reps', () => {
  //   beforeEach(() => {
  //     let loginPage = new LoginPage()
  //     loginPage.login(constants.SALES_REP_EMAIL, constants.SALES_REP_PASS)
  //     LoginPage.waitForLoader()
  //
  //     let agencyNav = new AgencyNav()
  //     agencyNav.goToSettings()
  //   })
  //
  //   it('can only see "Personal" tab under settings', () => {
  //     var tabTitle = 'Personal'
  //     var tabCount = 1
  //     var settingsPage = new SettingsPage()
  //     var tabTitleElement = settingsPage.tabs.get(0).all(by.css('span')).get(0)
  //
  //     expect(settingsPage.tabs.count()).to.eventually.equal(tabCount)
  //     expect(tabTitleElement.getText()).to.eventually.equal(tabTitle)
  //   })
  // })
  //
  // describe('Admins', () => {
  //   beforeEach(() => {
  //     let loginPage = new LoginPage()
  //     loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //     LoginPage.waitForLoader()
  //
  //     let agencyNav = new AgencyNav()
  //     agencyNav.goToSettings()
  //     SettingsPage.waitForGhostTab()
  //   })
  //
  //   it('can see all the tabs', () => {
  //     var settingsPage = new SettingsPage()
  //     var allTabCount = 5
  //
  //     expect(settingsPage.tabs.count()).to.eventually.be.at.least(allTabCount)
  //   })
  //
  //   it('can invite a new team member', () => {
  //     const firstname = 'NewTeamMember'
  //     const lastname = 'Lastname'
  //     const email = `${uuid.v4()}@test.io`
  //     const role = 'Manager'
  //
  //     var settingsPage = new SettingsPage()
  //     settingsPage.goToTeamTab()
  //
  //     var teamTab = new settingsPage.TeamTab()
  //     var inviteArea = new teamTab.InviteArea()
  //
  //     inviteArea.invite(firstname, lastname, email, role)
  //
  //     var manageMembers = new teamTab.ManageMembers()
  //
  //     var teamMemberCard = new manageMembers.TeamMember(manageMembers.managers.last())
  //     expect(teamMemberCard.name.getText()).to.eventually.equal(`${firstname} ${lastname}`)
  //   })
  // })
})

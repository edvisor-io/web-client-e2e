import AgenciesPage from './agencies.pageObject'
import SchoolNav from '../nav.pageObject'
import AgencyNav from '../../agency/nav.pageObject'
import SchoolsListingPage from '../../agency/schools/listing.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import NotificationArea from '../../shared/pages/notification.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the agencies page', () => {
  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should invite an agency by email', function() {
    browser.get('/')
    LoginPage.waitForLoader()
    const loginPage = new LoginPage()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)

    const schoolNav = new SchoolNav()
    schoolNav.goToManageAgencies()
    const agenciesPage = new AgenciesPage()
    agenciesPage.clickAddAgencyButton()
    agenciesPage.clickConnectByEmailButton()
    agenciesPage.sendEmail()

    expect(agenciesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  describe.skip('(these can be run once per db-reset)', () => {
    it('(1/2) can invite an agency by ID, which gets notified in-app', () => {
      const ID = `${uuid.v4()}`

      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      const agencyNav = new AgencyNav()
      agencyNav.goToManageSchools()
      const schoolsListingPage = new SchoolsListingPage()
      schoolsListingPage.clickAddSchoolButton()
      schoolsListingPage.inputIntoSetIDField(ID)
      schoolsListingPage.clickSaveButton()

      browser.driver.manage().deleteAllCookies()
      browser.get('/')
      LoginPage.waitForLoader()
      loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      const schoolNav = new SchoolNav()
      schoolNav.goToManageAgencies()
      const agenciesPage = new AgenciesPage()
      agenciesPage.clickAddAgencyButton()
      agenciesPage.inputIntoAddByIDField(ID)
      agenciesPage.clickAddButton()
      expect(agenciesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)

      browser.driver.manage().deleteAllCookies()
      browser.get('/')
      LoginPage.waitForLoader()
      loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      agencyNav.goToManageSchools()
      expect(schoolsListingPage.requestsAlert.isPresent()).to.eventually.equal(true)
    })

    it('(2/2) ...agency can accept the invitation, which gets notified in-app', () => {
      browser.get('/')
      LoginPage.waitForLoader()
      const loginPage = new LoginPage()
      loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      const agencyNav = new AgencyNav()
      agencyNav.goToManageSchools()
      const schoolsListingPage = new SchoolsListingPage()
      schoolsListingPage.clickAddSchoolButton()
      schoolsListingPage.clickFirstIncomingRequestAcceptButton()

      browser.driver.manage().deleteAllCookies()
      browser.get('/')
      LoginPage.waitForLoader()
      loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)
      LoginPage.waitForLoader()

      const notificationArea = new NotificationArea()
      notificationArea.clickNotificationToggle()
      expect(notificationArea.notificationItems.count()).to.eventually.be.at.least(1)
    })
  })
})

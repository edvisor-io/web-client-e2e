import SettingsPage from './settings.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import SchoolNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the school app settings page', () => {
  before(() => {
    browser.get('/')
    LoginPage.waitForLoader()
    const loginPage = new LoginPage()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)
    LoginPage.waitForLoader()
  })

  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  describe('campus tab', () => {
    beforeEach(() => {
      browser.get('/')
      LoginPage.waitForLoader()

      const schoolNav = new SchoolNav()
      schoolNav.goToSettings()
      const settingsPage = new SettingsPage()
      settingsPage.goToCampusTab()
    })

    it('should duplicate a campus', () => {
      const CAMPUS_NAME = `${uuid.v4()}`

      const settingsPage = new SettingsPage()
      const campusTab = new settingsPage.CampusTab()
      campusTab.duplicateCampus(CAMPUS_NAME)

      campusTab.clickSelectCampusDropdown()
      expect(campusTab.lastItemInDropdown.getText()).to.eventually.equal(CAMPUS_NAME)
    })

    it('should create a campus profile', () => {
      const CAMPUS_NAME = `${uuid.v4()}`

      const settingsPage = new SettingsPage()
      const campusTab = new settingsPage.CampusTab()
      campusTab.createANewCampus(CAMPUS_NAME)

      campusTab.clickSelectCampusDropdown()
      expect(campusTab.lastItemInDropdown.getText()).to.eventually.equal(CAMPUS_NAME)
    })
  })
})

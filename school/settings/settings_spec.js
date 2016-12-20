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

  describe('navigation', () => {
    it('goes to campus tab', () => {
      browser.get('/')
      LoginPage.waitForLoader()

      const schoolNav = new SchoolNav()
      schoolNav.goToSettings()
      const settingsPage = new SettingsPage()
      settingsPage.goToCampusTab()
      expect(browser.getCurrentUrl()).to.eventually.match(constants.SCHOOL_URL_REGEX_SETTINGS_CAMPUS_TAB)
    })
  })

  describe('campus tab', () => {
    beforeEach(() => {
      browser.get(constants.SCHOOL_URL_SETTINGS_CAMPUS_TAB)
      LoginPage.waitForLoader()
    })

    it('should duplicate a campus', () => {
      const CAMPUS_NAME = `${uuid.v4()}`

      const settingsPage = new SettingsPage()
      const campusTabArea = new settingsPage.CampusTabArea()
      campusTabArea.duplicateCampus(CAMPUS_NAME)

      campusTabArea.clickSelectCampusDropdown()
      expect(campusTabArea.lastItemInDropdown.getText()).to.eventually.equal(CAMPUS_NAME)
    })

    it('should create a campus profile', () => {
      const CAMPUS_NAME = `${uuid.v4()}`

      const settingsPage = new SettingsPage()
      const campusTabArea = new settingsPage.CampusTabArea()
      campusTabArea.createANewCampus(CAMPUS_NAME)

      campusTabArea.clickSelectCampusDropdown()
      expect(campusTabArea.lastItemInDropdown.getText()).to.eventually.equal(CAMPUS_NAME)
    })
  })
})

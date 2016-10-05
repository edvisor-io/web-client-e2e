import AgenciesPage from './agencies.pageObject'
import SchoolNav from '../nav.pageObject'
import AgencyNav from '../../agency/nav.pageObject'
import SchoolsPage from '../../agency/schools/listing.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the agencies page', () => {
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

  it('should invite an agency by ID', () => {
    const ID = `${uuid.v4()}`

    browser.get('/')
    LoginPage.waitForLoader()
    const loginPage = new LoginPage()
    loginPage.login(constants.PLATFORM_ADMIN_EMAIL, constants.PASSWORD)
    LoginPage.waitForLoader()

    const agencyNav = new AgencyNav()
    agencyNav.goToManageSchools()
    const schoolsPage = new SchoolsPage()
    schoolsPage.clickAddSchoolButton()
    schoolsPage.inputIntoSetIDField(ID)
    schoolsPage.clickSaveButton()

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
  })
})

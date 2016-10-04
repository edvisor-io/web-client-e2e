import SchoolsListingPage from './listing.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the schools listing page', () => {
  it('should invite a school by email', () => {
    browser.get('/')
    LoginPage.waitForLoader()

    const loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    const agencyNav = new AgencyNav()
    agencyNav.goToManageSchools()

    const schoolsListingPage = new SchoolsListingPage()
    schoolsListingPage.clickAddSchoolButton()
    schoolsListingPage.clickConnectByEmailButton()
    schoolsListingPage.sendEmail()

    expect(schoolsListingPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })
})

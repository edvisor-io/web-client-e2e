import AgenciesPage from './agencies.pageObject'
import SchoolNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the agencies page', () => {
  it('should invite an agency by email', function() {
    this.retries(3)
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
})

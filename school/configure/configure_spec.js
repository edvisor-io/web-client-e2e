import ConfigurePage from './configure.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import SchoolNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the configure page', () => {
  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a fee', () => {
    const FEE_NAME = `${uuid.v4()}`

    browser.get('/')
    LoginPage.waitForLoader()
    const loginPage = new LoginPage()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)

    const schoolNav = new SchoolNav()
    schoolNav.goToFees()

    const configurePage = new ConfigurePage()
    const feesPage = new configurePage.FeesPage()
    feesPage.createNewFee(FEE_NAME)
    feesPage.goToFeesListing()

    expect(feesPage.lastFeeNameInList.getText()).to.eventually.equal(FEE_NAME)
  })
})

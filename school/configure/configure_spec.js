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
    browser.get('/school/en/166/configure/fee/listing')
    LoginPage.waitForLoader()
    const configurePage = new ConfigurePage()
    const configureFeesPage = new configurePage.ConfigureFeesPage()
    configureFeesPage.sortByFeeName()
    configureFeesPage.deleteFirstFee() // to make sure created fee is always first after sorting
    browser.driver.manage().deleteAllCookies()
  })

  it('creates a fee', () => {
    const FEE_NAME = `0a-${uuid.v4()}`
    const loginPage = new LoginPage()
    const schoolNav = new SchoolNav()
    const configurePage = new ConfigurePage()
    const configureFeesPage = new configurePage.ConfigureFeesPage()

    browser.get('/')
    LoginPage.waitForLoader()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)

    schoolNav.goToFees()
    configureFeesPage.createNewFee(FEE_NAME)
    configureFeesPage.goToFeesListing()
    configureFeesPage.sortByFeeName()
    browser.wait(protractor.ExpectedConditions.visibilityOf(configureFeesPage.firstFeeNameInList), constants.TIMEOUT_TIME)
    expect(configureFeesPage.firstFeeNameInList.getText()).to.eventually.equal(FEE_NAME)
  })
})

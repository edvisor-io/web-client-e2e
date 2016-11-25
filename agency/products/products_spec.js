import ProductsPage from './products.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the agency products page', () => {
  before(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    const loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()
  })

  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
  })

  it('should create a new accommodation', () => {
    const agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickAccommodationsButton()

    const productsPage = new ProductsPage()
    const accommodationsPage = new productsPage.AccommodationsPage()
    accommodationsPage.createNewAccommodation()

    expect(accommodationsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should create a new addon', () => {
    const agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickAddonsButton()

    const productsPage = new ProductsPage()
    const addonsPage = new productsPage.AddonsPage()
    addonsPage.createNewAddon()

    expect(addonsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should create a new fee', () => {
    const agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickFeesButton()

    const productsPage = new ProductsPage()
    const feesPage = new productsPage.FeesPage()
    feesPage.createNewFee()

    expect(feesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should create a new promotion', () => {
    const agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickPromotionsButton()

    const productsPage = new ProductsPage()
    const promotionsPage = new productsPage.PromotionsPage()
    promotionsPage.createNewPromotion()

    expect(promotionsPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })
})

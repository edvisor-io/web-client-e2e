import ProductsPage from './products.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

describe('own products and promotions', () => {
  before(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    const loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    const agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickAccommodationsButton()

    const productsPage = new ProductsPage()
    const accommodationsPage = new productsPage.AccommodationsPage()
    accommodationsPage.createNewAccommodation()

    agencyNav.clickAddonsButton()
    const addonsPage = new productsPage.AddonsPage()
    addonsPage.createNewAddon()

    agencyNav.clickFeesButton()
    const feesPage = new productsPage.FeesPage()
    feesPage.createNewFee()

    agencyNav.clickPromotionsButton()
    const promotionsPage = new productsPage.PromotionsPage()
    promotionsPage.createNewPromotion()
  })

  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
  })
})

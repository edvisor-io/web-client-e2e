import ProductsPage from './products.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../shared/pages/login.pageObject'
import constants from '../../shared/constants'

describe('own products and promotions', () => {
  before(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.openProductsPromotionsButton()
    agencyNav.clickAccommodationsButton()

    let productsPage = new ProductsPage()
    let accommodationsPage = new productsPage.AccommodationsPage()
    accommodationsPage.createNewAccommodation()

    agencyNav.clickAddonsButton()
    let addonsPage = new productsPage.AddonsPage()
    addonsPage.createNewAddon()

    agencyNav.clickFeesButton()
    let feesPage = new productsPage.FeesPage()
    feesPage.createNewFee()

    agencyNav.clickPromotionsButton()
    let promotionsPage = new productsPage.PromotionsPage()
    promotionsPage.createNewPromotion()
  })

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()
  })

  it('should add accommodations to a quote', () => {
    browser.sleep(5000)
  })
})

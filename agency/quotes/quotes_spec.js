import QuotesPage from './quotes.pageObject'
import CoursesPage from '../courses/courses.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../shared/pages/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

var expect = chai.expect
chai.use(chaiAsPromised)

describe('the quotes page', () => {
  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  // it('should create a new quote', () => {
  //   const SEARCH_TERM = 'Alex'
  //
  //   let quotesPage = new QuotesPage()
  //   let quotesListPage = new quotesPage.QuotesListPage()
  //   quotesListPage.clickNewButton()
  //
  //   let coursesPage = new CoursesPage()
  //   coursesPage.doBasicSearch()
  //   coursesPage.selectFirstResultCheckbox()
  //   coursesPage.clickStartQuoteButton()
  //   quotesPage.inputNameSearch(SEARCH_TERM)
  //   quotesPage.clickSaveButton()
  //
  //   expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  // })

  it('should add accommodation with start plus end dates to a quote', () => {
    const SEARCH_TERM = 'Alex'

    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()
    quotesPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    // remove when 'back' bug is fixed
    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()

    quotesListingPage.clickFirstQuote()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.clickFirstOptionEditButton()
    let quotesOptionEditPage = new quotesEditPage.QuotesOptionEditPage()
    quotesOptionEditPage.clickAccommodationCheckbox()
    quotesOptionEditPage.clickSchoolAccommodationButton()
    quotesOptionEditPage.clickFirstAccommodationRadioButton()
    expect(quotesOptionEditPage.accommodationStartDateField.isPresent()).to.eventually.equal(true)
    quotesOptionEditPage.clickSaveChangesButton()
    expect(quotesEditPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })
})

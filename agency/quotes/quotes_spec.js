import QuotesPage from './quotes.pageObject'
import CoursesPage from '../courses/courses.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../shared/pages/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

var expect = chai.expect
chai.use(chaiAsPromised)

beforeEach(() => {
  browser.get('/')
  LoginPage.waitForLoader()
})

describe('the quotes page', () => {
  beforeEach(() => {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a new quote', () => {
    const SEARCH_TERM = 'Alex'

    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should add accommodation with start plus end dates to a quote', () => {
    const SEARCH_TERM = 'Alex'

    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    // remove when 'back' bug is fixed
    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()

    quotesListingPage.clickFirstQuote()
    quotesEditPage.clickFirstOptionEditButton()
    let quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
    quotesOptionEditPage.clickAccommodationCheckbox()
    quotesOptionEditPage.clickSchoolAccommodationButton()
    quotesOptionEditPage.clickFirstAccommodationRadioButton()
    expect(quotesOptionEditPage.accommodationStartDateField.isPresent()).to.eventually.equal(true)
    quotesOptionEditPage.clickSaveChangesButton()
    expect(quotesEditPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should email a quote to a student', () => {
    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickFirstQuote()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.clickEmailToStudentButton()
    let emailQuoteModal = new quotesEditPage.EmailQuoteModal()
    emailQuoteModal.clickSendButton()
    expect(quotesEditPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should add an insurance addon with start plus end dates to a quote', () => {
    const SEARCH_TERM = 'Alex'

    let quotesPage = new QuotesPage()
    let quotesListingPage = new quotesPage.QuotesListingPage()
    quotesListingPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    // remove when 'back' bug is fixed
    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()

    quotesListingPage.clickFirstQuote()
    quotesEditPage.clickFirstOptionEditButton()
    let quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
    quotesOptionEditPage.clickAddAddonsButton()
    quotesOptionEditPage.clickSecondCheckbox()
    expect(quotesOptionEditPage.addonsStartDateField.isPresent()).to.eventually.equal(true)
    quotesOptionEditPage.clickSaveButton()
    expect(quotesOptionEditPage.durationFields.isPresent()).to.eventually.equal(true)
  })
})

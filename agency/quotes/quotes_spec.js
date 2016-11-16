import QuotesPage from './quotes.pageObject'
import CoursesPage from '../courses/courses.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const {expect} = chai
chai.use(chaiAsPromised)

describe('the quotes page', () => {
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

  describe('navigation', () => {
    it('goes from login', () => {
      browser.get('/')
      LoginPage.waitForLoader()
      const agencyNav = new AgencyNav()
      agencyNav.goToQuotes()
    })
  })

  describe('temporary grouping', () => {
    it('should email a quote to a student', () => {
      browser.get('/agency/en/504/student-quote/listing')
      LoginPage.waitForLoader()
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickFirstQuote()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.clickEmailToStudentButton()
      const emailQuoteModal = new quotesEditPage.EmailQuoteModal()
      emailQuoteModal.clickSendButton()
      expect(quotesEditPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe('new quotes', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student-quote/listing')
      LoginPage.waitForLoader()
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()
    })

    it('should create a new quote', () => {
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()

      expect(quotesEditPage.nameSearch.isPresent()).to.eventually.equal(true)
    })

    it('should save a new quote', () => {
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.saveQuote()
      expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('should add an insurance addon with start plus end dates to a quote', () => {
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.saveQuote()

      const agencyNav = new AgencyNav() // replace when 'back' bug is fixed
      agencyNav.goToQuotes()

      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickFirstQuote()
      quotesEditPage.clickFirstOptionEditButton()
      const quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
      quotesOptionEditPage.clickAddAddonsButton()
      quotesOptionEditPage.clickSecondCheckbox()
      expect(quotesOptionEditPage.addonsStartDateField.isPresent()).to.eventually.equal(true)
      quotesOptionEditPage.clickSaveButton()
      expect(quotesOptionEditPage.durationFields.isPresent()).to.eventually.equal(true)
    })

    it('should add accommodation with start plus end dates to a quote', () => {
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.saveQuote()

      const agencyNav = new AgencyNav() // replace when 'back' bug is fixed
      agencyNav.goToQuotes()

      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickFirstQuote()
      quotesEditPage.clickFirstOptionEditButton()
      const quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
      quotesOptionEditPage.clickAccommodationCheckbox()
      quotesOptionEditPage.clickSchoolAccommodationButton()
      quotesOptionEditPage.clickFirstAccommodationRadioButton()
      expect(quotesOptionEditPage.accommodationStartDateField.isPresent()).to.eventually.equal(true)
      quotesOptionEditPage.clickSaveChangesButton()
      expect(quotesEditPage.alertBoxMessage.isPresent()).to.eventually.equal(true) // deprecated, replace with more specific alert
    })
  })
})

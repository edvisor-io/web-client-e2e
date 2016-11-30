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
      expect(quotesEditPage.alertSuccessMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe('new quotes', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student-quote/listing')
      LoginPage.waitForLoader()
      // const quotesPage = new QuotesPage()
      // const quotesListingPage = new quotesPage.QuotesListingPage()
      // quotesListingPage.clickNewButton()
      // const coursesPage = new CoursesPage()
      // coursesPage.startQuoteUsingBasicSearch()
    })

    it('should create a new quote', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      // const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()

      expect(quotesEditPage.nameSearch.isPresent()).to.eventually.equal(true)
    })

    it('saves a new quote', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()

      quotesListingPage.firstQuoteId.getText()
        .then((text) => {
          var originalFirstQuoteId = text
          quotesListingPage.clickNewButton()
          const coursesPage = new CoursesPage()
          coursesPage.startQuoteUsingBasicSearch()
          // const quotesPage = new QuotesPage()
          // const quotesListingPage = new quotesPage.QuotesListingPage()
          const quotesEditPage = new quotesPage.QuotesEditPage()
          quotesEditPage.saveQuote()
          browser.get('/agency/en/504/student-quote/listing')
          LoginPage.waitForLoader()
          expect(quotesListingPage.firstQuoteId.getText()).to.eventually.not.equal(originalFirstQuoteId)
        })
    })

    it('adds an insurance addon with start plus end dates to a quote', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      // const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.saveQuote()

      const agencyNav = new AgencyNav() // replace when 'back' bug is fixed
      agencyNav.goToQuotes()

      // const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickFirstQuote()
      quotesEditPage.clickFirstOptionEditButton()
      const quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
      quotesOptionEditPage.clickAddAddonsButton()
      quotesOptionEditPage.clickSecondCheckbox()
      expect(quotesOptionEditPage.addonsStartDateField.isPresent()).to.eventually.equal(true)
      quotesOptionEditPage.clickSaveButton()
      expect(quotesOptionEditPage.durationFields.isPresent()).to.eventually.equal(true)
    })

    it('adds accommodation with start plus end dates to a quote', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickNewButton()
      const coursesPage = new CoursesPage()
      coursesPage.startQuoteUsingBasicSearch()
      // const quotesPage = new QuotesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      quotesEditPage.saveQuote()

      const agencyNav = new AgencyNav() // replace when 'back' bug is fixed
      agencyNav.goToQuotes()

      // const quotesListingPage = new quotesPage.QuotesListingPage()
      quotesListingPage.clickFirstQuote()
      quotesEditPage.clickFirstOptionEditButton()
      const quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()
      quotesOptionEditPage.clickAccommodationCheckbox()
      quotesOptionEditPage.clickSavedAccommodationButton()
      quotesOptionEditPage.clickFirstAccommodationRadioButton()
      expect(quotesOptionEditPage.accommodationStartDateField.isPresent()).to.eventually.equal(true)
      quotesOptionEditPage.clickSaveChangesButton()
      expect(quotesEditPage.alertSuccessMessage.isDisplayed()).to.eventually.equal(true)
    })

    it('adds a fee', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      const quotesOptionEditPage = new quotesPage.QuotesOptionEditPage()

      quotesListingPage.clickFirstQuote()
      quotesEditPage.clickFirstOptionEditButton()
      quotesOptionEditPage.allFeeRows.count()
        .then((count) => {
          quotesOptionEditPage.addFee()
          quotesEditPage.clickFirstOptionEditButton()
          expect(quotesOptionEditPage.allFeeRows.count()).to.eventually.equal(count + 1)
        })
    })
  })

  describe('external quotes', () => {
    it('displays Price Summary', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      const coursesPage = new CoursesPage()
      quotesListingPage.clickNewButton()

      coursesPage.startQuoteUsingBasicSearch()
      quotesEditPage.saveQuote()
      quotesEditPage.previewQuoteButton.getAttribute('href').then((url) => {
        browser.get(url)
        LoginPage.waitForLoader()
        const quotesExternal = new quotesPage.QuotesExternal()
        expect(quotesExternal.totalRow.isDisplayed()).to.eventually.equal(true)
      })
    })
  })
})

import CoursesPage from './courses.pageObject'
import QuotesPage from '../quotes/quotes.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the find courses page', () => {
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
      agencyNav.goToFindCourses()
      expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\/en\/504\/browse\/search/)
    })
  })

  describe('search function', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_COURSES)
      LoginPage.waitForLoader()
    })

    it('searches by city', () => {
      const coursesPage = new CoursesPage()
      coursesPage.doBasicSearch()

      expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
    })

    it('searches by country', () => {
      const coursesPage = new CoursesPage()
      coursesPage.doBasicSearch('byCountry')

      expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
    })

    it('searches by school', () => {
      const coursesPage = new CoursesPage()
      coursesPage.doBasicSearch('bySchool')

      expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
    })

    it('creates a new quote from a search result', () => {
      const quotesPage = new QuotesPage()
      const quotesListingPage = new quotesPage.QuotesListingPage()
      const agencyNav = new AgencyNav()
      const coursesPage = new CoursesPage()
      const quotesEditPage = new quotesPage.QuotesEditPage()
      agencyNav.goToQuotes()
      browser.wait(protractor.ExpectedConditions.presenceOf(quotesListingPage.firstQuoteId), constants.TIMEOUT_TIME)
      quotesListingPage.firstQuoteId.getText()
      .then((text) => {
        var originalFirstQuoteId = text
        agencyNav.goToFindCourses()
        coursesPage.startQuoteUsingBasicSearch()
        quotesEditPage.saveQuote()
        browser.get(constants.LEGACY_URL_QUOTE_LISTING)
        LoginPage.waitForLoader()
        expect(quotesListingPage.firstQuoteId.getText()).to.eventually.not.equal(originalFirstQuoteId)
      })
    })

    it('search result should have course name, school, intensity, duration, price', () => {
      const coursesPage = new CoursesPage()
      coursesPage.doBasicSearch()

      expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
      expect(coursesPage.firstResultSchool.isPresent()).to.eventually.equal(true)
      expect(coursesPage.firstResultIntensity.isPresent()).to.eventually.equal(true)
      expect(coursesPage.firstResultDuration.isPresent()).to.eventually.equal(true)
      expect(coursesPage.firstResultPrice.isPresent()).to.eventually.equal(true)
    })
  })
})

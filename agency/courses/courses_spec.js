import CoursesPage from './courses.pageObject'
import QuotesPage from '../quotes/quotes.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('find courses page', () => {
  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToFindCourses()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a new quote from a search result', () => {
    const SEARCH_TERM = 'Alex'

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()

    let quotesPage = new QuotesPage()
    let quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('search result should have course name, school, intensity, duration, price', () => {
    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()

    expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
    expect(coursesPage.firstResultSchool.isPresent()).to.eventually.equal(true)
    expect(coursesPage.firstResultIntensity.isPresent()).to.eventually.equal(true)
    expect(coursesPage.firstResultDuration.isPresent()).to.eventually.equal(true)
    expect(coursesPage.firstResultPrice.isPresent()).to.eventually.equal(true)
  })
})

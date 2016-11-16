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

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
    const agencyNav = new AgencyNav()
    agencyNav.goToFindCourses()
  })

  it('should search by city', () => {
    const coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()

    expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
  })

  it('should search by country', () => {
    const coursesPage = new CoursesPage()
    coursesPage.doBasicSearch('byCountry')

    expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
  })

  it('should search by school', () => {
    const coursesPage = new CoursesPage()
    coursesPage.doBasicSearch('bySchool')

    expect(coursesPage.firstResultName.isPresent()).to.eventually.equal(true)
  })

  it('should create a new quote from a search result', () => {
    const coursesPage = new CoursesPage()
    coursesPage.startQuoteUsingBasicSearch()
    const quotesPage = new QuotesPage()
    const quotesEditPage = new quotesPage.QuotesEditPage()
    quotesEditPage.saveQuote()

    expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
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

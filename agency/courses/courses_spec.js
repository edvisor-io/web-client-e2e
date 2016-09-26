import CoursesPage from './courses.pageObject'
import QuotesPage from '../quotes/quotes.pageObject'
import AgencyNav from '../nav.pageObject'
import LoginPage from '../../shared/pages/login.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('find courses page', () => {
  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a new quote from a search result', () => {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToFindCourses()

    let coursesPage = new CoursesPage()
    coursesPage.inputLocation()
    coursesPage.inputDuration()
    coursesPage.setStartDate()
    coursesPage.clickFindCoursesButton()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()

    let quotesPage = new QuotesPage()
    quotesPage.inputNameSearch('Alex')
    quotesPage.clickSaveButton()

    expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })
})

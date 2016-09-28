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
  it('should create a new quote', () => {
    const SEARCH_TERM = 'Alex'
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToQuotes()

    let quotesPage = new QuotesPage()
    quotesPage.clickNewButton()

    let coursesPage = new CoursesPage()
    coursesPage.doBasicSearch()
    coursesPage.selectFirstResultCheckbox()
    coursesPage.clickStartQuoteButton()
    quotesPage.inputNameSearch(SEARCH_TERM)
    quotesPage.clickSaveButton()

    expect(quotesPage.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })
})

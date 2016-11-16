import LoginPage from './login.pageObject'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('the login page', function() {
  beforeEach(() => {
    browser.get('/auth/en/login')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should load the required page elements', () => {
    let loginPage = new LoginPage()
    expect(loginPage.emailField.isPresent()).to.eventually.equal(true)
    expect(loginPage.passwordField.isPresent()).to.eventually.equal(true)
    expect(loginPage.submitBtn.isPresent()).to.eventually.equal(true)
  })

  it('should login successfully', function() {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\//)
  })

  it('should not allow login with wrong credentials', function() {
    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, 'wrong-password')
    expect(browser.getCurrentUrl()).to.eventually.match(/\/auth\/en\/login/)
  })

  it('should be redirected to, if not signed in', () => {
    browser.get('/agency/en/504/student/listing/504')
    LoginPage.waitForLoader()
    expect(browser.getCurrentUrl()).to.eventually.match(/\/auth\/en\/login/)
  })
})

import LoginPage from './login.pageObject.js'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('login page', function() {
  beforeEach(function() {
    browser.get('/auth/en/login')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should load the login page', () => {
    var loginPage = new LoginPage()

    expect(loginPage.emailField.isPresent()).to.eventually.equal(true)
    expect(loginPage.passwordField.isPresent()).to.eventually.equal(true)
    expect(loginPage.submitBtn.isPresent()).to.eventually.equal(true)
  })

  it('should login successfully', function() {
    var loginPage = new LoginPage()

    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\//)
  })

  it('should not login with wrong credentials', function() {
    var loginPage = new LoginPage()

    loginPage.login(constants.ADMIN_EMAIL, 'wrong-password')
    expect(browser.getCurrentUrl()).to.eventually.match(/\/auth\/en\/login/)
  })
})

import ForgotPage from './forgot.pageObject.js'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('the forgot page', function() {
  beforeEach(function() {
    browser.get('/auth/en/forgot')
    ForgotPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should load the required page elements', () => {
    var forgotPage = new ForgotPage()
    expect(forgotPage.emailField.isPresent()).to.eventually.equal(true)
    expect(forgotPage.submitBtn.isPresent()).to.eventually.equal(true)
  })

  it('should not display a message initially', () => {
    var forgotPage = new ForgotPage()
    expect(forgotPage.messageBox.isPresent()).to.eventually.equal(false)
  })

  it('should display message if email is accepted', () => {
    var forgotPage = new ForgotPage()
    forgotPage.send(constants.ADMIN_EMAIL)
    expect(forgotPage.messageBox.isPresent()).to.eventually.equal(true)
  })
})

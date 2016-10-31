import ForgotPage from './forgot.pageObject.js'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the forgot page', function() {
  beforeEach(() => {
    browser.get('/auth/en/forgot')
    ForgotPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should load the required page elements', () => {
    const forgotPage = new ForgotPage()
    expect(forgotPage.emailField.isPresent()).to.eventually.equal(true)
    expect(forgotPage.submitBtn.isPresent()).to.eventually.equal(true)
  })

  it('should not display a message initially', () => {
    const forgotPage = new ForgotPage()
    expect(forgotPage.messageBox.isPresent()).to.eventually.equal(false)
  })

  it('should display message if email is accepted', () => {
    const forgotPage = new ForgotPage()
    forgotPage.requestRecovery(constants.ADMIN_EMAIL)
    browser.sleep(5000)
    expect(forgotPage.messageBox.isPresent()).to.eventually.equal(true)
  })
})

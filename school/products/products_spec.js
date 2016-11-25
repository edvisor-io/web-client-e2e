import ProductsPage from './products.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import SchoolNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the school products page', () => {
  after(() => {
    browser.driver.manage().deleteAllCookies()
  })
  it('should create a course', () => {
    const COURSE_NAME = `${uuid.v4()}`

    browser.get('/')
    LoginPage.waitForLoader()
    const loginPage = new LoginPage()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)
    LoginPage.waitForLoader()

    const schoolNav = new SchoolNav()
    schoolNav.goToProductsAndAddons()
    const productsPage = new ProductsPage()
    productsPage.createNewCourse(COURSE_NAME)

    const coursePage = new productsPage.CoursePage()
    coursePage.clickBackToCoursesButton()
    expect(productsPage.lastCourseInList.getText()).to.eventually.equal(COURSE_NAME)
  })
})

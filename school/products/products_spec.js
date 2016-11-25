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
    browser.get('/')
    LoginPage.waitForLoader()
    const schoolNav = new SchoolNav()
    schoolNav.goToProductsAndAddons()
    const productsPage = new ProductsPage()
    productsPage.sortByCourseName()
    productsPage.deleteFirstCourse() // to make sure created course is always first after sorting
    browser.driver.manage().deleteAllCookies()
  })

  it('creates a course', () => {
    const COURSE_NAME = `0a-${uuid.v4()}`
    const loginPage = new LoginPage()
    const schoolNav = new SchoolNav()
    const productsPage = new ProductsPage()
    const coursePage = new productsPage.CoursePage()

    browser.get('/')
    LoginPage.waitForLoader()
    loginPage.login(constants.SCHOOL_EMAIL, constants.PASSWORD)
    LoginPage.waitForLoader()

    schoolNav.goToProductsAndAddons()
    productsPage.createNewCourse(COURSE_NAME)
    coursePage.clickBackToCoursesButton()
    productsPage.sortByCourseName()
    expect(productsPage.firstCourseInList.getText()).to.eventually.equal(COURSE_NAME)
  })
})

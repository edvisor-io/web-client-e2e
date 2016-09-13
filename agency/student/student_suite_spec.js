import LoginPage from '../../shared/pages/login'
import {AgencyNav} from '../../shared/pages/nav'
import StudentListingPage from './student_listing.pageObject'
import StudentProfilePage from './student_profile.pageObject'
import constants from '../../shared/constants'
import Widgets from '../../shared/widgets'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('student suite', () => {
  beforeEach(() => {
    browser.get('/agency/en/504/student/listing/504')
    LoginPage.waitForLoader()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  // it('should redirect to auth app login page if not signed in', () => {
  //   expect(browser.getCurrentUrl()).to.eventually.match(/\/auth\/en\/login/)
  // })
  //
  // it('should create a new student successfully', () => {
  //   var assignedTo = 'Shelley Chen'
  //   var firstname = 'firstname'
  //   var lastname = 'lastname'
  //   var email = uuid.v4() + '@email.com'
  //   var nationality = 'Canada'
  //
  //   var loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   var agencyNav = new AgencyNav()
  //   agencyNav.goToStudents()
  //
  //   StudentListingPage.openAddStudentModal()
  //   StudentListingPage.addStudent(assignedTo, firstname, lastname, email, nationality)
  //
  //   var studentProfile = new StudentProfilePage()
  //   expect(studentProfile.assignedToLabel.getText()).to.eventually.equal(assignedTo)
  //   expect(studentProfile.firstnameField.getAttribute('value')).to.eventually.equal(firstname)
  //   expect(studentProfile.lastnameField.getAttribute('value')).to.eventually.equal(lastname)
  //   expect(studentProfile.emailField.getAttribute('value')).to.eventually.equal(email)
  //   expect(Widgets.getChosenValue(studentProfile.nationalityField)).to.eventually.equal(nationality)
  // })
  //
  // it('should not be able to create a student with the same email', () => {
  //   var assignedTo = 'Shelley Chen'
  //   var firstname = 'Zaphod'
  //   var lastname = 'Beeblebrox'
  //   var email = uuid.v4() + '@betelgeuse.com'
  //   var nationality = 'United Kingdom'
  //
  //   var loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   var agencyNav = new AgencyNav()
  //   agencyNav.goToStudents()
  //
  //   StudentListingPage.openAddStudentModal()
  //   StudentListingPage.addStudent(assignedTo, firstname, lastname, email, nationality)
  //
  //   agencyNav.goToStudents()
  //   StudentListingPage.openAddStudentModal()
  //   StudentListingPage.addStudent(assignedTo, firstname, lastname, email, nationality)
  //   var studentListing = new StudentListingPage()
  //   expect(studentListing.nopeAlert.getText()).to.eventually.equal('A student with this email already exists in your company.  ')
  // })
//
  // it('should show not show a name, email and office without a search term', () => {
  //   let loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   let agencyNav = new AgencyNav()
  //   agencyNav.goToStudents()
  //
  //   StudentListingPage.openSearchModal()
  //
  //   let studentListing = new StudentListingPage()
  //   expect(studentListing.searchResultName.isPresent()).to.eventually.equal(false)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
  // })
  //
  // it('should show a name, email and office on search by student name', () => {
  //   let searchTerm = 'Zaphod'
  //
  //   let loginPage = new LoginPage()
  //   loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
  //   LoginPage.waitForLoader()
  //
  //   let agencyNav = new AgencyNav()
  //   agencyNav.goToStudents()
  //
  //   StudentListingPage.openSearchModal()
  //   StudentListingPage.inputSearchTerm(searchTerm)
  //
  //   let studentListing = new StudentListingPage()
  //   expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  // })

  it('should show a name, email and office on search by secondary contact', () => {
    let searchTerm = 'Prefect'

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToStudents()

    StudentListingPage.openSearchModal()
    StudentListingPage.chooseBySecondaryContact()
    let studentListing = new StudentListingPage()
    Widgets.clickUiSelect(studentListing.uiSelectContainer)
    StudentListingPage.inputSearchTerm(searchTerm)

    // let studentListing = new StudentListingPage()
    expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
    expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
    expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  })

  // it('should login successfully', function() {
  //   var loginPage = new LoginPage(
  //     element(by.css('input[name="email"]')),
  //     element(by.css('input[name="password"]')),
  //     element(by.css('button[type="submit"]'))
  //   )

  //   loginPage.login('austin@edvisor.io', 'password')
  //   expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\//)
  // })

  // it('should not login with wrong credentials', function() {
  //   var loginPage = new LoginPage(
  //     element(by.css('input[name="email"]')),
  //     element(by.css('input[name="password"]')),
  //     element(by.css('button[type="submit"]'))
  //   )

  //   loginPage.login('austin@edvisor.io', 'wrong-password')
  //   expect(browser.getCurrentUrl()).to.eventually.match(/\/auth\/en\/login/)
  // })
})

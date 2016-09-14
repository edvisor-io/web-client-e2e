import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import StudentListingPage from './student_listing.pageObject'
import StudentProfilePage from './student_profile.pageObject'
import constants from '../../shared/constants'

import Widgets from '../../shared/widgets'
import {ChosenWidget} from '../../shared/widgets'

Widgets.getChosenContainer
Widgets.clickUiSelect

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
var expect = chai.expect

const ASSIGNED_TO = 'Shelley Chen'
const FIRST_NAME = 'Tricia'
const LAST_NAME = 'McMillan'
const STUDENT_NAME = 'Zaphod'
const SECONDARY_CONTACT = 'Prefect'
const AT_EMAIL_DOMAIN = '@betelgeuse.com'
const NATIONALITY = 'United Kingdom'

describe('the student listing page', () => {

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    let loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    let agencyNav = new AgencyNav()
    agencyNav.goToStudents()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a new student successfully', () => {
    let email = uuid.v4() + AT_EMAIL_DOMAIN

    let studentListing = new StudentListingPage()
    studentListing.openAddStudentModal()
    StudentListingPage.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    let studentProfile = new StudentProfilePage()
    expect(studentProfile.assignedToLabel.getText()).to.eventually.equal(ASSIGNED_TO)
    expect(studentProfile.firstnameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
    expect(studentProfile.lastnameField.getAttribute('value')).to.eventually.equal(LAST_NAME)
    expect(studentProfile.emailField.getAttribute('value')).to.eventually.equal(email)
    expect(Widgets.getChosenValue(studentProfile.nationalityField)).to.eventually.equal(NATIONALITY)
  })
  //
  // it('should not be able to create a student with the same email', () => {
  //   let email = uuid.v4() + AT_EMAIL_DOMAIN
  //   let errorMsg = 'A student with this email already exists in your company.  '
  //
  //   StudentListingPage.openAddStudentModal()
  //   StudentListingPage.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)
  //
  //   let agencyNav = new AgencyNav()
  //   agencyNav.goToStudents()
  //   StudentListingPage.openAddStudentModal()
  //   StudentListingPage.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)
  //
  //   let studentListing = new StudentListingPage()
  //   expect(studentListing.nopeAlert.getText()).to.eventually.equal(errorMsg)
  // })
  //
  // it('should not show a name, email and office without a search term', () => {
  //   StudentListingPage.openSearchBar()
  //   StudentListingPage.inputSearchTerm('')
  //
  //   let studentListing = new StudentListingPage()
  //   expect(studentListing.searchResultName.isPresent()).to.eventually.equal(false)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
  // })
  //
  // it('should show a name, email and office on search by student name', () => {
  //   StudentListingPage.openSearchBar()
  //   StudentListingPage.inputSearchTerm(STUDENT_NAME)
  //
  //   let studentListing = new StudentListingPage()
  //   expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  // })
//
  // it('should show a name, email and office on search by secondary contact', () => {
  //   StudentListingPage.openSearchBar()
  //   StudentListingPage.chooseBySecondaryContact()
  //   let studentListing = new StudentListingPage()
  //   Widgets.clickUiSelect(studentListing.searchContainer)
  //   StudentListingPage.inputSearchTerm(SECONDARY_CONTACT)
  //
  //   expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  //   expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
  // })
})

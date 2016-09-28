import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import StudentListingPage from './listing.pageObject'
import StudentProfilePage from './profile.pageObject'
import constants from '../../shared/constants'
import {ChosenWidget} from '../../shared/widgets'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('the student listing page', () => {
  const ASSIGNED_TO = 'Shelley Chen'
  const FIRST_NAME = 'Tricia'
  const LAST_NAME = 'McMillan'
  const AT_EMAIL_DOMAIN = '@betelgeuse.com'
  const NATIONALITY = 'United Kingdom'

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
    const email = uuid.v4() + AT_EMAIL_DOMAIN

    let studentListing = new StudentListingPage()
    studentListing.openAddStudentModal()
    let addStudentModal = new studentListing.AddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    let studentProfile = new StudentProfilePage()
    expect(studentProfile.assignedToLabel.getText()).to.eventually.equal(ASSIGNED_TO)
    expect(studentProfile.firstNameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
    expect(studentProfile.lastNameField.getAttribute('value')).to.eventually.equal(LAST_NAME)
    expect(studentProfile.emailField.getAttribute('value')).to.eventually.equal(email)
    expect(ChosenWidget.getChosenValue(studentProfile.nationalityField)).to.eventually.equal(NATIONALITY)
  })

  it('should not create a student with the same email', () => {
    const email = uuid.v4() + AT_EMAIL_DOMAIN

    let studentListing = new StudentListingPage()
    studentListing.openAddStudentModal()
    let addStudentModal = new studentListing.AddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    let agencyNav = new AgencyNav()
    agencyNav.goToStudents()

    studentListing.openAddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    expect(studentListing.nopeAlert.isPresent()).to.eventually.equal(true)
  })

  describe('search function', () => {
    const SECONDARY_CONTACT = 'Anna Faris'

    beforeEach(() => {
      let studentListing = new StudentListingPage()
      studentListing.openSearchBar()
    })

    it('should not show a name, email and office without a search term', () => {
      let studentListing = new StudentListingPage()
      studentListing.inputSearchTerm('')

      expect(studentListing.searchResultName.isPresent()).to.eventually.equal(false)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(false)
    })

    it('should show a name, email and office on search by student name', () => {
      let studentListing = new StudentListingPage()
      studentListing.inputSearchTerm(FIRST_NAME)

      expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
    })

    it('should show a name, email and office on search by secondary contact', () => {
      let studentListing = new StudentListingPage()
      studentListing.openSearchDropdown()
      studentListing.chooseBySecondaryContact()
      studentListing.focusSearchContainer()
      studentListing.inputSearchTerm(SECONDARY_CONTACT)

      expect(studentListing.searchResultName.isPresent()).to.eventually.equal(true)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
      expect(studentListing.searchResultEmail.isPresent()).to.eventually.equal(true)
    })
  })

  it('should download a file of exported students', () => {
    let studentListing = new StudentListingPage()
    studentListing.clickSelectAllStudentsCheckbox()
    studentListing.clickExportButton()

    expect(studentListing.exportMessage.isPresent()).to.eventually.equal(true)
  })

  it('should show a student profile from the students table', () => {
    let studentListing = new StudentListingPage()
    studentListing.clickFirstStudentInTable()

    let studentProfile = new StudentProfilePage()
    expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  })
})

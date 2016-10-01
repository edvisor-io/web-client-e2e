import StudentListingPage from './listing.pageObject'
import StudentProfilePage from './profile.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import {ChosenWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the student listing page', () => {
  const ASSIGNED_TO = 'Shelley Chen'
  const FIRST_NAME = 'Tricia'
  const LAST_NAME = 'McMillan'
  const AT_EMAIL_DOMAIN = '@betelgeuse.com'
  const NATIONALITY = 'United Kingdom'

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    const loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()

    const agencyNav = new AgencyNav()
    agencyNav.goToStudents()
  })

  afterEach(() => {
    browser.driver.manage().deleteAllCookies()
  })

  it('should create a new student successfully', () => {
    const email = uuid.v4() + AT_EMAIL_DOMAIN

    const studentListing = new StudentListingPage()
    studentListing.openAddStudentModal()
    const addStudentModal = new studentListing.AddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    const studentProfile = new StudentProfilePage()
    expect(studentProfile.assignedToLabel.getText()).to.eventually.equal(ASSIGNED_TO)
    expect(studentProfile.firstNameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
    expect(studentProfile.lastNameField.getAttribute('value')).to.eventually.equal(LAST_NAME)
    expect(studentProfile.emailField.getAttribute('value')).to.eventually.equal(email)
    expect(ChosenWidget.getChosenValue(studentProfile.nationalityField)).to.eventually.equal(NATIONALITY)
  })

  it('should not create a student with the same email', () => {
    const email = uuid.v4() + AT_EMAIL_DOMAIN

    const studentListing = new StudentListingPage()
    studentListing.openAddStudentModal()
    const addStudentModal = new studentListing.AddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    const agencyNav = new AgencyNav()
    agencyNav.goToStudents()

    studentListing.openAddStudentModal()
    addStudentModal.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

    expect(studentListing.nopeAlert.isPresent()).to.eventually.equal(true)
  })
  
  it('should download a file of exported students', () => {
    const studentListing = new StudentListingPage()
    studentListing.clickSelectAllStudentsCheckbox()
    studentListing.clickExportButton()

    expect(studentListing.exportMessage.isPresent()).to.eventually.equal(true)
  })

  it('should show a student profile from the students table', () => {
    const studentListing = new StudentListingPage()
    studentListing.clickFirstStudentInTable()

    const studentProfile = new StudentProfilePage()
    expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  })

  describe('search function', () => {
    const SECONDARY_CONTACT = 'Anna Faris'

    beforeEach(() => {
      const studentListing = new StudentListingPage()
      studentListing.openSearchBar()
    })

    it('should not show a name, email and office without a search term', () => {
      const studentListing = new StudentListingPage()
      const searchBar = new studentListing.SearchBar()
      searchBar.inputSearchTerm('')

      expect(searchBar.searchResultName.isPresent()).to.eventually.equal(false)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(false)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(false)
    })

    it('should show a name, email and office on search by student name', () => {
      const studentListing = new StudentListingPage()
      const searchBar = new studentListing.SearchBar()
      searchBar.inputSearchTerm(FIRST_NAME)

      expect(searchBar.searchResultName.isPresent()).to.eventually.equal(true)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(true)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(true)
    })

    it('should show a name, email and office on search by secondary contact', () => {
      const studentListing = new StudentListingPage()
      const searchBar = new studentListing.SearchBar()
      searchBar.openSearchDropdown()
      searchBar.chooseBySecondaryContact()
      searchBar.focusSearchContainer()
      searchBar.inputSearchTerm(SECONDARY_CONTACT)

      expect(searchBar.searchResultName.isPresent()).to.eventually.equal(true)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(true)
      expect(searchBar.searchResultEmail.isPresent()).to.eventually.equal(true)
    })
  })
})

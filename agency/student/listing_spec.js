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

  before(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    const loginPage = new LoginPage()
    loginPage.login(constants.ADMIN_EMAIL, constants.ADMIN_PASS)
    LoginPage.waitForLoader()
  })

  after(() => {
    browser.driver.manage().deleteAllCookies()
  })

  beforeEach(() => {
    browser.get('/')
    LoginPage.waitForLoader()

    const agencyNav = new AgencyNav()
    agencyNav.goToStudents()
  })

  it('the number of students indicated in the pipeline tab is shown', () => {
    const studentListing = new StudentListingPage()
    studentListing.clickSecondPipelineTab()
    var studentCount
    studentListing.studentCheckboxElements.count()
      .then((count) => {
        studentCount += count
      })
  })

  describe.skip('filters students', () => {
    it('by agents > unassigned', () => {
      const studentListing = new StudentListingPage()
      studentListing.filterByAgentsUnassigned()
      expect(studentListing.alertDanger.isPresent()).to.eventually.equal(false)
    })

    it('by agents > first, archive reasons > finished studying', () => {
      const studentListing = new StudentListingPage()
      studentListing.filterByAgentsFirst()
      expect(studentListing.alertDanger.isPresent()).to.eventually.equal(false)
    })

    it('by custom field', () => {
      const studentListing = new StudentListingPage()
      studentListing.filterByCustomFields()
      expect(studentListing.alertDanger.isPresent()).to.eventually.equal(false)
    })
  })

  describe.skip('temporary grouping', () => {
    it('displays pipeline lists from the tabs hidden by page width', () => {
      const COLOUR_WHEN_ACTIVE = 'rgba(87, 88, 89, 1)'

      const studentListing = new StudentListingPage()
      studentListing.openPipelineTabsOverflowDropdown()
      studentListing.selectLastPipelineTab()
      expect(studentListing.lastPipelineTabTitleSpanElement.getCssValue('color')).to.eventually.equal(COLOUR_WHEN_ACTIVE)
    })

    it('reassigns multiple students to another office', () => {
      const studentListing = new StudentListingPage()
      studentListing.selectViewingAllStudents()
      studentListing.reassignFirstTwoStudents()
      expect(studentListing.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('lists new students in pale yellow', () => {
      const email = uuid.v4() + AT_EMAIL_DOMAIN
      const PALE_YELLOW = 'rgba(252, 248, 240, 1)'

      const studentListing = new StudentListingPage()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      const studentProfile = new StudentProfilePage()
      studentProfile.clickBackToStudentsButton()
      studentListing.selectViewingAllStudents()
      expect(studentListing.firstStudentInTableCheckboxContainer
        .getCssValue('background-color')).to.eventually.equal(PALE_YELLOW)
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
  })

  describe.skip('pipeline tabs', () => {
    it('should switch displayed students pipeline', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondPipelineTab()

      expect(studentListing.firstStudentInTable.isPresent()).to.eventually.equal(true)
    })

    it('should display all students in a pipeline through pagination', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondPipelineTab()

      studentListing.secondPipelineTabCountElement.getText()
      .then((text) => {
        let studentCount = +text
        studentListing.goToLastPageOfTab(studentCount)
        expect(studentListing.currentPageField.getAttribute('value')).to
          .eventually
          .equal((Math.floor(studentListing.calculatePages(studentCount)))
          .toString())
      })
    })
  })

  describe.skip('add student modal', () => {
    it('should create a new student successfully', () => {
      const email = uuid.v4() + AT_EMAIL_DOMAIN

      const studentListing = new StudentListingPage()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

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
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      expect(studentListing.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe.skip('search function', () => {
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
      expect(searchBar.searchResultOffice.isPresent()).to.eventually.equal(true)
    })
  })
})

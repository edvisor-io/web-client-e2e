import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import StudentListingPage from './student_listing.pageObject'
import StudentProfilePage from './student_profile.pageObject'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

const STUDENT_NAME = "Slartibartfast"
const NEW_OFFICE = "Bogotá Office"
const NEW_OWNER = "Shelley Chen"

const TASK_TITLE = "Do a followup call"

var today = new Date()
var dd = today.getDate()
var mm = today.getMonth() + 1
var yyyy = today.getFullYear()

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

today = mm + '-' + dd + '-' + yyyy
console.log(today)

const DUE_TIME = '11:00am'
const ASSIGN_TO = 'Alison Rachuk'

describe('the student profile page', () => {

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

  it('should display a student profile on click of search result', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile = new StudentProfilePage()
    expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  })

  describe('student assignment', () => {
    beforeEach(() => {
      let studentListing = new StudentListingPage()
      studentListing.openSearchBar()
      studentListing.inputSearchTerm(STUDENT_NAME)
      studentListing.clickSearchResult()
    })

    it('should assign a student to an office from profile', () => {
      let studentProfile = new StudentProfilePage()
      studentProfile.clickOverviewChangeOwnerButton()
      studentProfile.setAsNewOffice(NEW_OFFICE)
      // studentProfile.resolveChangeOfficeExceptionModal()

      expect(studentProfile.studentAgencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('should assign a student to an owner', () => {
      let studentProfile = new StudentProfilePage()
      studentProfile.clickOverviewChangeOwnerButton()
      studentProfile.setAsNewOwner(NEW_OWNER)

      expect(studentProfile.studentOwner.getText()).to.eventually.equal(NEW_OWNER)
    })
  })



  it('should assign a student to a pipeline status', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile = new StudentProfilePage()
    studentProfile.clickChangePipelineFirstButton()
    studentProfile.clickChangePipelineStatusRelativeOption()
    studentProfile.clickPipelineStatusSecondRelativeOption()

    expect(studentProfile.firstHeader.getText()).to.eventually.equal("Two")
  })

  it('should assign a student to more than one pipeline', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile = new StudentProfilePage()
    studentProfile.clickChangePipelineFirstButton()
    studentProfile.clickChangePipelineStatusRelativeOption()
    studentProfile.clickPipelineStatusSecondRelativeOption()

    studentProfile.clickChangePipelineSecondButton()
    studentProfile.clickChangePipelineStatusRelativeOption()
    studentProfile.clickPipelineStatusSecondRelativeOption()

    expect(studentProfile.firstHeader.getText()).to.eventually.equal("Two")
    expect(studentProfile.secondHeader.getText()).to.eventually.equal("Deciding")
  })

  it('should assign a student to the next pipeline status when all checklist items are clicked', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile = new StudentProfilePage()
    studentProfile.clickStudentStatusThreeCheckboxes()

    expect(studentProfile.secondHeader.getText()).to.eventually.equal("Client")
  })

  it('should create a task', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile =  new StudentProfilePage()
    studentProfile.addTask(TASK_TITLE, today, DUE_TIME, ASSIGN_TO)

    expect(studentProfile.alertBoxMessage.getText()).to.eventually.equal('Saved  ')
  })
})

import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import StudentListingPage from './student_listing.pageObject'
import StudentProfilePage from './student_profile.pageObject'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

describe('the student profile page', () => {
  const STUDENT_NAME = "Slartibartfast"
  const NEW_OFFICE = "Bogotá Office"
  const NEW_OWNER = "Shelley Chen"

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

  describe('office and owner assignment', () => {
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

      expect(studentProfile.studentAgencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('should assign a student to an owner', () => {
      let studentProfile = new StudentProfilePage()
      studentProfile.clickOverviewChangeOwnerButton()
      studentProfile.setAsNewOwner(NEW_OWNER)

      expect(studentProfile.studentOwner.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe('pipeline assignment', () => {
    beforeEach(() => {
      let studentListing = new StudentListingPage()
      studentListing.openSearchBar()
      studentListing.inputSearchTerm(STUDENT_NAME)
      studentListing.clickSearchResult()
    })

    it('should assign a student to a pipeline status', () => {
      let studentProfile = new StudentProfilePage()
      studentProfile.clickChangePipelineFirstButton()
      studentProfile.clickChangePipelineStatusRelativeOption()
      studentProfile.clickPipelineStatusSecondRelativeOption()

      expect(studentProfile.firstHeader.getText()).to.eventually.equal("Two")
    })

    it('should assign a student to more than one pipeline', () => {
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
      let studentProfile = new StudentProfilePage()
      studentProfile.clickStudentStatusThreeCheckboxes()

      expect(studentProfile.secondHeader.getText()).to.eventually.equal("Client")
    })
  })

  it('should create a task', () => {
    const TASK_TITLE = "Do a followup call"
    const DUE_TIME = '11:00pm'

    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile =  new StudentProfilePage()
    studentProfile.addTask(TASK_TITLE, DUE_TIME)

    expect(studentProfile.alertBoxMessage.getText()).to.eventually.equal('Saved  ')
  })
})

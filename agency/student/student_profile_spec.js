import LoginPage from '../../shared/pages/login.pageObject'
import AgencyNav from '../nav.pageObject'
import StudentListingPage from './student_listing.pageObject'
import StudentProfilePage from './student_profile.pageObject'
import SettingsPage from '../settings/settings.pageObject'
import constants from '../../shared/constants'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
var expect = chai.expect

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
    studentListing.clickFirstStudentInTable()

    let studentProfile = new StudentProfilePage()
    expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  })

  describe('office and owner assignment', () => {
    const NEW_OFFICE = 'Bogotá Office'
    const NEW_OWNER = 'Shelley Chen'

    beforeEach(() => {
      let studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
    })

    it('should assign a student to an office from profile', () => {
      let studentProfile = new StudentProfilePage()
      let assignedToArea = new studentProfile.AssignedToArea()
      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOffice(NEW_OFFICE)
      assignedToArea.clickMoveStudentButton()

      expect(assignedToArea.agencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('should assign a student to an owner', () => {
      let studentProfile = new StudentProfilePage()
      let assignedToArea = new studentProfile.AssignedToArea()
      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOwner(NEW_OWNER)

      expect(assignedToArea.ownerName.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe('pipeline assignment', () => {
    const EXPECTED_STATUS_ONE = 'Deciding'
    const EXPECTED_STATUS_TWO = 'Deciding'

    it('should assign a student to a pipeline status', () => {
      let studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      let studentProfile = new StudentProfilePage()
      let pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickChangePipelineStatusOption()
      pipelineArea.clickPipelineStatusSecondRelativeOption()

      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
    })

    it('should assign a student to more than one pipeline', () => {
      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()

      let settingsPage = new SettingsPage()
      settingsPage.goToAgencyTab()

      let agencyTab = new settingsPage.AgencyTab()
      agencyTab.clickPipelineButton()
      agencyTab.clickDuplicateButton()

      agencyNav.goToStudents()
      let studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      let studentProfile = new StudentProfilePage()
      let pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickChangePipelineStatusOption()
      pipelineArea.clickPipelineStatusSecondRelativeOption()

      pipelineArea.clickAddToAnotherPipelineButton()
      pipelineArea.clickAddToAnotherPipelineFirstOption()
      pipelineArea.clickPipelineStatusesSecondOption()

      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(EXPECTED_STATUS_TWO)
    })

    it('should change to the next status when all checklist items are clicked', () => {
      const NEW_STATUS = 'Client'

      let agencyNav = new AgencyNav()
      agencyNav.goToSettings()

      let settingsPage = new SettingsPage()
      settingsPage.goToAgencyTab()

      let agencyTab = new settingsPage.AgencyTab()
      agencyTab.clickPipelineButton()
      agencyTab.clickDuplicateButton()

      agencyNav.goToStudents()
      let studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      let studentProfile = new StudentProfilePage()
      let pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickAddToAnotherPipelineButton()
      pipelineArea.clickAddToAnotherPipelineFirstOption()
      pipelineArea.clickPipelineStatusesSecondOption()
      pipelineArea.clickDecidingStatusThreeCheckboxes()

      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(NEW_STATUS)
    })
  })

  it('should create a task', () => {
    const TASK_TITLE = 'Do a followup call'
    const DUE_TIME = '11:00pm'

    let studentListing = new StudentListingPage()
    studentListing.clickFirstStudentInTable()

    let studentProfile = new StudentProfilePage()
    studentProfile.addTask(TASK_TITLE, DUE_TIME)

    expect(studentProfile.alertBoxMessage.getText()).to.eventually.equal('Saved  ')
  })
})

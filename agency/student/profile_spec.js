import StudentProfilePage from './profile.pageObject'
import StudentListingPage from './listing.pageObject'
import SettingsPage from '../settings/settings.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the student profile page', () => {
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

  it('should create a task', () => {
    const TASK_TITLE = 'Do a followup call'
    const DUE_TIME = '11:00pm'

    const studentListing = new StudentListingPage()
    studentListing.clickFirstStudentInTable()

    const studentProfile = new StudentProfilePage()
    studentProfile.addTask(TASK_TITLE, DUE_TIME)

    expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
  })

  it('should display a student profile on click of search result', () => {
    const studentListing = new StudentListingPage()
    studentListing.clickFirstStudentInTable()

    const studentProfile = new StudentProfilePage()
    expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  })

  describe('office and owner assignment', () => {
    const NEW_OFFICE = 'Bogotá Office'
    const NEW_OWNER = 'Shelley Chen'

    beforeEach(() => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
    })

    it('should assign a student to an office from profile', () => {
      const studentProfile = new StudentProfilePage()
      const assignedToArea = new studentProfile.AssignedToArea()
      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOffice(NEW_OFFICE)
      assignedToArea.clickMoveStudentButton()

      expect(assignedToArea.agencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('should assign a student to an owner', () => {
      const studentProfile = new StudentProfilePage()
      const assignedToArea = new studentProfile.AssignedToArea()
      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOwner(NEW_OWNER)

      expect(assignedToArea.ownerName.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe('pipeline assignment', () => {
    const EXPECTED_STATUS_ONE = 'Deciding'
    const EXPECTED_STATUS_TWO = 'Deciding'

    it('should assign a student to a pipeline status', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickChangePipelineStatusOption()
      pipelineArea.clickPipelineStatusSecondOption()

      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
    })

    it('should assign a student to more than one pipeline', () => {
      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()

      const settingsPage = new SettingsPage()
      settingsPage.goToAgencyTab()

      const agencyTab = new settingsPage.AgencyTab()
      agencyTab.clickPipelineButton()
      agencyTab.clickDuplicateButton()

      agencyNav.goToStudents()
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickChangePipelineStatusOption()
      pipelineArea.clickPipelineStatusSecondOption()

      pipelineArea.clickAddToAnotherPipelineButton()
      pipelineArea.clickAddToAnotherPipelineFirstOption()
      pipelineArea.clickAddToAnotherPipelineStatusesSecondOption()

      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(EXPECTED_STATUS_TWO)
    })

    it('should change to the next status when all checklist items are clicked', () => {
      const NEW_STATUS = 'Client' // because clickDecidingStatusThreeCheckboxes()

      const agencyNav = new AgencyNav()
      agencyNav.goToSettings()
      SettingsPage.waitForGhostTab()

      const settingsPage = new SettingsPage()
      settingsPage.goToAgencyTab()

      const agencyTab = new settingsPage.AgencyTab()
      agencyTab.clickPipelineButton()
      agencyTab.clickDuplicateButton()

      agencyNav.goToStudents()
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickAddToAnotherPipelineButton()
      pipelineArea.clickAddToAnotherPipelineFirstOption()
      pipelineArea.clickAddToAnotherPipelineStatusesSecondOption()
      pipelineArea.clickDecidingStatusThreeCheckboxes()

      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(NEW_STATUS)
    })
  })
})

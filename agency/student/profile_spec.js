import StudentProfilePage from './profile.pageObject'
import StudentListingPage from './listing.pageObject'
import SettingsPage from '../settings/settings.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai

describe('the student profile page', () => {
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

  describe.skip('recent actitivies', () => {
    it('updates on saved changes to profile', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      if (recentActivitiesArea.showAllActivityButton) {
        recentActivitiesArea.showAllActivityButton.click()
      }
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let currentActivitiesCount = count
        studentProfile.inputFirstName()
        studentProfile.clickSaveButton()
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(currentActivitiesCount + 1)
      })
    })

    it('updates on changes to pipeline area', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      if (recentActivitiesArea.showAllActivityButton) {
        recentActivitiesArea.showAllActivityButton.click()
      }
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let currentActivitiesCount = count
        studentProfile.assignStatusSecondOptionInFirstPipeline()
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(currentActivitiesCount + 1)
      })
    })
  })

  describe.skip('temporary grouping', () => {
    it('creates a student record', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.addRecord()

      expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('adds a secondary contact', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.addSecondaryContact()

      expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })


    it('displays a student profile when one in listing is clicked', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
    })

    it('views and edits an existing student profile', () => {
      const FIRST_NAME = `${uuid.v4()}`
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      studentProfile.inputFirstName(FIRST_NAME)
      studentProfile.clickSaveButton()

      expect(studentProfile.firstNameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
    })
  })

  describe.skip('tasks area', () => {
    it('creates a task', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.addTask()

      expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe.skip('office and owner area', () => {
    const NEW_OFFICE = 'Bogotá Office'
    const NEW_OWNER = 'Shelley Chen'

    beforeEach(() => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
    })

    it('assigns a student to an office from profile', () => {
      const studentProfile = new StudentProfilePage()
      studentProfile.reassignToOffice(NEW_OFFICE)
      const assignedToArea = new studentProfile.AssignedToArea()
      expect(assignedToArea.agencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('assigns a student to an owner', () => {
      const studentProfile = new StudentProfilePage()
      const assignedToArea = new studentProfile.AssignedToArea()
      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOwner(NEW_OWNER)

      expect(assignedToArea.ownerName.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe.skip('pipeline area', () => {
    const EXPECTED_STATUS_ONE = 'Deciding'
    const EXPECTED_STATUS_TWO = 'Deciding'
    const EXPECTED_STATUS_THREE = 'Client'

    it('assigns a student to a pipeline status', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.assignStatusSecondOptionInFirstPipeline()

      const pipelineArea = new studentProfile.PipelineArea()
      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
    })

    it('reassigns a student to a different pipeline status', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.assignStatusSecondOptionInFirstPipeline()
      studentProfile.assignStatusThirdOptionInFirstPipeline()

      const pipelineArea = new studentProfile.PipelineArea()
      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_THREE)
    })

    it('unassigns a student to a pipeline status', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickRemoveFromPipelineOption()
      pipelineArea.clickConfirmRemoveButton()

      expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })

    it('should assign a student to more than one pipeline', () => {
      const settingsPage = new SettingsPage()
      settingsPage.testNeedsDuplicatePipeline()

      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.assignStatusSecondOptionInFirstPipeline()
      const pipelineArea = new studentProfile.PipelineArea()
      studentProfile.assignToNewlyMadePipeline()

      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(EXPECTED_STATUS_TWO)
    })

    it('should change to the next status when all checklist items are clicked', () => {
      const NEW_STATUS = 'Client' // because clickDecidingStatusThreeCheckboxes()

      const settingsPage = new SettingsPage()
      settingsPage.testNeedsDuplicatePipeline()

      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.assignToNewlyMadePipeline()
      const pipelineArea = new studentProfile.PipelineArea()
      pipelineArea.clickDecidingStatusThreeCheckboxes()

      expect(pipelineArea.lastHeader.getText()).to.eventually.equal(NEW_STATUS)
    })
  })

  it('statuses match those in settings > agency > pipeline', () => {
    browser.get('https://e2e.edvisor.io:2999/agency/en/504/settings/agency/504/information')
    LoginPage.waitForLoader()
    SettingsPage.waitForGhostTab()

    const settingsPage = new SettingsPage()
    const agencyTab = new settingsPage.AgencyTab()
    agencyTab.clickPipelineButton()

    var arrayFromSettings
    const studentProfile = new StudentProfilePage()
    const pipelineArea = new studentProfile.PipelineArea()

    agencyTab.stageElements.count().then((count) => {
      var stageArray = []
      for (let i = 0; i < count; i++) {
        stageArray.push(agencyTab.stageElements.get(i).getText())
      }
      return Promise.all(stageArray)
    }).then((textArray) => {
      arrayFromSettings = textArray
      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      pipelineArea.clickChangePipelineFirstButton()
      pipelineArea.clickChangePipelineStatusOption()
      return pipelineArea.pipelineStatusAllElements.count()
    }).then((count) => {
      var stageArray = []
      for (let i = 0; i < count; i++) {
        stageArray.push(pipelineArea.pipelineStatusAllElements.get(i).getText())
      }
      return Promise.all(stageArray)
    }).then((textArray) => {
      for (let i = 0; i < textArray.length; i++) {
        expect(textArray[i]).to.equal(arrayFromSettings[i])
      }
    }).catch(console.log.bind(console))
  })
})

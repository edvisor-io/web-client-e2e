import StudentProfilePage from './profile.pageObject'
import StudentListingPage from './listing.pageObject'
import SettingsPage from '../settings/settings.pageObject'
import InvoicesPage from '../invoices/invoices.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Chance from 'chance'

chai.use(chaiAsPromised)
const {expect} = chai
var chance = new Chance()

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

  // describe('navigation', () => {
  //   it('works from login', () => {
  //     browser.get('/')
  //     LoginPage.waitForLoader()
  //     const agencyNav = new AgencyNav()
  //     agencyNav.goToStudents()
  //   })
  // })

  describe('recent actitivies', () => {
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
        studentProfile.fillAndSaveANote()
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

  describe('temporary grouping', () => {
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
      const studentInformationArea = new studentProfile.StudentInformationArea()
      expect(studentInformationArea.firstNameField.isPresent()).to.eventually.equal(true)
    })

    it('starts an invoice', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.makeNewInvoice()
      const invoicesPage = new InvoicesPage()
      expect(invoicesPage.startApplicationButton.isPresent()).to.eventually.equal(true)
    })
  })

  describe('student information area, notes area', () => {
    it('edits and saves an existing student profile', () => {
      const FIRST_NAME = `${chance.first()}`
      const LAST_NAME = `${chance.last()}`
      const EMAIL = `${FIRST_NAME}@earth.io`
      const PHONE_NUMBER = `${chance.phone()}`
      const GENDER = `${chance.gender()}`
      const HOME_ADDRESS = `${chance.address()}`
      const CITY_COUNTRY = `${chance.country({full: true})}`
      const POSTAL_CODE = `${chance.postal()}`
      const PASSPORT_NUMBER = `${chance.phone()}`
      const NOTE = `${chance.sentence()}`

      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const studentInformationArea = new studentProfile.StudentInformationArea()
      const notesArea = new studentProfile.NotesArea()
      const agencyNav = new AgencyNav()

      studentListing.clickFirstStudentInTable()
      studentProfile.fillAndSaveStudentInformation(FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, GENDER, HOME_ADDRESS, CITY_COUNTRY, POSTAL_CODE, PASSPORT_NUMBER)
      studentProfile.fillAndSaveANote(NOTE)

      agencyNav.goToStudents()
      studentListing.clickFirstStudentInTable()
      expect(studentInformationArea.firstNameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
      expect(studentInformationArea.lastNameField.getAttribute('value')).to.eventually.equal(LAST_NAME)
      expect(studentInformationArea.emailField.getAttribute('value')).to.eventually.equal(EMAIL)
      expect(studentInformationArea.phoneNumberField.getAttribute('value')).to.eventually.equal(PHONE_NUMBER)
      expect(studentInformationArea.homeAddressField.getAttribute('value')).to.eventually.equal(HOME_ADDRESS)
      expect(studentInformationArea.getCityCountryValue()).to.eventually.equal(CITY_COUNTRY)
      expect(studentInformationArea.postalCodeField.getAttribute('value')).to.eventually.equal(POSTAL_CODE)
      expect(studentInformationArea.passportNumberField.getAttribute('value')).to.eventually.equal(PASSPORT_NUMBER)
      expect(notesArea.field.getAttribute('value')).to.eventually.equal(NOTE)
    })
  })

  describe('tasks area', () => {
    it('creates a task', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
      const studentProfile = new StudentProfilePage()
      studentProfile.addTask()

      expect(studentProfile.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe('office and owner area', () => {
    beforeEach(() => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()
    })

    it('assigns a student to an office from profile', () => {
      const NEW_OFFICE = 'Bogotá Office'
      const studentProfile = new StudentProfilePage()

      studentProfile.reassignToOffice(NEW_OFFICE)

      const assignedToArea = new studentProfile.AssignedToArea()
      expect(assignedToArea.agencyName.getText()).to.eventually.equal(NEW_OFFICE)
    })

    it('assigns a student to an owner', () => {
      const NEW_OWNER = 'Shelley Chen'
      const studentProfile = new StudentProfilePage()
      const assignedToArea = new studentProfile.AssignedToArea()

      assignedToArea.clickChangeOwnerButton()
      assignedToArea.setAsNewOwner(NEW_OWNER)

      expect(assignedToArea.ownerName.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe('pipeline area', () => {
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

    it('preserves pipelines and statuses when archiving then unarchiving', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      var originalArray

      studentListing.clickFirstStudentInTable()
      pipelineArea.currentPipelines.count().then((count) => {
        let pipelinesAndStatusesArray = []
        for (let i = 0; i < count; i++) {
          pipelinesAndStatusesArray.push(pipelineArea.currentPipelines.get(i).getText(), pipelineArea.currentPipelineStatuses.get(i).getText())
        }
        return Promise.all(pipelinesAndStatusesArray)
      }).then((textArray) => {
        originalArray = textArray
        studentProfile.archiveStudent()
        browser.refresh()
        studentProfile.unarchiveStudent()
        browser.refresh()
        pipelineArea.currentPipelines.count().then((count) => {
          let newArray = []
          for (let i = 0; i < count; i++) {
            newArray.push(pipelineArea.currentPipelines.get(i).getText(), pipelineArea.currentPipelineStatuses.get(i).getText())
          }
          return Promise.all(newArray)
        }).then((textArray) => {
          for (let i = 0; i < textArray.length; i++) {
            expect(textArray[i]).to.equal(originalArray[i])
          }
        }).catch(console.log.bind(console))
      })
    })
  })
})

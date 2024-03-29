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
var request = require('request')

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

  describe('navigation', () => {
    it('works from login', () => { // necessary? this is testing in studentListing
      browser.get('/')
      LoginPage.waitForLoader()
      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()

      expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\/en\/504\/student\/listing\/504/)
    })

    it('displays a student profile when one in listing is clicked', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const studentInformationArea = new studentProfile.StudentInformationArea()

      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
      studentListing.clickFirstStudentInTable()
      browser.wait(protractor.ExpectedConditions.presenceOf(studentInformationArea.firstNameField), constants.TIMEOUT_TIME)
      expect(studentInformationArea.firstNameField.isPresent()).to.eventually.equal(true)
    })
  })

  describe('files', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    it('uploads a file (1/3)', () => {
      const studentProfile = new StudentProfilePage()
      const studentListing = new StudentListingPage()
      const filesTabArea = new studentProfile.FilesTabArea()

      studentListing.clickFirstStudentInTable()
      studentProfile.goToFilesTab()
      filesTabArea.fileRows.count().then((count) => {
        let rowCount = count
        studentProfile.uploadFile()

        expect(filesTabArea.fileRows.count()).to.eventually.equal(rowCount + 1)
      })
    })

    it('downloads a file (2/3)', (done) => {
      const studentProfile = new StudentProfilePage()
      const studentListing = new StudentListingPage()
      const filesTabArea = new studentProfile.FilesTabArea()

      studentListing.clickFirstStudentInTable()
      studentProfile.goToFilesTab()
      filesTabArea.lastRowFileName.getAttribute('href').then((url) => {
        request
          .get(url)
          .on('response', (response) => {
            expect(response.statusCode).to.equal(200)
            done()
          })
      })
    })

    it('deletes a file (3/3)', () => {
      const studentProfile = new StudentProfilePage()
      const studentListing = new StudentListingPage()
      const filesTabArea = new studentProfile.FilesTabArea()
      studentListing.clickFirstStudentInTable()
      studentProfile.goToFilesTab()
      filesTabArea.fileRows.count().then((count) => {
        let rowCount = count
        studentProfile.deleteFile()

        expect(filesTabArea.fileRows.count()).to.eventually.equal(rowCount - 1)
      })
    })
  })

  describe('recent actitivies', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    it('updates on saved changes to profile', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      recentActivitiesArea.checkForAndClickShowAllActivityButton()
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let currentActivitiesCount = count
        studentProfile.fillAndSaveANote()
        recentActivitiesArea.checkForAndClickShowAllActivityButton() // the button may appear after an activity
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(currentActivitiesCount + 1)
      })
    })

    it('updates on changes to pipeline area', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      recentActivitiesArea.checkForAndClickShowAllActivityButton()
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let currentActivitiesCount = count
        studentProfile.assignStatusSecondOptionInFirstPipeline()
        recentActivitiesArea.checkForAndClickShowAllActivityButton() // the button may appear after an activity
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(currentActivitiesCount + 1)
      })
    })

    it('updates on archiving and unarchiving', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      recentActivitiesArea.checkForAndClickShowAllActivityButton()
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let originalActivitiesCount = count
        studentProfile.archiveStudent()
        studentProfile.unarchiveStudent()
        recentActivitiesArea.checkForAndClickShowAllActivityButton() // the button may appear after an activity
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(originalActivitiesCount + 2)
      })
    })

    it('updates on reassigning owner', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      recentActivitiesArea.checkForAndClickShowAllActivityButton()
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let originalActivitiesCount = count
        studentProfile.reassignOwner()
        recentActivitiesArea.checkForAndClickShowAllActivityButton() // the button may appear after an activity
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(originalActivitiesCount + 1)
      })
    })

    it('updates on student information change saves', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      const recentActivitiesArea = new studentProfile.RecentActivitiesArea()
      recentActivitiesArea.checkForAndClickShowAllActivityButton()
      recentActivitiesArea.allActivitiesElements.count().then((count) => {
        let originalActivitiesCount = count
        studentProfile.changeStudentFirstName()
        recentActivitiesArea.checkForAndClickShowAllActivityButton() // the button may appear after an activity
        expect(recentActivitiesArea.allActivitiesElements.count()).to.eventually.equal(originalActivitiesCount + 1)
      })
    })
  })

  describe('temporary grouping', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    it('enters a school name in goals and studies tab area', () => {
      const SCHOOL = 'Kaplan' // this is dependent on test data
      const SCHOOL_REGEX = new RegExp(SCHOOL)
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const goalsTabArea = new studentProfile.GoalsTabArea()

      studentListing.clickFirstStudentInTable()
      studentProfile.goToGoalsTab()
      goalsTabArea.fillAndSaveStudentGoalForm(SCHOOL)
      expect(goalsTabArea.schoolsFieldLastSelectedElement.getText()).to.eventually.match(SCHOOL_REGEX)
    })

    it('starts a quote (v1)', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const quotesInvoicesTabArea = new studentProfile.QuotesInvoicesTabArea()

      studentListing.clickFirstStudentInTable()
      studentProfile.goToQuotesInvoicesTab()
      // expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\/en\/504\/quotes\/edit\//)
      quotesInvoicesTabArea.quotesV1ListRows.count()
        .then((count) => {
          let originalCount = count

          browser.getCurrentUrl()
            .then((url) => {
              studentProfile.startNewQuoteV1()
              browser.get(url)
              LoginPage.waitForLoader()
              studentProfile.goToQuotesInvoicesTab()
              expect(quotesInvoicesTabArea.quotesV1ListRows.count()).to.eventually.equal(originalCount + 1)
            })
        })
    })

    it('creates a study record', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const goalsTabArea = new studentProfile.GoalsTabArea()
      const currentAndPastStudiesArea = new goalsTabArea.CurrentAndPastStudiesArea()
      studentListing.clickFirstStudentInTable()
      studentProfile.goToGoalsTab()
      browser.sleep(5000) // todo make explicit wait
      currentAndPastStudiesArea.allRecordElements.count()
        .then((count) => {
          let originalCount = count
          studentProfile.addRecord()
          expect(currentAndPastStudiesArea.allRecordElements.count()).to.eventually.equal(originalCount + 1)
        })
    })

    it('adds a secondary contact', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const secondaryContactsArea = new studentProfile.SecondaryContactsArea()
      studentListing.clickFirstStudentInTable()
      // browser.wait(protractor.ExpectedConditions.visibilityOf(secondaryContactsArea.allContactElements), constants.TIMEOUT_TIME)
      browser.sleep(constants.SLEEP_SHORT)
      secondaryContactsArea.allContactElements.count()
        .then((count) => {
          let originalContactCount = count
          studentProfile.addSecondaryContact()
          expect(secondaryContactsArea.allContactElements.count()).to.eventually.equal(originalContactCount + 1)
        })
    })

    it('starts an invoice', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()

      studentListing.clickSecondStudentInTable()
      studentProfile.makeNewInvoice()

      const invoicesPage = new InvoicesPage()
      expect(invoicesPage.startApplicationButton.isPresent()).to.eventually.equal(true)
    })
  })

  describe('student information area, notes area', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    it('edits and saves an existing student profile', () => {
      const FIRST_NAME = `${chance.first()}`
      const LAST_NAME = `${chance.last()}`
      const EMAIL = `${FIRST_NAME}@${LAST_NAME}.io`
      const PHONE_NUMBER = `${chance.phone()}`
      const GENDER = `${chance.gender()}`
      const HOME_ADDRESS = `${chance.address()}`
      const CITY_COUNTRY = 'Antigua and Barbuda'
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

    it('displays all custom fields', () => {
      const settingsPage = new SettingsPage()
      const settingsAgencyTab = new settingsPage.AgencyTab()
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()

      browser.get(constants.LEGACY_URL_SETTINGS_OFFICES_TAB_CUSTOM_FIELDS)
      LoginPage.waitForLoader()
      settingsAgencyTab.customFieldsRowsLabelIDElements.count().then(() => {
        let array = settingsAgencyTab.customFieldsRowsLabelIDElements.getText()
        return Promise.resolve(array)
      }).then((array) => {
        return array.filter((string, index) => {
          return index % 2 === 0
        })
      }).then((array) => {
        browser.get(constants.LEGACY_URL_STUDENT_LISTING)
        LoginPage.waitForLoader()
        studentListing.clickFirstStudentInTable()
        browser.sleep(constants.SLEEP_SHORT) // implicit wait for the elements gives 'cannot read property "bind" of undefined'
        studentProfile.customFieldLabelElements.count().then((count) => {
          for (let i = 0; i < count; i++) {
            expect(studentProfile.customFieldLabelElements.get(i).getText()).to.eventually.equal(array[i])
          }
        })
      })
    })
  })

  describe('tasks area', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    it('creates a task', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const tasksArea = new studentProfile.TasksArea()
      studentListing.clickFirstStudentInTable()
      browser.sleep(constants.SLEEP_SHORT)
      tasksArea.allTaskElements.count()
        .then((count) => {
          let originalTaskCount = count
          studentProfile.addTask()
          expect(tasksArea.allTaskElements.count()).to.eventually.equal(originalTaskCount + 1)
        })
    })
  })

  describe('office and owner area', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

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

      studentProfile.reassignOwner(NEW_OWNER)

      const assignedToArea = new studentProfile.AssignedToArea()
      expect(assignedToArea.ownerName.getText()).to.eventually.equal(NEW_OWNER)
    })
  })

  describe('pipeline area', () => {
    beforeEach(() => {
      browser.get(constants.LEGACY_URL_STUDENT_LISTING)
      LoginPage.waitForLoader()
    })

    const EXPECTED_STATUS_ONE = 'Deciding'
    const EXPECTED_STATUS_TWO = 'Deciding'
    const EXPECTED_STATUS_THREE = 'Client'

    it('assigns a student to a pipeline status', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()

      studentListing.clickFirstStudentInTable()
      studentProfile.assignStatusSecondOptionInFirstPipeline()

      const pipelineArea = new studentProfile.PipelineArea()
      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_ONE)
    })

    it('reassigns a student to a different pipeline status', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()

      studentListing.clickFirstStudentInTable()
      studentProfile.assignStatusSecondOptionInFirstPipeline()
      studentProfile.assignStatusThirdOptionInFirstPipeline()

      const pipelineArea = new studentProfile.PipelineArea()
      expect(pipelineArea.firstHeader.getText()).to.eventually.equal(EXPECTED_STATUS_THREE)
    })

    it('unassigns a student from a pipeline status', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()

      studentListing.clickFirstStudentInTable()
      browser.sleep(constants.SLEEP_SHORT)
      pipelineArea.allPipelineContainers.count()
        .then((count) => {
          let originalPipelineCount = count

          pipelineArea.clickChangePipelineFirstButton()
          pipelineArea.clickRemoveFromPipelineOption()
          pipelineArea.clickConfirmRemoveButton()

          expect(pipelineArea.allPipelineContainers.count()).to.eventually.equal(originalPipelineCount - 1)
        })
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
      browser.get(constants.LEGACY_URL_SETTINGS_OFFICES_TAB)
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
      })
    })

    it('preserves pipelines and statuses when archiving then unarchiving', () => {
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()
      const pipelineArea = new studentProfile.PipelineArea()
      var originalArray

      studentListing.clickFirstStudentInTable()
      browser.sleep(constants.SLEEP_SHORT)
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
        browser.sleep(constants.SLEEP_SHORT)
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
        })
      })
    })
  })
})

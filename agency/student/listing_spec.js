import StudentListingPage from './listing.pageObject'
import StudentProfilePage from './profile.pageObject'
import LoginPage from '../../auth/login/login.pageObject'
import AgencyNav from '../nav.pageObject'
import {ChosenWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Chance from 'chance'
import uuid from 'node-uuid'

chai.use(chaiAsPromised)
const {expect} = chai
var chance = new Chance()

describe('the student listing page', () => {
  const ASSIGNED_TO = 'Clarence'
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

  describe.skip('navigation', () => {
    it('works from login', () => {
      browser.get('/')
      LoginPage.waitForLoader()
      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()

      expect(browser.getCurrentUrl()).to.eventually.match(/\/agency\/en\/504\/student\/listing\/504/)
    })
  })

  describe.skip('batch function', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

    it('reassigns multiple students to another user and preserves profile data', () => {
      let notesArray = []
      var note = chance.sentence()
      const studentListing = new StudentListingPage()
      const studentProfile = new StudentProfilePage()

      studentListing.clickFirstStudentInTable()
      studentProfile.fillAndSaveANote(note)
      studentProfile.backToStudentsButton.click()
      studentListing.clickSecondStudentInTable()
      studentProfile.fillAndSaveANote(note)

      studentProfile.backToStudentsButton.click()
      studentListing.reassignTwoStudentsToAUser()

      studentListing.clickFirstStudentInTable()
      notesArray.push(studentProfile.getNoteAsPromise())
      studentProfile.backToStudentsButton.click()
      studentListing.clickSecondStudentInTable()
      notesArray.push(studentProfile.getNoteAsPromise())

      for (let i = 0; i < notesArray.length; i++) {
        expect(notesArray[i]).to.eventually.equal(note + '\n') // notes adds new line character and comparison fails
      }
    })

    it('reassigns multiple students to another office', () => {
      const studentListing = new StudentListingPage()
      studentListing.selectViewingAllStudents()
      studentListing.reassignTwoStudentsToAnOffice()
      expect(studentListing.alertBoxMessage.isPresent()).to.eventually.equal(true)
    })
  })

  describe.skip('temporary grouping', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

    it('lists new students in pale yellow', () => {
      const email = uuid.v4() + AT_EMAIL_DOMAIN
      const PALE_YELLOW = 'rgba(252, 248, 240, 1)'

      const studentListing = new StudentListingPage()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      const studentProfile = new StudentProfilePage()
      studentProfile.clickBackToStudentsButton()
      // browser.get('/agency/en/504/student/listing/504') // workaround for unexpected redirect to not studentListing page in weedle
      studentListing.selectViewingAllStudents()
      const listArea = new studentListing.ListArea()
      expect(listArea.firstStudentInTableCheckboxContainer
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
      const studentInformationArea = new studentProfile.StudentInformationArea()
      expect(studentInformationArea.firstNameField.isPresent()).to.eventually.equal(true)
    })
  })

  describe('pipeline tabs', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

    it('should switch displayed students pipeline', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondPipelineTab()
      studentListing.clickThirdPipelineTab()
      studentListing.clickFourthPipelineTab()
      const listArea = new studentListing.ListArea()
      expect(listArea.firstStudentInTable.isPresent()).to.eventually.equal(true)
    })

    it('should display all students in a pipeline through pagination', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondPipelineTab()
      const pipelineTabs = new studentListing.PipelineTabs()

      var studentCount

      pipelineTabs.secondPipelineTabCountElement.getText().then((text) => {
        studentCount = +text
        studentListing.goToLastPageOfTab(studentCount)
      }).then(() => {
        const filterNavigationDownloadCustomizeBar = new studentListing.FilterNavigationDownloadCustomizeBar()
        expect(filterNavigationDownloadCustomizeBar.currentPageField
          .getAttribute('value')).to.eventually
          .equal((Math.floor(studentListing.calculatePages(studentCount)))
          .toString())
      })
    })

    it('displays the same number of students as total given in the pipeline tab element', () => {
      const studentListing = new StudentListingPage()
      studentListing.clickSecondPipelineTab()

      var studentCount
      const pipelineTabs = new studentListing.PipelineTabs()
      pipelineTabs.secondPipelineTabCountElement.getText().then((text) => {
        studentCount = +text
        return studentListing.countClickNextButtonAndCount(studentCount)
      }).then((countArray) => {
        expect(countArray).to.equal(studentCount)
      })
    })

    it('displays pipeline lists from the tabs hidden by page width', () => {
      const COLOUR_WHEN_ACTIVE = 'rgba(87, 88, 89, 1)'

      const studentListing = new StudentListingPage()
      studentListing.openPipelineTabsOverflowDropdown()
      studentListing.selectLastPipelineTab()
      const pipelineTabs = new studentListing.PipelineTabs()
      expect(pipelineTabs.lastPipelineTabTitleSpanElement.getCssValue('color'))
        .to.eventually.equal(COLOUR_WHEN_ACTIVE)
    })
  })

  describe.skip('add student modal', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

    it('should create a new student successfully', () => {
      const email = uuid.v4() + AT_EMAIL_DOMAIN

      const studentListing = new StudentListingPage()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      // browser.get('/agency/en/504/student/listing/504') // workaround for unexpected redirect to not studentListing page in weedle
      // studentListing.selectViewingAllStudents()
      // studentListing.clickFirstStudentInTable()

      const studentProfile = new StudentProfilePage()
      expect(studentProfile.assignedToLabel.getText()).to.eventually.equal(ASSIGNED_TO)
      const studentInformationArea = new studentProfile.StudentInformationArea()
      expect(studentInformationArea.firstNameField.getAttribute('value')).to.eventually.equal(FIRST_NAME)
      expect(studentInformationArea.lastNameField.getAttribute('value')).to.eventually.equal(LAST_NAME)
      expect(studentInformationArea.emailField.getAttribute('value')).to.eventually.equal(email)
      expect(ChosenWidget.getChosenValue(studentInformationArea.nationalityField)).to.eventually.equal(NATIONALITY)
    })

    it('should not create a student with the same email', () => {
      const email = uuid.v4() + AT_EMAIL_DOMAIN

      const studentListing = new StudentListingPage()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      const agencyNav = new AgencyNav()
      agencyNav.goToStudents()
      studentListing.addStudent(ASSIGNED_TO, FIRST_NAME, LAST_NAME, email, NATIONALITY)

      expect(studentListing.alertDanger.isPresent()).to.eventually.equal(true)
    })
  })

  describe.skip('search function', () => {
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

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

  describe.skip('filters students', () => { // the state of this persist until cookies cleared, put after other tests
    beforeEach(() => {
      browser.get('/agency/en/504/student/listing/504')
      LoginPage.waitForLoader()
    })

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
})

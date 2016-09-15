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

  // it('should display a student profile on click of search result', () => {
  //   let studentListing = new StudentListingPage()
  //   studentListing.openSearchBar()
  //   studentListing.inputSearchTerm(STUDENT_NAME)
  //   studentListing.clickSearchResult()
  //
  //   let studentProfile = new StudentProfilePage()
  //   expect(studentProfile.firstNameField.isPresent()).to.eventually.equal(true)
  // })
//
  // it('should assign a student to another office from profile', () => {
  //   let studentListing = new StudentListingPage()
  //   studentListing.openSearchBar()
  //   studentListing.inputSearchTerm(STUDENT_NAME)
  //   studentListing.clickSearchResult()
  //
  //   let studentProfile = new StudentProfilePage()
  //   studentProfile.clickOverviewChangeOwnerButton()
  //   studentProfile.setAsNewOffice(NEW_OFFICE)
  //   // studentProfile.resolveChangeOfficeExceptionModal()
  //
  //   expect(studentProfile.studentAgencyName.getText()).to.eventually.equal(NEW_OFFICE)
  // })
  //
  // it('should assign a student to another owner', () => {
  //   let studentListing = new StudentListingPage()
  //   studentListing.openSearchBar()
  //   studentListing.inputSearchTerm(STUDENT_NAME)
  //   studentListing.clickSearchResult()
  //
  //   let studentProfile = new StudentProfilePage()
  //   studentProfile.clickOverviewChangeOwnerButton()
  //   studentProfile.setAsNewOwner(NEW_OWNER)
  //
  //   expect(studentProfile.studentOwner.getText()).to.eventually.equal(NEW_OWNER)
  // })

  // it('should assign a student to any status', () => {
  //   let studentListing = new StudentListingPage()
  //   studentListing.openSearchBar()
  //   studentListing.inputSearchTerm(STUDENT_NAME)
  //   studentListing.clickSearchResult()
  //
  //   let studentProfile = new StudentProfilePage()
  //   studentProfile.clickChangePipelineButton()
  //   studentProfile.clickChangePipelineStatus()
  //   studentProfile.clickStatusDeciding()
  //
  //   expect(studentProfile.headerStatus.getText()).to.eventually.equal("Deciding")
  // })

  it('should assign a student to more than one pipeline', () => {
    let studentListing = new StudentListingPage()
    studentListing.openSearchBar()
    studentListing.inputSearchTerm(STUDENT_NAME)
    studentListing.clickSearchResult()

    let studentProfile = new StudentProfilePage()
    studentProfile.clickChangePipelineButton()
    studentProfile.clickChangePipelineStatus()
    studentProfile.clickStatusDeciding()

    studentProfile.clickSecondChangePipelineButton()
    studentProfile.clickSecondChangePipelineStatusOption()
    studentProfile.clickStatusTwo()

    // expect(studentProfile.headerStatus.getText()).to.eventually.equal("Deciding")

    browser.sleep(10000)
    // browser.pause()
  })
})

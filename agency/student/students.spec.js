/*eslint-disable */
import NewStudent from '../pages/students_listings.pages.js'
import StudentInfo from '../pages/students_information.pages.js'

var newStudent = new NewStudent(),
    studentInfo = new StudentInfo(),
    expected = protractor.ExpectedConditions,
    newStudentUrl = ""

describe('E2E: Students section', () => {

  it('should load new student form when Add Student button is clicked', () => {
    protractor.helper.navigate(1,0)
    browser.wait(expected.elementToBeClickable(newStudent.addButton), 5000)
    newStudent.open()

    expect(newStudent.agencyInput.isPresent()).toBe(true)
    expect(newStudent.firstnameInput.isPresent()).toBe(true)
    expect(newStudent.emailInput.isPresent()).toBe(true)
    expect(newStudent.assignInput.isPresent()).toBe(true)
    expect(newStudent.lastnameInput.isPresent()).toBe(true)
    expect(newStudent.nationalityInput.isPresent()).toBe(true)

    newStudent.close()
  });


  it('should save new student after form is filled and saved', () => {
    const FIRST_NAME = 'New'
    const LAST_NAME = 'Student'
    const NATIONALITY = 'Canada'

    newStudent.create(FIRST_NAME, LAST_NAME, NATIONALITY)

    expect(studentInfo.firstnameInput.getAttribute('value')).toEqual(FIRST_NAME)
    expect(studentInfo.lastnameInput.getAttribute('value')).toEqual(LAST_NAME)
    expect(protractor.helper.getChosenValue(studentInfo.nationalityInput)).toEqual(NATIONALITY)
  });


  it('should be able to edit student information and have it saved', () => {
    const FIRST_NAME = 'AAAA'
    const EMAIL = (Math.floor(Math.random() * 10000) + 1).toString() + '@test.com'

    studentInfo.editInformation(FIRST_NAME, EMAIL)

    protractor.helper.refresh()
    
    browser.wait(expected.visibilityOf(studentInfo.firstnameInput), 5000)
    expect(studentInfo.firstnameInput.getAttribute('value')).toEqual(FIRST_NAME)
    expect(studentInfo.emailInput.getAttribute('value')).toEqual(EMAIL)
  });

  it('should be able to change student status and have it saved', () => {
    studentInfo.setStudentStatus('Paid')
    expect(studentInfo.getStudentStatus()).toEqual('Paid')
  })

  it('should show 3 activities describing what has been changed', () => {
    protractor.helper.refresh()

    expect(studentInfo.getNumberOfRecentActivities()).toEqual(3)
  })

});


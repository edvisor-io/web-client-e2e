/*eslint-disable */
import NewStudent from '../pages/students_listings.pages.js'
import Record from '../pages/students_goals.pages.js'

var record = new Record(),
			newStudent = new NewStudent(),
			newStudentUrl = "",
			expected = protractor.ExpectedConditions

describe('E2E: students records section', () => {

	it('should add a new record to a student', () =>{
		newStudent.create('RECORDS')

		element.all(by.repeater('tab in tabs.items')).get(1).click()

		const SCHOOL = 'SFU'
		const PROGRAM = 'Comp Sci Lyfe'
		const LOCATION = 'Vancouver, BC, Canada'
		const START_DATE = {
			month: 'September',
			day: 1,
			year: 2015
		}
		const END_DATE = {
			month: 'January',
			day: 1,
			year: 2017
		}

		record.createRecord(SCHOOL, PROGRAM, LOCATION, START_DATE, END_DATE)

		var reg = new RegExp(`${START_DATE.month} ${START_DATE.day}, ${START_DATE.year}`+"\\s-\\s"+ `${END_DATE.month} ${END_DATE.day}, ${END_DATE.year}` +"\\s.*")

		expect(record.studySchool.getText()).toEqual(SCHOOL)
		expect(record.studyLocation.getText()).toEqual(LOCATION)
		expect(record.studyDate.getText()).toMatch(reg)

   })

	it('should edit a new record to a student', () => {

		var beforeDate = record.studyDate.getText()
		var beforeSchool = record.studySchool.getText()
		var beforeProgram = record.studyProgram.getText()
		
		const SCHOOL = 'UBC'
		const PROGRAM = 'Comp Sci Advanced'
		const LOCATION = 'Vancouver, BC, Canada'
		const START_DATE = {
			month: 'September',
			day: 1,
			year: 2015
		}
		const END_DATE = {
			month: 'January',
			day: 1,
			year: 2017
		}

		record.editRecord(SCHOOL, PROGRAM, LOCATION, START_DATE, END_DATE)

		var reg = new RegExp(`${START_DATE.month} ${START_DATE.day}, ${START_DATE.year}`+"\\s-\\s"+ `${END_DATE.month} ${END_DATE.day}, ${END_DATE.year}` +"\\s.*")

		expect(record.studySchool.getText()).not.toEqual(beforeSchool)
		expect(record.studyProgram.getText()).not.toEqual(beforeProgram)
		expect(beforeDate).toMatch(reg)

	})

})

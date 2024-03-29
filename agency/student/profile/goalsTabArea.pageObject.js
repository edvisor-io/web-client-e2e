import {UISelectWidget, DatePickerWidget} from '../../../shared/widgets'
import moment from 'moment'

export class CurrentAndPastStudiesArea {
  constructor() {
    this.container = element(by.id('student-study-records'))
    this.allRecordElements = this.container.all(by.css('div.card'))
  }
}

export class GoalsTabArea {
  constructor() {
    this.CurrentAndPastStudiesArea = CurrentAndPastStudiesArea

    this.schoolsFieldContainer = element(by.name('schools'))
    this.schoolsField = this.schoolsFieldContainer.element(by.css('input.input'))
    this.schoolsFieldAutocompleteMatches = element.all(by.css('ti-autocomplete-match'))
    this.schoolsFieldLastSelectedElement = this.schoolsFieldContainer.all(by.css('ti-tag-item span')).last()
    this.saveButton = $('button[type="submit"]')
    this.addRecordButton = $('#ext02-add-record-button')

    this.schoolField = $('#ext02-edit-record input')
    this.programField = $('input[name="program"]')
    this.locationField = $('#student-study-records .ui-select-container')
    this.startDateField = $('input[name="startDate"]')
    this.endDateField = $('input[name="endDate"]')
  }

  inputSchoolName(school = 'Kaplan') {
    const goalsTabArea = new GoalsTabArea()
    goalsTabArea.schoolsField.click()
    goalsTabArea.schoolsField.sendKeys(school)
    goalsTabArea.schoolsFieldAutocompleteMatches.first().click()
  }

  // clickSaveButton() { // deprecated
  //   this.saveButton.click()
  // }

  fillAndSaveStudentGoalForm(school) {
    this.inputSchoolName(school)
    this.saveButton.click()
  }

  selectStartDate() {
    let month = moment().format('MMMM')
    let date = +(moment().format('DD'))
    let year = +(moment().format('YYYY'))
    DatePickerWidget.setPikaDate(this.startDateField, month, date, year)
  }

  selectEndDate() {
    let month = moment().add(8, 'M').format('MMMM')
    let date = +moment().add(8, 'M').format('DD')
    let year = +moment().add(8, 'M').format('YYYY')
    DatePickerWidget.setPikaDate(this.endDateField, month, date, year)
  }

  fillAndSaveNewRecordForm(school = 'Hogwarts', program = 'Basic Goblin and Elf', location = 'Scotland') {
    this.addRecordButton.click()
    this.schoolField.sendKeys(school)
    this.programField.sendKeys(program)
    UISelectWidget.clickUISelect(this.locationField, location)
    this.selectStartDate()
    this.selectEndDate()
    this.saveButton.click()
  }
}

export default GoalsTabArea

import {UISelectWidget, DatePickerWidget} from '../../../shared/widgets'
import moment from 'moment'
// class CurrentAndPastStudiesArea {
//   constructor() {
//   }
// }

export class GoalsTabArea {
  constructor() {
    this.schoolsField = element.all(by.css('input.input')).get(1)
    this.saveButton = $('button[type="submit"]')
    this.addRecordButton = $('#ext02-add-record-button')

    this.schoolField = $('#ext02-edit-record input')
    this.programField = $('input[name="program"]')
    this.locationField = $('#student-study-records .ui-select-container')
    this.startDateField = $('input[name="startDate"]')
    this.endDateField = $('input[name="endDate"]')
  }

  inputSchool(school = 'EC Covent Garden') {
    this.schoolsField.sendKeys(school)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  fillAndSaveStudentGoalForm() {
    this.inputSchool()
    this.clickSaveButton()
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

import {ChosenWidget, DatePickerWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

export class CoursesPage {
  constructor() {
    this.searchForm = $('div.card')
    this.searchResults = $('div.browse_results')
    this.actionBar = $('div.bs-actions')

    this.locationField = this.searchForm.element(by.id('js-location-select'))
    this.durationField = this.searchForm.element(by.model('$ctrl.minDuration'))
    this.startDatePicker = this.searchForm.element(by.model('startDate'))
    this.findCoursesButton = this.searchForm.$('button[type="submit"]')
    this.firstResultCheckbox = this.searchResults.all(by.css('input[type="checkbox"]')).get(0)
    this.startQuoteButton = this.actionBar.element(by.id('ext05-start-quote'))
  }

  inputLocation() {
    ChosenWidget.searchAndSetChosenValue(this.locationField, 'Vancouver')
  }

  inputDuration() {
    ChosenWidget.setChosenValue(this.durationField, '1')
  }

  setStartDate() {
    DatePickerWidget.setPikaDate(this.startDatePicker, 'September', 26, 2016)
  }

  clickFindCoursesButton() {
    this.findCoursesButton.click()
  }

  selectFirstResultCheckbox() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.firstResultCheckbox), constants.TIMEOUT_TIME)
    this.firstResultCheckbox.click()
  }

  clickStartQuoteButton() {
    this.startQuoteButton.click()
  }
}

export default CoursesPage

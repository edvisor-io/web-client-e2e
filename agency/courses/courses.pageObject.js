import {ChosenWidget, DatePickerWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

import moment from 'moment'

export class CoursesPage {
  constructor() {
    this.searchForm = $('div.card')
    this.searchResults = $('div.browse_results')
    this.actionBar = $('div.bs-actions')

    this.locationField = this.searchForm.element(by.id('js-location-select'))
    this.durationField = this.searchForm.element(by.model('$ctrl.minDuration'))
    this.startDatePicker = this.searchForm.element(by.model('startDate'))
    this.findCoursesButton = this.searchForm.$('button[type="submit"]')

    this.startQuoteButton = this.actionBar.element(by.id('ext05-start-quote'))

    this.firstResult = this.searchResults
      .element(by.repeater('result in resultsCtrl.pageData.results.items')
      .row(0))
    this.firstResultName = this.firstResult.$('h3 > a')
    this.firstResultSchool = this.firstResult.$('div > a')
    this.firstResultIntensity = this.firstResult
      .all(by.css('p.ng-binding')).get(0)
    this.firstResultDuration = this.firstResult
      .all(by.css('p.ng-binding')).get(1)
    this.firstResultPrice = this.firstResult.all(by.css('p.ng-binding')).get(2)
    this.firstResultCheckbox = this.searchResults
      .all(by.css('input[type="checkbox"]')).get(0)
  }

  inputLocation(location) {
    ChosenWidget.searchAndSetChosenValue(this.locationField, location)
  }

  inputDuration(duration) {
    ChosenWidget.setChosenValue(this.durationField, duration)
  }

  setStartDateAsToday() {
    let month = moment().format('MMMM')
    let date = moment().format('DD')
    let year = moment().format('YYYY')
    DatePickerWidget.setPikaDate(this.startDatePicker, month, date, year)
  }

  clickFindCoursesButton() {
    this.findCoursesButton.click()
  }

  doBasicSearch(location = 'Vancouver', duration = 1) {
    this.inputLocation(location)
    this.inputDuration(duration)
    this.setStartDateAsToday()
    this.clickFindCoursesButton()
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

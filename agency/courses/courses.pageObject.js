import {ChosenWidget, DatePickerWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

import moment from 'moment'

export class CoursesPage {
  constructor() {
    this.searchForm = $('div.card')
    this.searchResults = $('div.browse_results')
    this.actionBar = $('div.bs-actions')

    this.byLocationButton = this.searchForm.all(by.css('div.btn-group-select button')).get(0)
    this.bySchoolButton = this.searchForm.all(by.css('div.btn-group-select button')).get(1)
    this.locationField = this.searchForm.element(by.id('js-location-select'))
    this.schoolField = this.searchForm.element(by.id('js-school-select'))
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
    this.firstResultCheckbox = this.firstResult.$('label.checkbox')
  }

  clickByLocationButton() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.byLocationButton), constants.TIMEOUT_TIME)
    this.byLocationButton.click()
  }
  clickBySchoolButton() {
    this.bySchoolButton.click()
  }

  inputLocation(location = 'Vancouver') {
    ChosenWidget.searchAndSetChosenValue(this.locationField, location)
  }

  inputSchool(school = 'Camber') {
    ChosenWidget.searchAndSetChosenValue(this.schoolField, school)
  }

  inputDuration(duration = 1) {
    ChosenWidget.setChosenValue(this.durationField, duration)
  }

  setStartDateAsToday() {
    let month = moment().format('MMMM')
    let date = +(moment().format('DD'))
    let year = +(moment().format('YYYY'))
    DatePickerWidget.setPikaDate(this.startDatePicker, month, date, year)
  }

  clickFindCoursesButton() {
    this.findCoursesButton.click()
  }

  selectFirstResultCheckbox() {
    // let expected = protractor.ExpectedConditions
    // browser.wait(expected.elementToBeClickable(this.firstResultCheckbox), constants.TIMEOUT_TIME)
    this.firstResultCheckbox.click()
  }

  clickStartQuoteButton() {
    this.startQuoteButton.click()
  }

  doBasicSearch(option = 'byLocation') {
    if (option === 'bySchool') {
      this.clickBySchoolButton()
      this.inputSchool()
    } else if (option === 'byLocation') {
      this.clickByLocationButton()
      this.inputLocation()
    } else if (option === 'byCountry') {
      this.clickByLocationButton()
      this.inputLocation('Canada')
    }
    this.inputDuration()
    this.setStartDateAsToday()
    this.clickFindCoursesButton()
  }

  startQuoteUsingBasicSearch() {
    this.doBasicSearch()
    this.selectFirstResultCheckbox()
    this.clickStartQuoteButton()
  }
}

export default CoursesPage

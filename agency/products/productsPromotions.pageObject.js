import {DatePickerWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

import moment from 'moment'
import uuid from 'node-uuid'

export default class PromotionsPage {
  constructor() {
    this.newPromotionButton = element(by.id('ext34-new-btn'))
    this.nameField = $('input[name="name"]')
    this.fromDateField = element(by.model('vm.promotionModel.data.beginBookingExpiry'))
    this.toDateField = element(by.model('vm.promotionModel.data.endBookingExpiry'))
    this.saveButton = $('button[type="submit"]')

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickNewPromotionButton() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.newPromotionButton), constants.TIMEOUT_TIME)
    this.newPromotionButton.click()
  }

  inputName(name = `${uuid.v4()}`) {
    this.nameField.sendKeys(name)
  }

  selectFromDate() {
    let month = moment().format('MMMM')
    let date = +moment().format('DD')
    let year = +moment().format('YYYY')
    DatePickerWidget.setPikaDate(this.fromDateField, month, date, year)
  }

  selectToDate() {
    let month = moment().add(8, 'M').format('MMMM')
    let date = +moment().add(8, 'M').format('DD')
    let year = +moment().add(8, 'M').format('YYYY')
    DatePickerWidget.setPikaDate(this.toDateField, month, date, year)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  createNewPromotion() {
    this.clickNewPromotionButton()
    this.inputName()
    this.selectFromDate()
    this.selectToDate()
    this.clickSaveButton()
  }
}

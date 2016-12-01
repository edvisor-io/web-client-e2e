import {ChosenWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

export default class QuotesOptionEditPage {
  constructor() {
    this.bottomSaveChangesButton = element
      .all(by.css('button[type="submit"]')).last()

    this.accommodationCheckbox = $('label.checkbox')
    this.accommondationButtons = element
      .all(by.css('div.btn-group-select button'))
    this.schoolAccommodationButton = this.accommondationButtons.get(0)
    this.savedAccommodationButton = this.accommondationButtons.get(1)
    this.accommondationRadioButtons = element.all(by.css('label.radio'))
    this.firstAccommodationRadioButton = this.accommondationRadioButtons.get(0)
    this.accommodationStartDateField = element.all(by.css('offering-start-date-picker')).get(1)

    this.addonsArea = element.all(by.css('.table-basic')).get(0)
    this.durationFields = this.addonsArea.$('edit-option-offering-dates')
    this.addAddonsButton = this.addonsArea.$('button.btn--default')
    this.addAddonsModal = $('.e-modal-container')
    this.modalCheckboxes = this.addAddonsModal.all(by.css('label.checkbox'))
    this.secondCheckbox = this.modalCheckboxes.get(1)
    this.addonsStartDateField = this.addAddonsModal.$('offering-start-date-picker')
    this.saveButton = this.addAddonsModal.$('button[type="submit"]')

    this.feesAreaContainer = $('edit-option-fees')
    this.allFeeRows = this.feesAreaContainer.all(by.css('edit-option-fees-list-item'))
    this.addFeeButton = this.feesAreaContainer.all(by.css('button')).last()
    this.customFeeButton = this.feesAreaContainer.element(by.repeater('item in items').row(1))
    this.nameField = this.feesAreaContainer.element(by.name('name'))
    this.costField = this.feesAreaContainer.element(by.name('amount'))
    this.currencyField = this.feesAreaContainer.$('currency-select')
    this.feesAreaSaveButton = this.feesAreaContainer.$('button[type="submit"]')

    this.promotionsAreaContainer = $('edit-option-promotions')
    this.allPromotionRows = this.promotionsAreaContainer.all(by.css('edit-option-promotions-list-item'))
    this.addPromotionButton = this.promotionsAreaContainer.all(by.css('button')).last()
    this.customPromotionButton = this.promotionsAreaContainer.element(by.repeater('item in items').row(1))
    this.promotionsNameField = this.promotionsAreaContainer.element(by.name('name'))
    this.discountTypeField = this.promotionsAreaContainer.$('promotion-type-select')
    this.priceField = this.promotionsAreaContainer.$('input[name="amount"]')
    this.promotionsCurrencyField = this.promotionsAreaContainer.$('currency-select')
    this.promotionsAreaSaveButton = this.promotionsAreaContainer.$('button[type="submit"]')
  }

  clickAccommodationCheckbox() {
    this.accommodationCheckbox.click()
  }

  clickSchoolAccommodationButton() {
    this.schoolAccommodationButton.click()
  }

  clickSavedAccommodationButton() {
    this.savedAccommodationButton.click()
  }

  clickFirstAccommodationRadioButton() {
    this.firstAccommodationRadioButton.click()
  }

  clickAddAddonsButton() {
    this.addAddonsButton.click()
  }

  clickSecondCheckbox() {
    this.secondCheckbox.click()
  }

  clickSaveChangesButton() {
    this.bottomSaveChangesButton.click()
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  fillAndSaveCustomFeeForm() {
    this.nameField.sendKeys('Mail owl maintanance')
    this.costField.sendKeys(1000)
    ChosenWidget.setValueOfAutocomplete(this.currencyField, 'CAD')
    this.feesAreaSaveButton.click()
  }

  addFee() {
    this.addFeeButton.click()
    this.customFeeButton.click()
    this.fillAndSaveCustomFeeForm()
    this.bottomSaveChangesButton.click()
  }

  fillAndSaveCustomPromotionForm() {
    this.promotionsNameField.sendKeys('Sure, take 10')
    ChosenWidget.setValueOfAutocomplete(this.discountTypeField, 'Amount Off')
    this.priceField.sendKeys(10)
    ChosenWidget.setValueOfAutocomplete(this.promotionsCurrencyField, 'CAD')
    this.promotionsAreaSaveButton.click()
  }

  addPromotion() {
    this.addPromotionButton.click()
    this.customPromotionButton.click()
    this.fillAndSaveCustomPromotionForm()
    this.bottomSaveChangesButton.click()
  }
}

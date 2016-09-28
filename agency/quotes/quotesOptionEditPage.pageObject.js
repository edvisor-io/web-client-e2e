export default class QuotesOptionEditPage {
  constructor() {
    this.accommodationCheckbox = $('input[type="checkbox"]')
    this.accommondationButtons = element
      .all(by.css('div.btn-group-select button'))
    this.schoolAccommodationButton = this.accommondationButtons.get(0)
    this.accommondationRadioButtons = element.all(by.css('input[type="radio"]'))
    this.firstAccommodationRadioButton = this.accommondationRadioButtons.get(0)
    this.bottomSaveChangesButton = element
      .all(by.css('button[type="submit"]')).get(1)
    this.accommodationStartDateField = element.all(by.css('offering-start-date-picker')).get(1)

    this.addonsArea = element.all(by.css('.table-basic')).get(0)
    this.durationFields = this.addonsArea.$('edit-option-offering-dates')
    this.addAddonsButton = this.addonsArea.$('button.btn-default')
    this.addAddonsModal = $('.e-modal-container')
    this.modalCheckboxes = this.addAddonsModal.all(by.css('input[type="checkbox"]'))
    this.addonsStartDateField = this.addAddonsModal.$('offering-start-date-picker')
    this.saveButton = this.addAddonsModal.$('button[type="submit"]')
  }

  clickAccommodationCheckbox() {
    this.accommodationCheckbox.click()
  }

  clickSchoolAccommodationButton() {
    this.schoolAccommodationButton.click()
  }

  clickFirstAccommodationRadioButton() {
    this.firstAccommodationRadioButton.click()
  }

  clickAddAddonsButton() {
    this.addAddonsButton.click()
  }

  clickSecondCheckbox() {
    this.modalCheckboxes.get(1).click()
  }

  clickSaveChangesButton() {
    this.bottomSaveChangesButton.click()
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

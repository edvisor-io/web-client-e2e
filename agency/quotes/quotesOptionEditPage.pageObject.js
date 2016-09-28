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

  clickSaveChangesButton() {
    this.bottomSaveChangesButton.click()
  }
}

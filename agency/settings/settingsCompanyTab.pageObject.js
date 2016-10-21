import constants from '../../shared/constants'

class CurrencySettingsArea {
  constructor() {
    this.currencySettingsContainer = $('.currency-settings')
    this.automaticallySetRadio = this.currencySettingsContainer.all(by.css('label.input-checked-gray')).get(0)
    this.manuallySetRatesRadio = this.currencySettingsContainer.all(by.css('label.input-checked-gray')).get(1)
    this.setRatesButton = this.currencySettingsContainer.element(by.id('ext01-set-exchange'))
    this.saveButton = this.currencySettingsContainer.$('form#ext01-currency-type').$('button[type="submit"]')
    this.setRatesModalContainer = $('.e-modal-container')
    this.firstRateField = this.setRatesModalContainer.all(by
      .model('setRates.companyRates[fromCompanyCurrency.currencyId][toCompanyCurrency.currencyId]')).get(0)
    this.fourthRateField = this.setRatesModalContainer.all(by
      .model('setRates.companyRates[fromCompanyCurrency.currencyId][toCompanyCurrency.currencyId]')).get(3)
    this.fiftySeventhRateField = this.setRatesModalContainer.all(by
      .model('setRates.companyRates[fromCompanyCurrency.currencyId][toCompanyCurrency.currencyId]')).get(56)
    this.inModalSaveButton = this.setRatesModalContainer.$('button[type="submit"]')
  }

  clickAutomaticallySetRadio() {
    this.automaticallySetRadio.click()
  }

  clickManuallySetRadio() {
    this.manuallySetRatesRadio.click()
  }

  clickSetRatesButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.setRatesButton), constants.TIMEOUT_TIME)

    this.setRatesButton.click()
  }

  inputRateIntoFirstField(rate) {
    this.firstRateField.clear()
    this.firstRateField.sendKeys(rate)
  }

  inputRateIntoFourthField(rate) {
    this.fourthRateField.clear()
    this.fourthRateField.sendKeys(rate)
  }

  inputRateIntoFiftySeventhField(rate) {
    this.fiftySeventhRateField.clear()
    this.fiftySeventhRateField.sendKeys(rate)
  }

  waitForModal() {
    var modal = this.setRatesModalContainer

    // wait for modal to appear
    browser.wait(function() {
      return browser.isElementPresent(modal).then((presenceOfElement) => {
        return presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }

  clickInModalSaveButton() {
    this.inModalSaveButton.click()
  }

  clickSaveButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.saveButton), constants.TIMEOUT_TIME)
    this.saveButton.click()
  }
}

class CompanyTab {
  constructor() {
    this.CurrencySettingsArea = CurrencySettingsArea
  }
}

export default CompanyTab

import constants from '../../shared/constants'

class CurrencySettingsArea {
  constructor() {
    this.currencySettingsContainer = $('.currency-settings')
    this.manuallySetRatesRadio = this.currencySettingsContainer.element(by.id('ext01-currency-manual'))
    this.setRatesButton = this.currencySettingsContainer.element(by.id('ext01-set-exchange'))
    this.setRatesModalContainer = $('.e-modal-container')
    this.firstRateField = this.setRatesModalContainer.all(by
      .model('setRates.companyRates[fromCompanyCurrency.currencyId][toCompanyCurrency.currencyId]')).get(0)
    this.saveButton = this.setRatesModalContainer.$('button[type="submit"]')
  }

  clickManuallySetRadio() {
    this.manuallySetRatesRadio.click()
  }

  clickSetRatesButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.setRatesButton), constants.TIMEOUT_TIME)

    this.setRatesButton.click()
  }

  inputRate(rate) {
    this.firstRateField.clear()
    this.firstRateField.sendKeys(rate)
  }

  waitForModal() {
    var modal = this.setRatesModalContainer

    // wait for modal to appear
    browser.wait(function() {
      return browser.isElementPresent(modal).then(function(presenceOfElement) {
        return presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

class CompanyTab {
  constructor() {
    this.CurrencySettingsArea = CurrencySettingsArea
  }
}

export default CompanyTab

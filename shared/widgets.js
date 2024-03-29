import constants from './constants'

export class UISelectWidget {
  static clickUISelect(containerElement, input) {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(containerElement), constants.TIMEOUT_TIME)
    let fieldElement = containerElement.$('.ui-select-search')

    let firstPartOfInput = input.substring(0, 3)
    let secondPartOfInput = input.substring(3)
    containerElement.click()
    fieldElement.sendKeys(firstPartOfInput)
    fieldElement.sendKeys(secondPartOfInput)

    var choices = containerElement.all(by.css('.ui-select-choices-row'))
    browser.wait(() => {
      return choices.count()
        .then((count) => {
          return count > 0
        })
    }, constants.TIMEOUT_TIME)

    let firstOption = choices.first().all(by.css('span')).first()
    browser.wait(expected.elementToBeClickable(firstOption), constants.TIMEOUT_TIME)
    firstOption.click()
  }

  static getUISelectValue(containerElement) {
    var uiSpan = containerElement.$('div.ui-select-container span.ui-select-match-text > span')
    return uiSpan.getText()
  }
}

export class DatePickerWidget {
  static setPikaDate(inputElement, month, day, year) {
    let expected = protractor.ExpectedConditions
    let datePicker = $('.pika-single.is-bound:not(.is-hidden)')
    let monthContainer = datePicker.$('.pika-select-month').element(by.cssContainingText('option', month))
    let yearContainer = datePicker.$('.pika-select-year').element(by.cssContainingText('option', year))
    let dayContainer = datePicker.$(`[data-pika-day="${day}"]`)

    browser.wait(expected.elementToBeClickable(inputElement), constants.TIMEOUT_TIME)
    inputElement.click()
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    monthContainer.click()

    browser.wait(expected.elementToBeClickable(inputElement), constants.TIMEOUT_TIME)
    inputElement.click()
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    yearContainer.click()

    browser.wait(expected.elementToBeClickable(inputElement), constants.TIMEOUT_TIME)
    inputElement.click()
    inputElement.click() // next line possibly times out
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    dayContainer.click()
  }
}

export class ChosenWidget {
  static getChosenContainer(element) {
    return element.element(by.xpath('following-sibling::div[1]'))
  }

  static getAutocompleteContainer(element) {
    return element.element(by.css('div.chosen-container'))
  }

  static getDropdownContainer(element) {
    return element.element(by.css('div.chosen-container'))
  }

  static setValueOfTag(element, value) {}

  static setValueOfDropdown(element, value) {
    let expected = protractor.ExpectedConditions
    let container = ChosenWidget.getDropdownContainer(element)
    browser.wait(expected.visibilityOf(container), constants.TIMEOUT_TIME)

    let chosenSearchElement = container.$('.chosen-search input')
    let chosenResultsElement = container.$('.chosen-results')

    container.click()
    browser.wait(expected.visibilityOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
  }

  static setValueOfAutocomplete(element, value) {
    let expected = protractor.ExpectedConditions
    let container = ChosenWidget.getAutocompleteContainer(element)
    browser.wait(expected.visibilityOf(container), constants.TIMEOUT_TIME)

    let chosenSearchElement = container.$('.chosen-search input')
    let chosenResultsElement = container.$('.chosen-results')

    container.click()
    browser.wait(expected.visibilityOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
  }

  static setChosenValue(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearchElement = chosenContainer.$('.chosen-search input')
    let chosenResultsElement = chosenContainer.$('.chosen-results')

    chosenContainer.click()
    browser.wait(expected.visibilityOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
  }

  static setChosenValueWithDoubleClick(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearchElement = chosenContainer.$('.chosen-search input')
    let chosenResultsElement = chosenContainer.$('.chosen-results')

    // chosenContainer.click() // additional click for one test that breaks otherwise
    browser.executeScript('arguments[0].scrollIntoView()', chosenContainer)
    chosenContainer.click()
    browser.wait(expected.visibilityOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
  }

  static setChosenValueWithExtraClicks(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearchElement = chosenContainer.$('.chosen-search input')
    let chosenResultsElement = chosenContainer.$('.chosen-results')

    chosenContainer.click()
    browser.wait(expected.presenceOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
    chosenContainer.click() // additional click for one test that breaks otherwise
  }

  static searchAndSetChosenValue(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearch = chosenContainer.$('.search-field input')
    let chosenResults = chosenContainer.$('.chosen-results')

    chosenContainer.click()
    browser.wait(expected.visibilityOf(chosenResults), constants.TIMEOUT_TIME)
    chosenSearch.sendKeys(value)

    chosenResults.all(by.cssContainingText('li', value)).first().click()
  }

  static getChosenValue(ele) {
    var chosenContainer = ele.element(by.xpath('following-sibling::div[1]'))
    var chosenSpan = chosenContainer.element(by.css('.chosen-single span'))

    return chosenSpan.getText()
  }
}

export class SweetAlertWidget {
  static ok() {
    var expected = protractor.ExpectedConditions
    var sweetAlertContainer = $('.sweet-alert')

    var okBtn = sweetAlertContainer.$('button.confirm')
    browser.wait(expected.elementToBeClickable(okBtn), constants.TIMEOUT_TIME)
    browser.sleep(2000)
    okBtn.click()
  }
}

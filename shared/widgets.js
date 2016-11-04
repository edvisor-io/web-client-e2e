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
    browser.wait(expected.elementToBeClickable(inputElement), constants.TIMEOUT_TIME)

    inputElement.click()
    let datePicker = $('.pika-single.is-bound:not(.is-hidden)')
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    let monthContainer = datePicker.$('.pika-select-month')
    monthContainer.element(by.cssContainingText('option', month)).click()

    inputElement.click()
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    let yearContainer = datePicker.$('.pika-select-year')
    yearContainer.element(by.cssContainingText('option', year)).click()

    inputElement.click()
    browser.wait(expected.visibilityOf(datePicker), constants.TIMEOUT_TIME)
    let dayContainer = datePicker.$(`[data-pika-day="${day}"]`)
    dayContainer.click()
  }
}

export class ChosenWidget {
  static getChosenContainer(element) {
    return element.element(by.xpath('following-sibling::div[1]'))
  }

  static setChosenValue(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearchElement = chosenContainer.$('.chosen-search input')
    let chosenResultsElement = chosenContainer.$('.chosen-results')

    chosenContainer.click()
    chosenContainer.click()
    browser.wait(expected.visibilityOf(chosenResultsElement), constants.TIMEOUT_TIME)
    chosenSearchElement.sendKeys(value)

    chosenResultsElement.all(by.cssContainingText('li', value)).first().click()
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

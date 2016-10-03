import constants from './constants'

export class UISelectWidget {
  static clickUiSelect(elem, option) {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(elem), constants.TIMEOUT_TIME)
    var chooseElem = elem.element(by.css('.ui-select-search'))

    elem.click()
    chooseElem.sendKeys(option)

    var choices = elem.all(by.css('.ui-select-choices-row'))

    browser.wait(function() {
      return choices.count().then(function(count) {
        return count > 0
      })
    }, constants.TIMEOUT_TIME)

    var firstOption = choices.first().all(by.css('div')).first()
    browser.wait(expected.elementToBeClickable(firstOption), constants.TIMEOUT_TIME)
    firstOption.click()
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
  static getChosenContainer(selectElement) {
    var chosenContainer = selectElement.element(by.xpath('following-sibling::div[1]'))
    return chosenContainer
  }

  static setChosenValue(ele, val) {
    var expected = protractor.ExpectedConditions
    var chosenContainer = ChosenWidget.getChosenContainer(ele)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    var chosenSearch = chosenContainer.element(by.css('.chosen-search input'))
    var chosenResults = chosenContainer.element(by.css('.chosen-results'))
    chosenContainer.click()

    browser.wait(expected.visibilityOf(chosenResults), constants.TIMEOUT_TIME)
    chosenSearch.sendKeys(val)

    chosenResults.all(by.cssContainingText('li', val)).first().click()
  }

  static searchAndSetChosenValue(element, value) {
    let expected = protractor.ExpectedConditions
    let chosenContainer = ChosenWidget.getChosenContainer(element)
    browser.wait(expected.visibilityOf(chosenContainer), constants.TIMEOUT_TIME)

    let chosenSearch = chosenContainer.element(by.css('.search-field input'))
    let chosenResults = chosenContainer.element(by.css('.chosen-results'))
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

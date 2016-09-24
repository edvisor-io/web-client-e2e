import constants from './constants'

// export class UISelectWidget {}
// export class DatePickerWidget {}

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

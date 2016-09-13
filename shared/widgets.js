export default class Widgets {

  static clickUiSelect(element) {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(element), 5000)

    element.click()
  }

  static getChosenContainer(selectElement) {
    var chosenContainer = selectElement.element(by.xpath('following-sibling::div[1]'))
    return chosenContainer
  }

  static setChosenValue(ele, val) {
    var expected = protractor.ExpectedConditions
    var chosenContainer = Widgets.getChosenContainer(ele)
    browser.wait(expected.visibilityOf(chosenContainer), 5000)

    var chosenSearch = chosenContainer.element(by.css('.chosen-search input'))
    var chosenResults = chosenContainer.element(by.css('.chosen-results'))
    chosenContainer.click()

    browser.wait(expected.visibilityOf(chosenResults), 5000)
    chosenSearch.sendKeys(val)

    // chosenResults.all(by.css('li')).first().click()
    chosenResults.all(by.cssContainingText('li', val)).first().click()
  }

  static getChosenValue(ele) {
    var chosenContainer = ele.element(by.xpath('following-sibling::div[1]'))
    var chosenSpan = chosenContainer.element(by.css('.chosen-single span'))

    return chosenSpan.getText()
  }

//   exports.getChosenContainer = function(selectElement) {
//   var chosenContainer = selectElement.element(by.xpath('following-sibling::div[1]'))
//   return chosenContainer
// }

// exports.setChosenValue = function(ele, val) {
//   var chosenContainer = exports.getChosenContainer(ele)
//   browser.wait(expected.visibilityOf(chosenContainer), 5000)

//   var chosenSearch = chosenContainer.element(by.css('.chosen-search input'))
//   var chosenResults = chosenContainer.element(by.css('.chosen-results'))
//   chosenContainer.click()

//   browser.wait(expected.visibilityOf(chosenResults), 5000)
//   // chosenSearch.sendKeys(val)

//   // chosenResults.all(by.css('li')).first().click()
//   chosenResults.all(by.cssContainingText('li', val)).first().click()
// }
}

// export class UISelectWidget {}
// export class DatePickerWidget {}

export class ChosenWidget {
  static getChosenContainer(selectElement) {
    var chosenContainer = selectElement.element(by.xpath('following-sibling::div[1]'))
    return chosenContainer
  }

  static setChosenValue(ele, val) {
    var expected = protractor.ExpectedConditions
    var chosenContainer = Widgets.getChosenContainer(ele)
    browser.wait(expected.visibilityOf(chosenContainer), 5000)

    var chosenSearch = chosenContainer.element(by.css('.chosen-search input'))
    var chosenResults = chosenContainer.element(by.css('.chosen-results'))
    chosenContainer.click()

    browser.wait(expected.visibilityOf(chosenResults), 5000)
    chosenSearch.sendKeys(val)

    // chosenResults.all(by.css('li')).first().click()
    chosenResults.all(by.cssContainingText('li', val)).first().click()
  }

  static getChosenValue(ele) {
    var chosenContainer = ele.element(by.xpath('following-sibling::div[1]'))
    var chosenSpan = chosenContainer.element(by.css('.chosen-single span'))

    return chosenSpan.getText()
  }
}

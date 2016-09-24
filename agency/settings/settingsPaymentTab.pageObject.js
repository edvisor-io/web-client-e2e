import {SweetAlertWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

class PaymentTab {
  constructor() {
    this.subscriptionArea = $('.setting_page_information')
    this.changeUsersAndSubscriptionButton = this.subscriptionArea
      .element(by.id('ext01-change-credit-card'))
    this.decrementButton = this.subscriptionArea
      .all(by.css('.subscription-button-number')).first()
    this.incrementButton = this.subscriptionArea
      .all(by.css('.subscription-button-number')).last()
    this.changeSubscriptionButton = this.subscriptionArea
      .element(by.id('ext01-change-subscription'))
  }

  clickChangeUsersAndSubscriptionButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.changeUsersAndSubscriptionButton), constants.TIMEOUT_TIME)
    this.changeUsersAndSubscriptionButton.click()
  }

  clickIncrementButton() {
    this.incrementButton.click()
  }

  clickDecrementButton() {
    this.decrementButton.click()
  }

  clickChangeSubscriptionButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.changeSubscriptionButton), constants.TIMEOUT_TIME)
    this.changeSubscriptionButton.click()
  }

  clickOkButton() {
    SweetAlertWidget.ok()
  }

  changeValueInSlotsField(originalNumber, targetNumber) {
    if (originalNumber > targetNumber) {
      for (let i = originalNumber; i > targetNumber; i--) {
        this.clickDecrementButton()
      }
    } else if (originalNumber < targetNumber) {
      for (let i = originalNumber; i < targetNumber; i++) {
        this.clickIncrementButton()
      }
    }
  }

  changeSubscription(originalNumber, targetNumber) {
    this.clickChangeUsersAndSubscriptionButton()
    this.changeValueInSlotsField(originalNumber, targetNumber)
    if (originalNumber !== targetNumber) {
      this.clickChangeSubscriptionButton()
      this.clickOkButton()
    }
  }
}

export default PaymentTab

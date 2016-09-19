import {SweetAlertWidget} from '../../shared/widgets'

class PaymentTab {
  constructor() {
    this.subscriptionArea = $('.setting_page_information')
    this.changeUsersAndSubscriptionButton = this.subscriptionArea
      .element(by.id('ext01-change-credit-card'))
    this.incrementButton = this.subscriptionArea
      .all(by.css('.subscription-button-number')).last()
    this.changeSubscriptionButton = this.subscriptionArea
      .element(by.id('ext01-change-subscription'))
  }

  clickChangeUsersAndSubscriptionButton() {
    this.changeUsersAndSubscriptionButton.click()
  }

  clickIncrementButton() {
    this.incrementButton.click()
  }

  clickChangeSubscriptionButton() {
    this.changeSubscriptionButton.click()
  }

  clickOkButton() {
    SweetAlertWidget.ok()
  }
}

export default PaymentTab

import constants from '../../shared/constants'

export default class QuotesListingPage {
  constructor() {
    this.container = element(by.id('ext06-listings'))

    this.newButton = this.container.element(by.id('ext06-listing-search-btn'))
    this.firstQuoteId = this.container
      .all(by.css('div.ag-body-container > div a')).get(0)
  }

  clickNewButton() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.newButton), constants.TIMEOUT_TIME)
    this.newButton.click()
  }

  clickFirstQuote() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.firstQuoteId), constants.TIMEOUT_TIME)
    this.firstQuoteId.click()
  }
}

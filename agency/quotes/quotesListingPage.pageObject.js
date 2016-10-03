export default class QuotesListingPage {
  constructor() {
    this.container = element(by.id('ext06-listings'))

    this.newButton = this.container.element(by.id('ext06-listing-search-btn'))
    this.firstQuoteId = this.container
      .all(by.css('div.ag-body-container > div a')).get(0)
  }

  clickNewButton() {
    this.newButton.click()
  }

  clickFirstQuote() {
    this.firstQuoteId.click()
  }
}

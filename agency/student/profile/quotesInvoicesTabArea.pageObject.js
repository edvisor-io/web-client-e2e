export default class QuotesInvoicesTabArea {
  constructor() {
    this.newInvoiceButton = element(by.id('ext02-new-invoice'))
    this.newQuoteV1Button = element(by.id('ext02-new-quote'))
  }

  clickNewQuoteV1Button() {
    this.newQuoteV1Button.click()
  }
}

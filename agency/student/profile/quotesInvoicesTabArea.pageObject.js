export default class QuotesInvoicesTabArea {
  constructor() {
    this.newInvoiceButton = element(by.id('ext02-new-invoice'))

    this.newQuoteV1Button = element(by.id('ext02-new-quote'))
    this.quotesV1ListRows = element.all(by.repeater('quote in student.quotes'))
  }

  clickNewQuoteV1Button() {
    this.newQuoteV1Button.click()
  }
}

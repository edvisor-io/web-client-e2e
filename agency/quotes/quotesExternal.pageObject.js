export default class QuotesExternal {
  constructor() {
    this.priceArea = element(by.id('PRICE'))
    this.totalRow = this.priceArea.$('div.quote-option_summary-total')
  }
}

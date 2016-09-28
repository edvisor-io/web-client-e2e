import QuotesOptionEditPage from './quotesOptionEditPage.pageObject'

export default class QuotesEditPage {
  constructor() {
    this.QuotesOptionEditPage = QuotesOptionEditPage

    this.firstOption = $('#ext06-edit-summary div.quote-option_flex')
    this.firstOptionEditButton = this.firstOption.all(by.css('button')).get(0)

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickFirstOptionEditButton() {
    this.firstOptionEditButton.click()
  }
}

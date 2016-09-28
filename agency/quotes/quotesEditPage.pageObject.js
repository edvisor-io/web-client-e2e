// import QuotesOptionEditPage from './quotesOptionEditPage.pageObject'

class EmailQuoteModal {
  constructor() {
    this.container = $('student-quote-email')
    this.sendButton = this.container.$('button[type="submit"]')
  }

  clickSendButton() {
    this.sendButton.click()
  }
}

export default class QuotesEditPage {
  constructor() {
    this.EmailQuoteModal = EmailQuoteModal

    // this.QuotesOptionEditPage = QuotesOptionEditPage

    this.emailToStudentButton = element(by.id('ext06-email'))

    this.firstOption = $('#ext06-edit-summary div.quote-option_flex')
    this.firstOptionEditButton = this.firstOption.all(by.css('button')).get(0)

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickFirstOptionEditButton() {
    this.firstOptionEditButton.click()
  }

  clickEmailToStudentButton() {
    this.emailToStudentButton.click()
  }
}

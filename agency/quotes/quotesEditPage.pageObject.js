import {UISelectWidget, ChosenWidget} from '../../shared/widgets'

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

    this.emailToStudentButton = element(by.id('ext06-email'))
    this.previewQuoteButton = element(by.id('ext06-preview'))
    this.saveButton = element(by.id('ext06-new-save-btn'))

    this.quoteInfoContainer = element(by.id('ext06-new-ingo'))
    this.nameSearch = this.quoteInfoContainer
      .element(by.model('n.selectedStudent'))
    this.currencyDropdown = this.quoteInfoContainer
      .element(by.model('select.selection'))

    this.firstOption = $('#ext06-edit-summary div.quote-option_flex')
    this.firstOptionEditButton = this.firstOption.all(by.css('button')).get(0)
    this.totalInCustomCurrency = $('div.quote-option_summary-total div.row div:nth-child(2) > div')

    this.alertBoxMessage = $('.alert-box-message')
    this.alertSuccessMessage = $('div.alert-success')
    this.confirmChangeContinueButton = element.all(by.css('div.e-alert_buttons button')).last()
  }

  inputNameSearch(input = 'Barack') {
    UISelectWidget.clickUISelect(this.nameSearch, input)
  }

  clickSaveButton() { // deprecated, remove when replaced
    this.saveButton.click()
  }

  saveQuote(searchTerm = 'T') {
    this.inputNameSearch(searchTerm)
    this.confirmChangeContinueButton.click()
    this.saveButton.click()
  }

  selectCurrencyFromDropdown(currency = 'ALL') {
    ChosenWidget.setChosenValue(this.currencyDropdown, currency)
  }

  clickFirstOptionEditButton() {
    this.firstOptionEditButton.click()
  }

  clickEmailToStudentButton() {
    this.emailToStudentButton.click()
  }
}

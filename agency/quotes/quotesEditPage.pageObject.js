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

    this.quoteInfoContainer = element(by.id('ext06-new-ingo'))
    this.nameSearch = this.quoteInfoContainer
      .element(by.model('n.selectedStudent'))
    this.currencyDropdown = this.quoteInfoContainer
      .element(by.model('select.selection'))

    this.firstOption = $('#ext06-edit-summary div.quote-option_flex')
    this.firstOptionEditButton = this.firstOption.all(by.css('button')).get(0)
    this.totalInCustomCurrency = $('div.quote-option_summary-total div.row div:nth-child(2) > div')

    this.alertBoxMessage = $('.alert-box-message')
  }

  inputNameSearch(input) {
    UISelectWidget.clickUiSelect(this.nameSearch, input)
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

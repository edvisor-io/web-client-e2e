import QuotesListingPage from './quotesListingPage.pageObject'
import QuotesEditPage from './quotesEditPage.pageObject'
import {UISelectWidget} from '../../shared/widgets'

export class QuotesPage {
  constructor() {
    this.QuotesListingPage = QuotesListingPage
    this.QuotesEditPage = QuotesEditPage

    this.quoteInfoContainer = element(by.id('ext06-new-ingo'))

    this.nameSearch = this.quoteInfoContainer.element(by.model('n.selectedStudent'))
    this.firstSearchResult = $('.ui-select-choices-row-inner')
    this.saveButton = element(by.id('ext06-new-save-btn'))
    this.alertBoxMessage = $('span.alert-box-message')
  }

  inputNameSearch(input) {
    UISelectWidget.clickUiSelect(this.nameSearch, input)
  }

  clickFirstResult() {
    this.firstSearchResult.click()
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

export default QuotesPage

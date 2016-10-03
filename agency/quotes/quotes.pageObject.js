import QuotesListingPage from './quotesListingPage.pageObject'
import QuotesEditPage from './quotesEditPage.pageObject'
import QuotesOptionEditPage from './quotesOptionEditPage.pageObject'
import constants from '../../shared/constants'

export class QuotesPage {
  constructor() {
    this.QuotesListingPage = QuotesListingPage
    this.QuotesEditPage = QuotesEditPage
    this.QuotesOptionEditPage = QuotesOptionEditPage

    this.firstSearchResult = $('.ui-select-choices-row-inner')
    this.saveButton = element(by.id('ext06-new-save-btn'))
    this.alertBoxMessage = $('span.alert-box-message')
  }

  static waitForQuoteReloadElement() {
    var quoteReloadElement = $('div.reload-box-overlay div.quote-reload')

    // wait until the quoteReloadElement has disappeared
    browser.wait(() => {
      return browser.isElementPresent(quoteReloadElement).then((presenceOfElement) => {
        return !presenceOfElement
      })
    }, constants.TIMEOUT_TIME)
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

export default QuotesPage

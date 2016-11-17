import QuotesListingPage from './quotesListingPage.pageObject'
import QuotesEditPage from './quotesEditPage.pageObject'
import QuotesOptionEditPage from './quotesOptionEditPage.pageObject'
import QuotesExternal from './quotesExternal.pageObject'
import constants from '../../shared/constants'

export class QuotesPage {
  constructor() {
    this.QuotesListingPage = QuotesListingPage
    this.QuotesEditPage = QuotesEditPage
    this.QuotesOptionEditPage = QuotesOptionEditPage
    this.QuotesExternal = QuotesExternal

    this.firstSearchResult = $('.ui-select-choices-row-inner')
    // this.saveButton = element(by.id('ext06-new-save-btn')) // element no longer exists
    this.alertBoxMessage = $('span.alert-box-message') // deprecated, use more specific element below
    this.alertSuccessMessage = $('div.alert-success')
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

  // clickSaveButton() { // element no longer exists
  //   this.saveButton.click()
  // }
}

export default QuotesPage

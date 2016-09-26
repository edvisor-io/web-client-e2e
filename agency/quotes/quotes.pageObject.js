import constants from '../../shared/constants'
import {UISelectWidget} from '../../shared/widgets'

export class QuotesPage {
  constructor() {
    this.quoteInfoContainer = element(by.id('ext06-new-ingo'))

    this.nameSearch = this.quoteInfoContainer.element(by.model('n.selectedStudent'))
    this.firstSearchResult = $('.ui-select-choices-row-inner')
    this.saveButton = element(by.id('ext06-new-save-btn'))
    this.alertBoxMessage = $('span.alert-box-message')
  }

  inputNameSearch(input) {
    // let expected = protractor.ExpectedConditions
    // browser.wait(expected.elementToBeClickable(this.nameSearch), constants.TIMEOUT_TIME)

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

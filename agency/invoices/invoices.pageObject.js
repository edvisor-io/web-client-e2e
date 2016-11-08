import constants from '../../shared/constants'

export default class Invoices {
  constructor() {
    this.nextButton = element(by.id('breadcrumb-next-button'))
    this.saveButton = element(by.id('breadcrumb-save-button'))
    this.startApplicationButton = element(by.id('ext10-start-application'))
  }

  clickNextThroughNewInvoiceSteps() {
    for (let c = 0; c < 2; c++) {
      this.nextButton.click()
      browser.sleep(constants.SLEEP_SHORT)
    }
  }
}

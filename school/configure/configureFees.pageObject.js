import constants from '../../shared/constants'
import uuid from 'node-uuid'

class FeePage {
  constructor() {
    this.feeNameField = $('input[name="name"]')
    this.saveButton = $('button[type="submit"]')
    this.backToFeesButton = $('#ext20-back')
    this.deleteFeeButton = element(by.id('ext20-edit-delete'))
    this.confirmDeleteYesButton = $('button.btn--danger')
  }

  clickBackToFeesButton() {
    this.backToFeesButton.click()
  }

  fillAndSaveForm(name = `${uuid.v4()}`) {
    browser.sleep(constants.SLEEP_SHORT)
    this.feeNameField.sendKeys(name)
    this.saveButton.click()
  }
}

export class ConfigureFeesPage {
  constructor() {
    this.feePage = FeePage

    this.newFeeButton = $('div.listing_actions button')

    this.feeNameColumnHeader = element.all(by.css('span.ag-header-cell-text')).first()
    this.firstFeeNameInList = element.all(by.css('div.fee_name a')).first()
  }

  clickNewFeeButton() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.newFeeButton), constants.TIMEOUT_TIME)
    this.newFeeButton.click()
  }

  goToFeesListing() {
    const feePage = new FeePage()
    feePage.clickBackToFeesButton()
  }

  createNewFee(name) {
    this.clickNewFeeButton()
    const feePage = new FeePage()
    feePage.fillAndSaveForm(name)
  }

  sortByFeeName() {
    this.feeNameColumnHeader.click()
    browser.sleep(constants.SLEEP_SHORT)
  }

  deleteFirstFee() {
    const feePage = new FeePage()
    this.firstFeeNameInList.click()
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(feePage.deleteFeeButton), constants.TIMEOUT_TIME)
    feePage.deleteFeeButton.click()
    feePage.confirmDeleteYesButton.click()
  }
}

export default ConfigureFeesPage

import uuid from 'node-uuid'

class NewFeePage {
  constructor() {
    this.feeNameField = $('input[name="name"]')
    this.saveButton = $('button[type="submit"]')
    this.backToFeesButton = $('#ext20-back')
  }

  clickBackToFeesButton() {
    this.backToFeesButton.click()
  }

  fillAndSaveForm(name = `${uuid.v4()}`) {
    this.feeNameField.sendKeys(name)
    this.saveButton.click()
  }
}

export class FeesPage {
  constructor() {
    this.newFeePage = NewFeePage
    this.newFeeButton = $('div.listing_actions button')
    this.lastFeeNameInList = element.all(by.css('div.fee_name')).last()
  }

  clickNewFeeButton() {
    this.newFeeButton.click()
  }

  goToFeesListing() {
    const newFeePage = new NewFeePage()
    newFeePage.clickBackToFeesButton()
  }

  createNewFee(name) {
    this.clickNewFeeButton()
    const newFeePage = new NewFeePage()
    newFeePage.fillAndSaveForm(name)
  }
}

export default FeesPage

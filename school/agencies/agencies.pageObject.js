class AgenciesPage {
  constructor() {
    this.addAgencyButton = $('div.listing_actions > button')

    this.addAgencyModal = $('div.e-modal-container')
    this.connectByEmailButton = this.addAgencyModal.$('div.company-new_add > button')
    this.emailField = this.addAgencyModal.$('input')
    this.sendButton = this.addAgencyModal.$('button[type="submit"]')
    this.addByIDField = this.addAgencyModal.$('form.company-new_name input')
    this.addButton = this.addAgencyModal.$('form.company-new_name button[type="submit"]')

    this.alertBoxMessage = $('span.alert-box-message')
  }

  clickAddAgencyButton() {
    this.addAgencyButton.click()
  }

  clickConnectByEmailButton() {
    this.connectByEmailButton.click()
  }

  clickSendButton() {
    this.sendButton.click()
  }

  sendEmail(email = 'tricia.macmillan@earth.io') {
    this.emailField.clear()
    this.emailField.sendKeys(email)
    this.clickSendButton()
  }

  inputIntoAddByIDField(id = 'id01') {
    this.addByIDField.clear()
    this.addByIDField.sendKeys(id)
  }

  clickAddButton() {
    this.addButton.click()
  }
}

export default AgenciesPage

class SchoolsListingPage {
  constructor() {
    this.addSchoolButton = element(by.id('ext08-new-company-btn'))

    this.addSchoolModal = element(by.id('ext08-new-company-modal'))
    this.connectByEmailButton = this.addSchoolModal.all(by.css('div.company-new_add button')).last()
    this.emailField = this.addSchoolModal.$('input')
    this.sendButton = this.addSchoolModal.$('button[type="submit"]')
    // this.changeIDButton = this.addSchoolModal.$('button.company-new_change')
    this.setIDField = this.addSchoolModal.$('form.company-new_edit input')
    this.saveButton = this.addSchoolModal.$('form.company-new_edit button[type="submit"]')

    this.alertBoxMessage = $('span.alert-box-message')
    this.requestsAlert = $('#ext08-requests')
  }

  clickAddSchoolButton() {
    this.addSchoolButton.click()
  }

  clickConnectByEmailButton() {
    this.connectByEmailButton.click()
  }

  inputEmail(email = 'marvin@heartofgold.com') {
    this.emailField.sendKeys(email)
  }

  clickSendButton() {
    this.sendButton.click()
  }

  sendEmail() {
    this.inputEmail()
    this.clickSendButton()
  }

  // clickChangeIDButton() {
  //   this.changeIDButton.click()
  // }

  inputIntoSetIDField(id = 'id01') {
    this.setIDField.clear()
    this.setIDField.sendKeys(id)
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

export default SchoolsListingPage

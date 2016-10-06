export default class NewApplicationPage {
  constructor() {
    this.navBar = $('#ext11-new-breadcrumb')
    this.nextButton = this.navBar.$('button.btn-primary')
  }

  clickNextButton() {
    this.nextButton.click()
  }
}

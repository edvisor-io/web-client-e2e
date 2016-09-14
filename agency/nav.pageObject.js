export default class AgencyNav {
  constructor() {
    this.header = element(by.css('header'))
    this.navBar = element(by.css('.sidebar > ul'))
  }

  goToStudents() {
    let link = element(by.id('ext28-students'))
    link.click()
  }
}

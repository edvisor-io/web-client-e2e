export default class AgencyNav {
  constructor() {
    this.navSidebar = element(by.css('.sidebar > ul'))
    this.studentsButton = this.navSidebar.element(by.id('ext28-students'))
  }

  goToStudents() {
    this.studentsButton.click()
  }
}

// import Widgets from '../../../../shared/test_helpers/e2e/widgets'

export default class StudentProfilePage {
  constructor() {
    this.container = element(by.css('section.student-profile'))
    this.informationContainer = this.container.element(by.css('student-edit-information'))
    this.studentSidebarOwnerContainer = this.container.element(by.css('student-sidebar-owner'))

    this.assignedToLabel = this.studentSidebarOwnerContainer.element(by.css('photo-initials + div > p'))
    this.firstnameField = this.informationContainer.element(by.name('firstname'))
    this.lastnameField = this.informationContainer.element(by.name('lastname'))
    this.emailField = this.informationContainer.element(by.name('email'))
    this.nationalityField = this.informationContainer.element(by.name('nationality'))
  }
}

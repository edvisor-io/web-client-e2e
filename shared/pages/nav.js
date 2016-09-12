class AgencyNav {
  constructor() {
    this.header = element(by.css('header'))
    this.navBar = element(by.css('.sidebar > ul'))
  }

  goToStudents() {
    var link = element(by.id('ext28-students'))
    link.click()
  }
}

class SchoolNav {}

export {
  AgencyNav,
  SchoolNav
}
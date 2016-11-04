export default class BatchOptions {
  constructor() {
    this.selectAllStudentsCheckbox = $('div.ag-header-cell-label label.checkbox')
    this.assignButton = $('#ext02-listings-assign-btn')

    this.assignDropdownOptions = element.all(by.css('div.assign div.menu-container > ul > li'))
    this.firstUserInDropdown = this.assignDropdownOptions.first()
    this.lastOfficeInDropdown = this.assignDropdownOptions.last()
    this.firstOwnerOption = element.all(by
      .css('div.assign div.menu-container > ul.submenu.open > div > li')).first()
  }
}

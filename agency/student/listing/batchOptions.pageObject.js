export default class BatchOptions {
  constructor() {
    this.selectAllStudentsCheckbox = $('div.ag-header-cell-label label.checkbox')
    this.assignButton = $('#ext02-listings-assign-btn')
    this.lastOfficeInDropdown = element.all(by
      .css('div.assign div.menu-container > ul > li')).last()
    this.firstOwnerOption = element.all(by
      .css('div.assign div.menu-container > ul.submenu.open > div > li')).first()
  }
}

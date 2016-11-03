export default class ListArea {
  constructor() {
    this.container = $('.students-table')
    
    this.firstStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(0)
    this.secondStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(1)
    this.checkboxElements = element.all(by.css('.students-table div.ag-cell label.checkbox'))
    this.firstStudentInTable = this.container
      .all(by.css('.table-student-name')).get(0)
    this.firstStudentInTableCheckboxContainer = this.container
    .all(by.css('div.ag-cell')).first()
  }

  clickFirstStudentInTable() {
    this.firstStudentInTable.click()
  }
}

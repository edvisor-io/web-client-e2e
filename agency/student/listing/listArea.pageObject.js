export default class ListArea {
  constructor() {
    this.firstStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(0)
    this.secondStudentCheckbox = element.all(by.css('div.ag-cell label.checkbox')).get(1)
    
    this.checkboxElements = element.all(by.css('.students-table div.ag-cell label.checkbox'))
    this.firstStudentInTable = this.studentsTableContainer
      .all(by.css('.table-student-name')).get(0)
  }

  clickFirstStudentInTable() {
    this.firstStudentInTable.click()
  }
}

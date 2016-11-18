export default class ListArea {
  constructor() {
    this.container = $('.students-table')

    this.checkboxElements = this.container.all(by.css('div.ag-cell label.checkbox'))
    this.firstStudentCheckbox = this.checkboxElements.get(0)
    this.secondStudentCheckbox = this.checkboxElements.get(1)
    this.thirdStudentCheckbox = this.checkboxElements.get(2)
    this.fourthStudentCheckbox = this.checkboxElements.get(3)
    this.fifthStudentCheckbox = this.checkboxElements.get(4)

    this.studentsInTable = this.container.all(by.css('.table-student-name > a'))
    this.firstStudentInTable = this.studentsInTable.get(0)
    this.secondStudentInTable = this.studentsInTable.get(1)
    this.thirdStudentInTable = this.studentsInTable.get(2)
    this.fourthStudentInTable = this.studentsInTable.get(3)
    this.fifthStudentInTable = this.studentsInTable.get(4)

    this.firstStudentInTableCheckboxContainer = this.container
    .all(by.css('div.ag-cell')).first()
  }
}

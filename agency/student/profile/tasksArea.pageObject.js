export default class TasksArea {
  constructor() {
    this.container = $('.sidebar-tasks')
    this.allTaskElements = this.container.all(by.css('task-entry'))
    
    this.taskTitleField = this.container.element(by.model('addTask.data.details'))
    this.taskDatePicker = this.container.element(by.model('data.date'))
    this.taskTimeDropdown = this.container.element(by.model('data.time'))
    this.assignToField = this.container.$('select + div')
    this.submitTaskButton = this.container.$('button[type="submit"]')
  }

  fillAndSaveNewTaskForm(taskTitle, dueTime) {
    this.taskTitleField.sendKeys(taskTitle)
    this.taskTimeDropdown.sendKeys(dueTime)
    this.submitTaskButton.click()
  }
}

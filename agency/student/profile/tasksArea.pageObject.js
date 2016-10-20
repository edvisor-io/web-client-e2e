export default class TasksArea {
  constructor() {
    this.tasksContainer = $('.sidebar-tasks')
    this.taskTitleField = this.tasksContainer
      .element(by.model('addTask.data.details'))
    this.taskDatePicker = this.tasksContainer
      .element(by.model('data.date'))
    this.taskTimeDropdown = this.tasksContainer.element(by.model('data.time'))
    this.assignToField = this.tasksContainer.$('select + div')
    this.submitTaskButton = this.tasksContainer.$('button[type="submit"]')
  }

  fillAndSaveNewTaskForm(taskTitle, dueTime) {
    this.taskTitleField.sendKeys(taskTitle)
    this.taskTimeDropdown.sendKeys(dueTime)
    this.submitTaskButton.click()
  }
}

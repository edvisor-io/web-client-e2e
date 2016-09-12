/*eslint-disable */
import NewStudent from '../pages/students_listings.pages.js'
import Tasks from '../pages/tasks.pages.js'

describe('E2E: task sidebar section', () =>{
  it('should add a new task', () => {
    const FIRST_NAME = 'Task'
    const LAST_NAME = 'Student'
    const TITLE = 'eating ice cream'
    const DATE = {
      month: 'October',
      day: 14,
      year: 2017
    }

    var newStudent = new NewStudent(),
    tasks = new Tasks(),
    expected = protractor.ExpectedConditions

    newStudent.create(FIRST_NAME, LAST_NAME)

    tasks.openTaskSlider()
    tasks.addNewTask(TITLE, FIRST_NAME, LAST_NAME, DATE)

    browser.wait(expected.visibilityOf(tasks.laterItem), 3000)
    tasks.openEditTask()
    
    expect(tasks.editDetails.getAttribute('value')).toEqual(TITLE)
    expect(tasks.dateInput.getAttribute('value')).toEqual(`10/${DATE.day}/${DATE.year}`)

    tasks.cancel()
  })

  it('should edit an existing task', function(){
    const TITLE = 'not eating ice cream'
    const DATE = {
      month: 'October',
      day: 14,
      year: 2017
    }
    
    const TIME = '10:00am' // for 10am
    const ASSIGNEE = 'Shelley Chen'

    var newStudent = new NewStudent(),
    tasks = new Tasks(),
    expected = protractor.ExpectedConditions

    tasks.openEditTask()
    tasks.editTask(TITLE, DATE, TIME, ASSIGNEE)

    browser.wait(expected.visibilityOf(tasks.laterItem), 3000)
    tasks.openEditTask()

    expect(tasks.editDetails.getAttribute('value')).toEqual(TITLE);
    expect(tasks.dateInput.getAttribute('value')).toEqual(`10/${DATE.day}/${DATE.year}`);
    expect(tasks.assigneeInput.getText()).toEqual(ASSIGNEE);

    tasks.cancel()
  })

})
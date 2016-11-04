export default class NotesArea {
  constructor() {
    this.container = element(by.id('ext02-notes'))
    this.field = this.container.$('textarea[name="edit"]')
    this.saveButton = this.container.$('button[type="submit"]')
  }

  inputTextIntoField(text = 'Mind the gap') {
    this.field.clear()
    this.field.sendKeys(text)
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

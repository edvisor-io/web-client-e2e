export default class FilesTabArea {
  constructor() {
    this.container = $('student-edit-files')
    this.fileRows = this.container.all(by.repeater('file in items | orderBy: fileOrder.expr track by file.fileId'))
    this.deleteButtons = this.fileRows.all(by.css('td.files_control a'))
    this.lastRowFileName = this.fileRows.last().$('td.files_name a')
    this.lastRowDeleteButton = this.deleteButtons.last()
    this.fileUpload = element.all(by.css('input[type="file"]')).first() // changed for pre-weedle master. weedle may differ.
  }
}

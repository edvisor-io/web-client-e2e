export default class FilesTabArea {
  constructor() {
    this.fileUpload = element.all(by.css('input[type="file"]')).first()
    this.fileRows = element.all(by.repeater('file in items | orderBy: fileOrder.expr track by file.fileId'))
    this.deleteButtons = this.fileRows.all(by.css('td.files_control a'))
    this.lastRowDeleteButton = this.deleteButtons.last()
  }
}

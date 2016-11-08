import {UISelectWidget} from '../../../shared/widgets'

export default class ArchiveStudentModal {
  constructor() {
    this.container = element(by.id('ext02-archive'))
    this.reasonForArchivingField = this.container.$('div.ui-select-container')
    this.archiveStudentConfirmButton = this.container.$('button[type="submit"]')
  }

  inputReason(reason = 'Finished Studying') {
    UISelectWidget.clickUISelect(this.reasonForArchivingField, reason)
  }

  fillAndSaveForm() {
    this.inputReason()
    this.archiveStudentConfirmButton.click()
  }
}

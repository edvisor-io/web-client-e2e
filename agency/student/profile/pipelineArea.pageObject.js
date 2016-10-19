import constants from '../../../shared/constants'

export default class PipelineArea {
  constructor() {
    this.container = element(by.tagName('student-sidebar-pipelines'))

    this.changePipelineFirstButton = this.container.all(by
      .css('.btn-group > button[type="button"]')).get(0)
    this.changePipelineStatusOption = this.container
      .$('button#this-pipeline-toggle')
    this.removeFromPipelineOption = this.container.all(by.css('button.btn-menu_item')).get(2)
    this.pipelineStatusSecondOption = this.container
      .$('div.student-status_status button:nth-child(2)')
    this.pipelineStatusThirdOption = this.container
      .$('div.student-status_status button:nth-child(3)')
    this.firstHeader = this.container.all(by.css('h5:nth-child(1)')).get(0)
    this.secondHeader = this.container.all(by.css('h5:nth-child(1)')).get(1)
    this.lastHeader = this.container.all(by.css('h5:nth-child(1)')).last()
    this.addToAnotherPipelineButton = this.container.$('button.btn--default')

    this.addToAnotherPipelineDropdown = this.container.$('ul.menu')
    this.addToAnotherPipelineFirstOption = this.addToAnotherPipelineDropdown
      .element(by.repeater('item in items').row(0))
    this.addToAnotherPipelineStatusesSecondOption = this.container
      .$('ul.open li:nth-child(2) a')

    this.lastCheckboxList = this.container
      .all(by.css('.student-status_list')).last()
    this.decidingStatusFirstCheckbox = this.lastCheckboxList
      .all(by.css('label.checkbox')).get(0)
    this.decidingStatusSecondCheckbox = this.lastCheckboxList
      .all(by.css('label.checkbox')).get(1)
    this.decidingStatusThirdCheckbox = this.lastCheckboxList
      .all(by.css('label.checkbox')).get(2)

    this.confirmRemoveButton = $('button.btn--danger')
  }

  clickChangePipelineFirstButton() {
    this.changePipelineFirstButton.click()
  }

  clickChangePipelineStatusOption() {
    this.changePipelineStatusOption.click()
  }

  clickPipelineStatusSecondOption() {
    this.pipelineStatusSecondOption.click()
  }

  clickAddToAnotherPipelineButton() {
    this.addToAnotherPipelineButton.click()
  }

  clickAddToAnotherPipelineFirstOption() {
    this.addToAnotherPipelineFirstOption.click()
  }

  clickAddToAnotherPipelineStatusesSecondOption() {
    this.addToAnotherPipelineStatusesSecondOption.click()
  }

  clickDecidingStatusThreeCheckboxes() {
    this.decidingStatusFirstCheckbox.click()
    this.decidingStatusSecondCheckbox.click()
    this.decidingStatusThirdCheckbox.click()
  }

  clickRemoveFromPipelineOption() {
    const EXPECTED = protractor.ExpectedConditions
    browser.wait(EXPECTED.elementToBeClickable(this.removeFromPipelineOption), constants.TIMEOUT_TIME)
    this.removeFromPipelineOption.click()
  }

  clickConfirmRemoveButton() {
    this.confirmRemoveButton.click()
  }
}

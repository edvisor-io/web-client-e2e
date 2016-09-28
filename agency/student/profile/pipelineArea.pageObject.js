export default class PipelineArea {
  constructor() {
    this.container = element(by.tagName('student-sidebar-pipelines'))

    this.changePipelineFirstButton = this.container.all(by
      .css('.btn-group-dropdown > button[type="button"]')).get(0)
    this.changePipelineStatusOption = this.container
      .$('button#this-pipeline-toggle')
    this.pipelineStatusSecondRelativeOption = this.container
      .$('div.student-status_status button:nth-child(2)')
    this.firstHeader = this.container.all(by.css('h5:nth-child(1)')).get(0)
    this.secondHeader = this.container.all(by.css('h5:nth-child(1)')).get(1)
    this.lastHeader = this.container.all(by.css('h5:nth-child(1)')).last()
    this.addToAnotherPipelineButton = this.container.$('button.btn-default')

    this.addToAnotherPipelineDropdown = this.container.$('ul.menu')
    this.addToAnotherPipelineFirstOption = this.addToAnotherPipelineDropdown
      .element(by.repeater('item in items').row(0))
    this.pipelineStatusesOpenedMenu = this.container.$('ul.open')
    this.pipelineStatusesSecondOption = this.pipelineStatusesOpenedMenu
      .$('li:nth-child(2) a')

    this.lastCheckboxList = this.container
      .all(by.css('.student-status_list')).last()
    this.decidingStatusFirstCheckbox = this.lastCheckboxList
      .all(by.css('input[type="checkbox"]')).get(0)
    this.decidingStatusSecondCheckbox = this.lastCheckboxList
      .all(by.css('input[type="checkbox"]')).get(1)
    this.decidingStatusThirdCheckbox = this.lastCheckboxList
      .all(by.css('input[type="checkbox"]')).get(2)
  }

  clickChangePipelineFirstButton() {
    this.changePipelineFirstButton.click()
  }

  clickChangePipelineStatusOption() {
    this.changePipelineStatusOption.click()
  }

  clickPipelineStatusSecondRelativeOption() {
    this.pipelineStatusSecondRelativeOption.click()
  }

  clickAddToAnotherPipelineButton() {
    this.addToAnotherPipelineButton.click()
  }

  clickAddToAnotherPipelineFirstOption() {
    this.addToAnotherPipelineFirstOption.click()
  }

  clickPipelineStatusesSecondOption() {
    this.pipelineStatusesSecondOption.click()
  }

  clickDecidingStatusThreeCheckboxes() {
    this.decidingStatusFirstCheckbox.click()
    this.decidingStatusSecondCheckbox.click()
    this.decidingStatusThirdCheckbox.click()
  }
}
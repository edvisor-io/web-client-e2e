export default class AgencyTab {
  constructor() {
    this.rowsInInformationTab = element.all(by.css('#ext01-agency-information-areas > div'))

    this.pipelineButton = element(by
      .repeater('menuItem in ::subMenu.selectionOptions track by menuItem.name')
      .row(2))
    this.firstPipelineCard = element(by
      .repeater('studentPipeline in pipelineCtrl.studentPipelines').row(0))
    this.firstDuplicateButton = this.firstPipelineCard
      .all(by.css('.btn-group-dropdown > .btn-default')).get(0)
  }

  clickPipelineButton() {
    this.pipelineButton.click()
  }

  clickDuplicateButton() {
    this.firstDuplicateButton.click()
  }
}

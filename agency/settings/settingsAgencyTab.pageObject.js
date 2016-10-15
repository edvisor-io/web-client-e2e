export default class AgencyTab {
  constructor() {
    // this.agencyTabInformationAreas = element.all(by.css('div.page-padding section')).get(3)
    this.headingsInInformationTab = element.all(by.css('div > div> div > h4'))

    this.pipelineButton = element(by
      .repeater('menuItem in ::subMenu.selectionOptions track by menuItem.name')
      .row(2))
    this.firstPipelineCard = element(by
      .repeater('studentPipeline in pipelineCtrl.studentPipelines').row(0))
    this.firstDuplicateButton = this.firstPipelineCard
      .all(by.css('.btn-group-dropdown > .btn--default')).get(0)
  }

  clickPipelineButton() {
    this.pipelineButton.click()
  }

  clickDuplicateButton() {
    this.firstDuplicateButton.click()
  }
}

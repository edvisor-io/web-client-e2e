export default class PipelineTab {
  constructor() {
    this.firstPipelineTab = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(0))
    this.secondPipelineTab = element(by.repeater('tab in tabs.items | limitTo: max track by $index').row(1))
    this.secondPipelineTabCountElement = this.secondPipelineTab.$('span.subtitle')
    this.thirdPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(2))
    this.fourthPipelineTab = element.all(by.repeater('tab in tabs.items | limitTo: max track by $index').row(3))
    this.pipelineTabsOverflowDropdown = element.all(by.css('#ext02-tab-selection > li')).last()
    this.lastPipelineTab = element.all(by.css('ul.inner-dropdown li')).last()
    this.lastPipelineTabTitleSpanElement = this.lastPipelineTab.all(by.css('span')).first()
  }
}

export default class FilterNavigationDownloadCustomizeBar {
  constructor() {
    this.container = element(by.id('ext02-filter-list'))
    this.filterListButton = element.all(by.css('#ext02-filter-list > div > div')).get(0)
    this.filterListFirstOption = element.all(by.css('#ext02-filter-list ul.menu > li')).get(0)
    this.filterListLastOption = element.all(by.css('#ext02-filter-list ul.menu > li')).last()
    this.filterListFirstOptionInFirstOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(0)
    this.filterListSecondOptionInFirstOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(1)
    // this.filterListFirstOptionInLastOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(345)
    this.filterListFirstOptionInLastOption = element.all(by.css('#ext02-filter-list div.submenu-inner > li')).get(0)
    // this.filterListFirstOptionInFirstOptionInLastOption = element.all(by.css('#ext02-filter-list div.menu-container ul.submenu > ul.submenu > div.submenu-inner > li')).get(184)
    this.filterListFirstOptionInFirstOptionInLastOption = element.all(by.css('#ext02-filter-list div.menu-container ul.submenu > ul.submenu > div.submenu-inner > li')).get(0)

    this.activeFilterElements = element.all(by.repeater('filter in filterListModel.activeFilters track by $index'))
    this.firstActiveFilterRemoveButton = this.activeFilterElements.first().$('svg')
    this.currentPageField = $('div.page-display input')
    this.nextButton = $('button.btn--default.next')

    this.exportButton = $('.action-bar #ext02-export-data')
  }
}

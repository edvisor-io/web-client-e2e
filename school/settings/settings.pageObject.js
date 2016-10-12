// import PersonalTab from './settingsPersonalTab.pageObject'
// import SchoolTab from './settingsSchoolTab.pageObject'
// import TeamTab from './settingsTeamTab.pageObject'
import CampusTab from './campus/campusTab.pageObject'

class SettingsPage {
  constructor() {
    // this.PersonalTab = PersonalTab
    // this.SchoolTab = SchoolTab
    // this.TeamTab = TeamTab
    this.CampusTab = CampusTab

    this.tabsContainer = $('.tab-selection')
    this.tabs = this.tabsContainer.all(by.css('li'))
  }

  goToCampusTab() {
    this.tabs.get(3).click()
  }
}

export default SettingsPage

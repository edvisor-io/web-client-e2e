// import PersonalTab from './settingsPersonalTab.pageObject'
// import SchoolTab from './settingsSchoolTab.pageObject'
// import TeamTab from './settingsTeamTab.pageObject'
import CampusTab from './campus/campusTab.pageObject'
import constants from '../../shared/constants'

class SettingsPage {
  constructor() {
    // this.PersonalTab = PersonalTab
    // this.SchoolTab = SchoolTab
    // this.TeamTab = TeamTab
    this.CampusTabArea = CampusTab

    this.tabsContainer = $('.tab-selection')
    this.tabs = this.tabsContainer.all(by.css('li'))
    this.campusTab = this.tabs.get(3)
  }

  goToCampusTab() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.campusTab), constants.TIMEOUT_TIME)
    this.campusTab.click()
  }
}

export default SettingsPage

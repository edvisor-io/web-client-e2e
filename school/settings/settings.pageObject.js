import PersonalTab from './settingsPersonalTab.pageObject'
import SchoolTab from './settingsSchoolTab.pageObject'
import TeamTab from './settingsTeamTab.pageObject'
import CampusTab from './settingsCampusTab.pageObject'

class SettingsPage {
  constructor() {
    this.PersonalTab = PersonalTab
    this.SchoolTab = SchoolTab
    this.TeamTab = TeamTab
    this.CampusTab = CampusTab
  }
}

export default SettingsPage

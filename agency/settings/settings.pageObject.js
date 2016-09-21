import {ChosenWidget, SweetAlertWidget} from '../../shared/widgets'
import AgencyTab from './agency_tab.pageObject.js'

class TeamMemberCard {
  constructor(cardElement) {
    this.name = cardElement.element(by.css('.card_title'))
  }
}

class TeamTabManageMembersPage {
  constructor() {
    this.TeamMember = TeamMemberCard
    this.sectionManagers = element(by.id('ext01-team-managers'))
    this.managers = element.all(by.css('#ext01-team-managers > div'))
  }
}

class TeamTabInvitePage {
  constructor() {
    this.inviteForm = element(by.id('ext01-team-invite'))
    this.firstname = this.inviteForm.element(by.name('firstname'))
    this.lastname = this.inviteForm.element(by.name('lastname'))
    this.email = this.inviteForm.element(by.name('email'))
    this.role = this.inviteForm.element(by.name('role'))
    this.office = this.inviteForm.element(by.name('office'))
    this.inviteBtn = this.inviteForm.element(by.css('button[type="submit"]'))
  }

  invite(firstname, lastname, email, role) {
    this.firstname.sendKeys(firstname)
    this.lastname.sendKeys(lastname)
    this.email.sendKeys(email)
    this.setRole('Manager')
    this.inviteBtn.click()
    SweetAlertWidget.ok()
  }

  setRole(roleName) {
    ChosenWidget.setChosenValue(this.role, roleName)
  }
}

class TeamTab {
  constructor() {
    this.Invite = TeamTabInvitePage
    this.ManageMembers = TeamTabManageMembersPage
  }
}

class SettingsPage {
  constructor() {
    this.tabContainer = element(by.id('ext01-settings-tabs'))
    this.tabs = this.tabContainer.all(by.css('li'))
    this.TeamTab = TeamTab
    this.AgencyTab = AgencyTab
  }

  goToPersonalTab() {
    this.tabs.get(0).click()
  }

  goToAgencyTab() {
    this.tabs.get(1).click()
  }

  goToTeamTab() {
    this.tabs.get(2).click()
  }

  goToCompanyTab() {
    this.tabs.get(3).click()
  }

  goToPaymentTab() {
    this.tabs.get(4).click()
  }
}

export default SettingsPage

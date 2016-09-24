import {ChosenWidget, SweetAlertWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

class TeamMemberCard {
  constructor(cardElement) {
    this.name = cardElement.element(by.css('.card_title'))
    this.editButton = cardElement.$('.card_edit')
  }
}

class ManageMembersArea {
  constructor() {
    this.TeamMember = TeamMemberCard
    this.sectionManagers = element(by.id('ext01-team-managers'))
    this.managers = element.all(by.css('#ext01-team-managers > div'))

    this.lastManagerCard = this.managers.last()
    this.lastManagerName = this.lastManagerCard.$('.card_title')
    this.lastManagerEditButton = this.lastManagerCard.$('.card_edit')
    this.lastManagerDeleteButton = this.lastManagerCard.$('#ext01-team-member-form-delete')
  }

  // getManagersCount() {
  //   return this.managers.count()
  // }

  clickLastManagerEditButton() {
    this.lastManagerEditButton.click()
  }

  clickLastManagerDeleteButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.lastManagerDeleteButton), constants.TIMEOUT_TIME)

    this.lastManagerDeleteButton.click()
  }

  clickDeleteButton() {
    SweetAlertWidget.ok()
  }
}

class InviteArea {
  constructor() {
    this.inviteForm = element(by.id('ext01-team-invite'))
    this.firstname = this.inviteForm.element(by.name('firstname'))
    this.lastname = this.inviteForm.element(by.name('lastname'))
    this.email = this.inviteForm.element(by.name('email'))
    this.role = this.inviteForm.element(by.name('role'))
    this.office = this.inviteForm.element(by.name('office'))
    this.inviteBtn = this.inviteForm.$('button[type="submit"]')
    this.slotsElement = element.all(by.css('div.subtext')).first()
    this.noSlotsAlert = $('.alert-danger')
  }

  invite(firstname, lastname, email, role) {
    this.firstname.sendKeys(firstname)
    this.lastname.sendKeys(lastname)
    this.email.sendKeys(email)
    this.setRole(role)
    this.inviteBtn.click()
    SweetAlertWidget.ok()
  }

  setRole(roleName) {
    ChosenWidget.setChosenValue(this.role, roleName)
  }
}

class TeamTab {
  constructor() {
    this.InviteArea = InviteArea
    this.ManageMembersArea = ManageMembersArea
  }
}

export default TeamTab

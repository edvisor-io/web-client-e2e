import {ChosenWidget, SweetAlertWidget} from '../../shared/widgets'
import constants from '../../shared/constants'

class TeamMemberCard {
  constructor(cardElement) {
    this.cardElement = cardElement
    this.name = cardElement.$('.card_title')
    this.editButton = cardElement.$('.card_edit')
    this.deleteButton = cardElement.$('#ext01-team-member-form-delete')
  }

  clickEditButton() {
    this.editButton.click()
  }

  clickDeleteButton() {
    this.deleteButton.click()
  }
}

class ManageMembersArea {
  constructor() {
    this.TeamMember = TeamMemberCard
    this.admins = element.all(by.css('#ext01-team-admins > div'))
    this.managers = element.all(by.css('#ext01-team-managers > div'))

    this.lastAdminCard = this.admins.last()
    this.lastAdminEditButton = this.lastAdminCard.$('.card_edit')
    this.lastAdminDeleteButton = this.lastAdminCard.$('#ext01-team-member-form-delete')

    this.lastManagerCard = this.managers.last()
    this.lastManagerName = this.lastManagerCard.$('.card_title')
    this.lastManagerEditButton = this.lastManagerCard.$('.card_edit')
    this.lastManagerDeleteButton = this.lastManagerCard.$('#ext01-team-member-form-delete')
  }

  clickLastManagerEditButton() {
    this.lastManagerEditButton.click()
  }

  clickLastManagerDeleteButton() {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.lastManagerDeleteButton), constants.TIMEOUT_TIME)

    this.lastManagerDeleteButton.click()
  }

  clickConfirmDeleteButton() {
    SweetAlertWidget.ok()
  }
}

class InviteArea {
  constructor() {
    this.inviteForm = element(by.id('ext01-team-invite'))
    this.firstNameField = this.inviteForm.element(by.name('firstname'))
    this.lastNameField = this.inviteForm.element(by.name('lastname'))
    this.emailField = this.inviteForm.element(by.name('email'))
    this.roleField = this.inviteForm.element(by.name('role'))
    this.officeField = this.inviteForm.element(by.name('office'))
    this.inviteButton = this.inviteForm.$('button[type="submit"]')
    this.slotsElement = element.all(by.css('div.subtext')).first()
    this.noSlotsAlert = $('.alert-danger')
  }

  invite(firstName, lastName, email, role) {
    let expected = protractor.ExpectedConditions
    browser.wait(expected.elementToBeClickable(this.firstNameField), constants.TIMEOUT_TIME)
    this.firstNameField.sendKeys(firstName)
    this.lastNameField.sendKeys(lastName)
    this.emailField.sendKeys(email)
    this.setRole(role)
    this.inviteButton.click()
    SweetAlertWidget.ok()
  }

  setRole(roleName) {
    ChosenWidget.setChosenValue(this.roleField, roleName)
  }
}

class TeamTab {
  constructor() {
    this.InviteArea = InviteArea
    this.ManageMembersArea = ManageMembersArea
  }
}

export default TeamTab

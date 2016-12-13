import CreateANewCampusModal from './createANewCampusModal.pageObject'
import DuplicateCampusModal from './duplicateCampusModal.pageObject'

export default class CampusTabArea {
  constructor() {
    this.duplicateButton = $('div.flex-spread > div > button')
    this.selectCampusDropdown = element.all(by.css('div.selected_item')).first()
    this.lastItemInDropdown = element.all(by.css('ul.menu li span')).last()
    this.newCampusButton = $('div.flex-spread > button.btn--default')

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickDuplicateButton() {
    this.duplicateButton.click()
  }

  clickNewCampusButton() {
    this.newCampusButton.click()
  }

  clickSelectCampusDropdown() {
    this.selectCampusDropdown.click()
  }

  duplicateCampus(campusName) {
    this.clickDuplicateButton()
    const duplicateCampusModal = new DuplicateCampusModal()
    duplicateCampusModal.inputNewCampusName(campusName)
    duplicateCampusModal.clickTakeMeToTheNewCampusButton()
  }

  createANewCampus(campusName) {
    this.clickNewCampusButton()
    const createANewCampusModal = new CreateANewCampusModal()
    createANewCampusModal.fillAndSaveForm(campusName)
  }
}

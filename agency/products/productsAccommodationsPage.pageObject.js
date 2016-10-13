import {ChosenWidget} from '../../shared/widgets'

export default class AccommodationsPage {
  constructor() {
    this.newAccommodationButton = element(by.id('ext31-new-btn'))
    this.nameField = $('input[name="name"]')
    this.homestayButton = element(by
      .repeater('category in accommodationCategoryOptions').row(0))
    this.privateBathroomButton = element(by
      .repeater('bathroomType in bathroomTypeOptions').row(0))
    this.sharedRoomTypeButton = element(by
      .repeater('roomType in roomTypeOptions').row(0))
    this.mealTypeDropdown = element.all(by.model('select.selection')).get(0)
    this.saveButton = $('div.save-right button[type="submit"]')

    this.alertBoxMessage = $('.alert-box-message')
  }

  clickNewAccommodationButton() {
    this.newAccommodationButton.click()
  }

  inputName(name = 'Waystone Inn') {
    this.nameField.sendKeys(name)
  }

  clickHomestayButton() {
    this.homestayButton.click()
  }

  clickPrivateBathroomButton() {
    this.privateBathroomButton.click()
  }

  clickSharedRoomTypeButton() {
    this.sharedRoomTypeButton.click()
  }

  selectMealType(type = 'No Meals Provided') {
    ChosenWidget.setChosenValue(this.mealTypeDropdown, type)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  createNewAccommodation() {
    this.clickNewAccommodationButton()
    this.inputName()
    this.clickHomestayButton()
    this.clickPrivateBathroomButton()
    this.clickSharedRoomTypeButton()
    this.selectMealType()
    this.clickSaveButton()
  }
}

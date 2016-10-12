import {UISelectWidget} from '../../../shared/widgets'

export default class CreateANewCampusModal {
  constructor() {
    this.container = $('settings-new-campus')
    this.newCampusNameField = this.container.$('input[name="newCampusName"]')
    this.cityCountryField = this.container.all(by.css('div.ui-select-container')).first()
    this.campusCurrencyField = this.container.all(by.css('div.ui-select-container')).last()
    this.saveButton = this.container.$('button[type="submit"]')
  }

  inputNewCampusName(name = 'Hogwarts') {
    this.newCampusNameField.sendKeys(name)
  }

  inputCityCountry(location = 'Vancouver BC') {
    UISelectWidget.clickUiSelect(this.cityCountryField, location)
  }

  inputCampusCurrency(currency = 'CAD') {
    UISelectWidget.clickUiSelect(this.campusCurrencyField, currency)
  }

  clickSaveButton() {
    this.saveButton.click()
  }

  fillAndSaveForm(campusName) {
    this.inputNewCampusName(campusName)
    this.inputCityCountry()
    this.inputCampusCurrency()
    this.clickSaveButton()
  }
}

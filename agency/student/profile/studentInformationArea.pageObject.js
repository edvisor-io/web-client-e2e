import {ChosenWidget, UISelectWidget, DatePickerWidget} from '../../../shared/widgets'
import constants from '../../../shared/constants'

import uuid from 'node-uuid'
import moment from 'moment'

export default class StudentInformationArea {
  constructor() {
    this.container = $('#ext02-info')
    this.firstNameField = this.container.element(by.name('firstname'))
    this.lastNameField = this.container.element(by.name('lastname'))
    this.emailField = this.container.element(by.name('email'))
    this.phoneNumberField = this.container.element(by.name('phone'))
    this.genderFemaleRadio = this.container.all(by.css('label.radio')).get(1)
    this.genderMaleRadio = this.container.all(by.css('label.radio')).get(0)
    this.birthdayField = this.container.element(by.model('information.student.birthdate'))
    this.homeAddressField = this.container.element(by.name('address'))
    this.cityCountryField = this.container.$('div.ui-select-container')
    this.postalCodeField = this.container.element(by.name('postalCode'))
    this.nationalityField = this.container.element(by.name('nationality'))
    this.passportNumberField = this.container.element(by.name('passportRequirement'))
    this.saveButton = this.container.$('button[type="submit"]')
  }

  getCityCountryValue() {
    return UISelectWidget.getUISelectValue(this.cityCountryField)
  }

  inputFirstName(firstName = 'Zaphod') {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.firstNameField), constants.TIMEOUT_TIME)
    this.firstNameField.clear()
    this.firstNameField.sendKeys(firstName)
  }

  inputLastName(lastName = 'Beeblebrox') {
    this.lastNameField.clear()
    this.lastNameField.sendKeys(lastName)
  }

  inputEmail(email = 'zaphod@betelguese.io') {
    this.emailField.clear()
    this.emailField.sendKeys(email)
  }

  inputPhoneNumber(phoneNumber = '1 888 GET EDVISOR') {
    this.phoneNumberField.clear()
    this.phoneNumberField.sendKeys(phoneNumber)
  }

  selectGender(gender = 'Female') {
    gender === 'Female' ? this.genderFemaleRadio.click() : this.genderMaleRadio.click()
  }

  selectBirthday() {
    let month = moment().subtract(19, 'Y').format('MMMM')
    let date = +moment().subtract(19, 'Y').format('DD')
    let year = +moment().subtract(19, 'Y').format('YYYY')
    DatePickerWidget.setPikaDate(this.birthdayField, month, date, year)
  }

  inputHomeAddress(address = '1km below the whale, Magrathea') {
    this.homeAddressField.clear()
    this.homeAddressField.sendKeys(address)
  }

  selectCityCountry(cityCountry = 'Antigua and Barbuda') {
    UISelectWidget.clickUISelect(this.cityCountryField, cityCountry)
  }

  inputPostalCode(postalCode = `${uuid.v4()}`) {
    this.postalCodeField.clear()
    this.postalCodeField.sendKeys(postalCode)
  }

  selectNationality(nationality = 'United Kingdom') {
    ChosenWidget.setChosenValueWithDoubleClick(this.nationalityField, nationality)
  }

  inputPassportNumber(passportNumber = '!L@#^*FAS34') {
    this.passportNumberField.clear()
    this.passportNumberField.sendKeys(passportNumber)
  }

  clickSaveButton() {
    this.saveButton.click()
  }
}

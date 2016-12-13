import constants from '../../../shared/constants'

export default class RecentActivitiesArea {
  constructor() {
    this.container = $('student-sidebar-recent')
    this.allActivitiesElements = this.container.all(by
      .repeater('activity in activityGroup.activities track by activity.activityId'))
    this.activityToggleButton = element(by.id('ext02-recent')).$('a')
  }

  checkForAndClickShowAllActivityButton() {
    browser.sleep(constants.SLEEP_SHORT) // implicit wait is unreliable for element that may not appear
    this.activityToggleButton.isPresent().then((isIt) => {
      if (isIt) {
        this.activityToggleButton.getText().then((text) => {
          if (text === 'Show all activity') {
            this.activityToggleButton.click()
          }
        })
      }
    })
  }
}

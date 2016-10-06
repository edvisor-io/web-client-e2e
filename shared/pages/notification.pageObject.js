export default class NotificationArea {
  constructor() {
    this.container = $('#ext29-notification-container')
    this.notificationToggle = $('#ext29-notification-toogle')
    this.notificationItems = this.container.all(by
      .repeater('notification in pageData.notifications'))
  }

  clickNotificationToggle() {
    this.notificationToggle.click()
  }
}

export default class RecentActivitiesArea {
  constructor() {
    this.container = $('student-sidebar-recent')
    this.allActivitiesElements = this.container.all(by
      .repeater('activity in activityGroup.activities track by activity.activityId'))
    this.showAllActivityButton = $('#ext02-recent a')
  }
}

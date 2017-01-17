import CoursePage from './productsCoursePage.pageObject'
import constants from '../../shared/constants'

class CourseTabArea {
  constructor() {}
}

export class ProductsPage {
  constructor() {
    this.CoursePage = CoursePage

    this.newProductsOrAddonsButton = element.all(by.css('div.btn-group > button')).get(0)
    this.courseOption = element.all(by.css('div.btn-menu_item')).get(0)

    this.courseNameColumnHeader = element.all(by.css('span.ag-header-cell-text')).get(0)
    this.firstCourseInList = element.all(by.css('div.table-grid_name > a')).get(0)
  }

  openNewProductsOrAddonsDropdown() {
    this.newProductsOrAddonsButton.click()
  }

  clickCourseOption() {
    browser.sleep(constants.SLEEP_SHORT)
    this.courseOption.click()
  }

  createNewCourse(name) {
    this.openNewProductsOrAddonsDropdown()
    this.clickCourseOption()
    const coursePage = new CoursePage()
    coursePage.fillAndSaveForm(name)
  }

  sortByCourseName() {
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.courseNameColumnHeader), constants.TIMEOUT_TIME)
    this.courseNameColumnHeader.click()
    browser.sleep(constants.SLEEP_SHORT)
  }

  deleteFirstCourse() {
    this.firstCourseInList.click()
    const coursePage = new CoursePage()
    coursePage.deleteCourse()
  }
}

export default ProductsPage

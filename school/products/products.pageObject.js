import CoursePage from './productsCoursePage.pageObject'

export class ProductsPage {
  constructor() {
    this.CoursePage = CoursePage

    this.newProductsOrAddonsButton = element.all(by.css('div.btn-group > button')).get(0)
    this.courseOption = element.all(by.css('div.btn-menu_item')).get(0)

    this.lastCourseInList = element.all(by.css('div.table-grid_name > a')).last()
  }

  openNewProductsOrAddonsDropdown() {
    this.newProductsOrAddonsButton.click()
  }

  clickCourseOption() {
    this.courseOption.click()
  }

  createNewCourse(name) {
    this.openNewProductsOrAddonsDropdown()
    this.clickCourseOption()
    const coursePage = new CoursePage()
    coursePage.fillAndSaveForm(name)
  }
}

export default ProductsPage

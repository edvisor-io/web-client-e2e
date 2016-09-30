import AccommodationsPage from './productsAccommodationsPage.pageObject'
import AddonsPage from './productsAddonsPage.pageObject'
import FeesPage from './productsFeesPage.pageObject'
import PromotionsPage from './productsPromotions.pageObject'

export class Products {
  constructor() {
    this.AccommodationsPage = AccommodationsPage
    this.AddonsPage = AddonsPage
    this.FeesPage = FeesPage
    this.PromotionsPage = PromotionsPage
  }
}

export default Products

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const listProduct = 
    `<li class="product-card">
        <a href="product_pages/${product.NameKeyLower}">
          <img
            src="${product.Image}"
            alt="Marmot Ajax tent"
          />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">${product.ListPrice}</p>
        </a>
      </li>`;
      return listProduct;
  }

export default class ProductList {
  constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
  }

  async init() {
      const list = await this.dataSource.getData();
      this.renderList(list);
  }

  async renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
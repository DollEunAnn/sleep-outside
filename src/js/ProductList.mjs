// Generate a list of product card in HTML
import { renderListWithTemplate , calculateDiscount} from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  //reusable render
  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// If discount exists, render. If not, render nothing
function productCardTemplate(product) {

  console.log(product);

  // 1. calculate discount before rendering
  const discount = calculateDiscount(product.ListPrice, product.FinalPrice);

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>

      <!-- display only if discount EXISTS -->
      ${discount ? `<p class="discount">-${discount}%</p>` : ""}
    </a>
  </li>`
}
// Generate a list of product card in HTML
import { renderListWithTemplate, calculateDiscount } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".category-title").textContent = this.category;
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

  let colorSwatchesHTML = "";
  if (product.Colors && product.Colors.length > 1) {
    colorSwatchesHTML = '<div class="color-swatches">';
    product.Colors.forEach((color, index) => {
      colorSwatchesHTML += `
      <img
        class="swatch ${index === 0 ? "selected" : ""}"
        src="${color.ColorChipImageSrc}"
        data-image="${color.ColorPreviewImageSrc}"
        />
        `;
    });
    colorSwatchesHTML += "</div>"; // close after loop
  }

  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <picture>
        <source media="(max-width: 480px)" srcset="${product.Images.PrimaryMedium}"/>
        <img src="${product.Images.PrimaryLarge}" alt="Image of ${product.Name}"/>
      </picture>
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>

      <!-- COLOR SWATCHES -->
      ${colorSwatchesHTML}

      <!-- display only if discount EXISTS -->
      ${discount ? `<p class="discount">-${discount}%</p>` : ""}
    </a>
  </li>`
}
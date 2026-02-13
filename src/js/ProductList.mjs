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

  // --- LI wrapper ---
  const li = document.createElement("li");
  li.className = "product-card";

  // --- LINK ---
  const link = document.createElement("a");
  link.href = `../product_pages/?product=${product.Id}`;

  // --- PICTURE ---
  const picture = document.createElement("picture");
  const source = document.createElement("source");
  source.media = "(max-width: 480px)";
  source.srcset = product.Images.PrimaryMedium;

  const img = document.createElement("img");
  img.src = product.Images.PrimaryLarge;
  img.alt = `Image of ${product.Name}`;

  picture.append(source, img);

  // --- BRAND ---
  const brand = document.createElement("h2");
  brand.className = "card__brand";
  brand.textContent = product.Brand.Name;

  // --- NAME ---
  const name = document.createElement("h3");
  name.className = "card__name";
  name.textContent = product.Name;

  // --- PRICE ---
  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = `$${product.ListPrice}`;

  // --- DISCOUNT (only if exists) ---
  if (discount) {
    const discountEl = document.createElement("p");
    discountEl.className = "discount";
    discountEl.textContent = `-${discount}%`;
    link.append(discountEl);
  }
  // append picture, brand, name, price to link
  link.append(picture, brand, name, price);

  // append link a to li
  li.append(link);

  return li;
}
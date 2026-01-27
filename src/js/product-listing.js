import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, element);

myList.init();

const categoryNameEl = document.getElementById("category-name");

if (categoryNameEl) {
  categoryNameEl.textContent = category
    ? category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Products";
}

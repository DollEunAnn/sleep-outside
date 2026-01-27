import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");

// Store category info in localStorage for breadcrumbs
if (category) {
  const categoryName = category
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  localStorage.setItem("lastCategory", categoryName);
  localStorage.setItem(
    "lastCategoryUrl",
    `/product_listing/?category=${category}`,
  );
}

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

const productCountEl = document.getElementById("product-count");

if (productCountEl) {
  dataSource.getData(category).then((list) => {
    productCountEl.textContent = `${list.length} items`;
  });
}

loadHeaderFooter();

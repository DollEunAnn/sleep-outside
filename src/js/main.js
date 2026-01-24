import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

document.querySelectorAll(".categories a").forEach((link) => {
  const category = link.dataset.category;
  link.href = `product_listing/index.html?category=${category}`;
});

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

const alert = new Alert(".alert-container", "../json/alert.json");

productList.init();
alert.showAlert();

loadHeaderFooter();

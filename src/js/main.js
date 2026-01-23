import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.querySelectorAll('.categories a').forEach(link => {
  const category = link.dataset.category;
  link.href = `product_listing/index.html?category=${category}`;
});

loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();



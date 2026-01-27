import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

<<<<<<< HEAD
// category link setup
document.querySelectorAll('.categories a').forEach(link => {
=======
document.querySelectorAll(".categories a").forEach((link) => {
>>>>>>> origin/main
  const category = link.dataset.category;
  link.href = `product_listing/index.html?category=${category}`;
});

// header/footer load
loadHeaderFooter();

// product list rendering
const dataSource = new ProductData(category);

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

const alert = new Alert(".alert-container", "../json/alert.json");

productList.init();
alert.showAlert();



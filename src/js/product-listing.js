import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from './utils.mjs';

// importing header/footer script
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category"); // which category are we listing? use getParam

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, element);



myList.init();
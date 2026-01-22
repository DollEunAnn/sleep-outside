import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from './utils.mjs';

const category = getParam("category");

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, element);



myList.init();
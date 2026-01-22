import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const newProduct = new ProductDetails(productId, dataSource);
newProduct.init();

loadHeaderFooter();

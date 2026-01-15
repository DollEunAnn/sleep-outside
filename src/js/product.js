import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

console.log(dataSource.findProductById(productId));

const newProduct = new ProductDetails(productId, dataSource);
newProduct.init();

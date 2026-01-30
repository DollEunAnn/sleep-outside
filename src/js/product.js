import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");
const category = getParam("category");

const newProduct = new ProductDetails(productId, dataSource, category);
newProduct.init();

loadHeaderFooter();

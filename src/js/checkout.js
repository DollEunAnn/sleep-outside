import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zipcode")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit")
.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms[0];
  const validity = form.checkValidity();
  form.reportValidity();
  if(validity) {
    order.checkout();
  }
});
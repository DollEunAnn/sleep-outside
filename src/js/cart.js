/*import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";*/
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const element = document.querySelector(".cart-product-list");

const shoppingCart = new ShoppingCart("so-cart", element);

function renderCartContents() {
  const cartItems = shoppingCart.getProducts();
  element.innerHTML = "";
  shoppingCart.renderList(cartItems);
  addRemoveButtonListeners();
  addQuantityButtonListeners();
  shoppingCart.getTotal();
}

/*function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button class="cart-card__remove" data-id="${item.Id}"></button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}*/

function addRemoveButtonListeners() {
  const removeBtns = document.querySelectorAll(".cart-card__remove");

  removeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.id;

      shoppingCart.removeProduct(productId);

      renderCartContents();
    });
  });
}

function addQuantityButtonListeners() {
  const decreaseBtns = document.querySelectorAll(".quantity-btn.decrease");
  const increaseBtns = document.querySelectorAll(".quantity-btn.increase");

  decreaseBtns.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = e.currentTarget.dataset.id;
      await shoppingCart.updateQuantity(productId, -1);
      renderCartContents();
    });
  });

  increaseBtns.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = e.currentTarget.dataset.id;
      await shoppingCart.updateQuantity(productId, 1);
      renderCartContents();
    });
  });
}
/*function removeProductFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  const newCartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", newCartItems);
}

function calcTotal() {
  const cartItems = getLocalStorage("so-cart");
  const cartTotal = document.querySelector(".cart-total");
  const cartFooter = document.querySelector(".cart-footer");
  let total = 0;
  if (!cartItems || cartItems.length == 0) {
    cartFooter.classList.add("hide");
  } else if (cartItems) {
    cartItems.forEach((product) => (total += product.ListPrice));
    cartTotal.innerHTML = `Total: $ ${total}`;
    cartFooter.classList.remove("hide");
  }
}*/

// Update breadcrumb with previous category
function updateBreadcrumb() {
  const categoryName = localStorage.getItem("lastCategory");
  const categoryUrl = localStorage.getItem("lastCategoryUrl");
  const breadcrumbLink = document.getElementById("previous-category");
  const breadcrumbSpan = breadcrumbLink?.previousElementSibling; // The › separator

  if (categoryName && categoryUrl && breadcrumbLink) {
    breadcrumbLink.textContent = categoryName;
    breadcrumbLink.href = categoryUrl;
  } else if (breadcrumbLink) {
    // If no previous category, hide this breadcrumb segment
    breadcrumbLink.style.display = "none";
    if (breadcrumbSpan) breadcrumbSpan.style.display = "none";
  }
}

renderCartContents();
updateBreadcrumb();
loadHeaderFooter();

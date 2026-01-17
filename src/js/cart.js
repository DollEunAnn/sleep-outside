import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveButtonListeners();
}

function cartItemTemplate(item) {
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
}

function addRemoveButtonListeners() {
  const removeBtns = document.querySelectorAll(".cart-card__remove");

  removeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.id;

      removeProductFromCart(productId);

      renderCartContents();
    });
  });
}

function removeProductFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  const newCartItems = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", newCartItems);
}

renderCartContents();

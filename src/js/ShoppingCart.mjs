import { renderListWithTemplate , calculateDiscount, getLocalStorage, setLocalStorage} from "./utils.mjs";

export default class ShoppingCart {
  constructor(shoppingCart, listElement) {
    this.shoppingCart = shoppingCart;
    this.listElement = listElement;
  }

  async init() {
      const list = await this.dataSource.getData();
      this.renderList(list);
    }
  
    //reusable render
    renderList(list) {
      // const htmlStrings = list.map(productCardTemplate);
      // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  
      renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    getProducts() {
        return getLocalStorage(this.shoppingCart) || [];
    }

    removeProduct(productId) {
        const cartItems = getLocalStorage(this.shoppingCart) || [];
        const newCartItems = cartItems.filter((item) => item.Id !== productId);
        setLocalStorage(this.shoppingCart, newCartItems);
    }

    getTotal() {
        const cartItems = getLocalStorage(this.shoppingCart);
        const cartTotal = document.querySelector(".cart-total");
        const cartFooter = document.querySelector(".cart-footer");
        let total = 0;
        if (!cartItems || cartItems.length == 0) {
            cartFooter.classList.add("hide");
        } else if (cartItems) {
            cartItems.forEach((product) => (total += product.ListPrice));
            cartTotal.innerHTML = `Total: $ ${total.toFixed(2)}`;
            cartFooter.classList.remove("hide");
        }
    }
}

function productCardTemplate(product) {

  console.log(product);

  // 1. calculate discount before rendering
  const discount = calculateDiscount(product.ListPrice, product.FinalPrice);

return `<li class="cart-card divider">
  <div class="cart-card__product">
    <a href="#" class="cart-card__image">
      <picture>
        <source media="(max-width: 480px)" srcset="${product.Images.PrimarySmall}"/>
        <img
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
      </picture>
    </a>
    <div class="cart-card__details">
      <a href="#">
        <h2 class="card__name">${product.Name}</h2>
      </a>
      <p class="cart-card__color">Color: ${product.Colors[0].ColorName}</p>
      <p class="cart-card__size">Size: ${product.Size || '6.0'}</p>
    </div>
  </div>
  
  <p class="cart-card__price">$${product.FinalPrice}</p>
  
  <div class="cart-card__quantity">
    <button class="quantity-btn decrease" data-id="${product.Id}">-</button>
    <span class="quantity-value">${product.quantity}</span>
    <button class="quantity-btn increase" data-id="${product.Id}">+</button>
  </div>
  
  <p class="cart-card__subtotal">$${(product.FinalPrice * product.quantity).toFixed(2)}</p>
  
  <button class="cart-card__remove" data-id="${product.Id}">🗑</button>
</li>`
}
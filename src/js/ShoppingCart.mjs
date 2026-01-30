import { renderListWithTemplate , calculateDiscount, getLocalStorage, setLocalStorage, updateCartCount, animateCart } from "./utils.mjs";

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
        updateCartCount();
        animateCart();
    }

    // Update quantity by a given change (add or subtract)
    async updateQuantity(productId, change) {
        const cartItems = getLocalStorage(this.shoppingCart) || [];
        let shouldUpdate = true;
        
        const updatedItems = await Promise.all(cartItems.map(async item => {
            if (item.Id === productId) {
                const newQuantity = item.quantity + change;
                
                // If quantity would be 0 or less, show custom modal
                if (newQuantity <= 0) {
                    const confirmRemove = await this.showConfirmModal(`Do you want to remove ${item.Name} from your cart?`);
                    if (confirmRemove) {
                        // Return null to mark for removal
                        return null;
                    } else {
                        // Keep quantity at 1
                        shouldUpdate = false;
                        return item;
                    }
                }

                // Update quantity normally
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
        
        const filteredItems = updatedItems.filter(item => item !== null);
        
        if (shouldUpdate) {
            setLocalStorage(this.shoppingCart, filteredItems);
            updateCartCount();
            animateCart();
        }
    }

    // ========== NEW METHOD - Custom Modal ==========
    showConfirmModal(message) {
        return new Promise((resolve) => {
            const modal = document.getElementById('confirmModal');
            const modalMessage = document.getElementById('modalMessage');
            const confirmBtn = document.getElementById('modalConfirm');
            const cancelBtn = document.getElementById('modalCancel');
            
            modalMessage.textContent = message;
            modal.classList.add('active');
            
            const handleConfirm = () => {
                modal.classList.remove('active');
                cleanup();
                resolve(true);
            };
            
            const handleCancel = () => {
                modal.classList.remove('active');
                cleanup();
                resolve(false);
            };
            
            const cleanup = () => {
                confirmBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
            };
            
            confirmBtn.addEventListener('click', handleConfirm);
            cancelBtn.addEventListener('click', handleCancel);
        });
    }

// Calculate and display total price
getTotal() {
    const cartItems = getLocalStorage(this.shoppingCart);
    const cartTotal = document.querySelector(".cart-total");
    const cartFooter = document.querySelector(".cart-footer");
    let total = 0;
    
    if (!cartItems || cartItems.length == 0) {
        cartFooter.classList.add("hide");
    } else if (cartItems) {
        cartItems.forEach((product) => {
            total += (product.ListPrice || 0) * (product.quantity || 1);
        });
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        cartFooter.classList.remove("hide");
    }
}
}


function productCardTemplate(product) {

  console.log(product);

  // 1. calculate discount before rendering
  const discount = calculateDiscount(product.ListPrice, product.FinalPrice);

return `
<ul class="cart-grid divider">
  <li class="cart-product-details-grid">
    <a href="../product_pages/?product=${product.Id}" class="cart-card__image">
      <picture>
        <source media="(max-width: 480px)" srcset="${product.Images.PrimarySmall}"/>
        <img
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
      </picture>
    </a>
    <div>
      <a href="../product_pages/?product=${product.Id}">
        <h2 class="card__name">${product.Name}</h2>
      </a>
      <p class="cart-card__color">Color: ${product.Colors[0].ColorName}</p>
      <p class="cart-card__size">Size: ${product.Size || '6.0'}</p>
    </div>
  </li>
  <li>
    <p class="cart-card__price">$${product.FinalPrice}</p>
  </li>
  <li>
    <div class="cart-card__quantity">
      <button class="quantity-btn decrease" data-id="${product.Id}">-</button>
      <span class="quantity-value">${product.quantity}</span>
      <button class="quantity-btn increase" data-id="${product.Id}">+</button>
    </div>
    
  </li>
  <li>
    <p class="cart-card__subtotal">$${(product.FinalPrice * product.quantity).toFixed(2)}</p>
    <button class="cart-card__remove" data-id="${product.Id}">🗑</button>
  </li>
</ul>`
}


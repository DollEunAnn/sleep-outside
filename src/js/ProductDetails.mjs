import { getLocalStorage, setLocalStorage, updateCartCount, animateCart } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        // add listener to Add to Cart button
        document
        .getElementById("addToCart")
        .addEventListener('click', this.addProductToCart.bind(this));
    }

// add to cart button event handler
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        /* 
            fix for add to cart duplicates
            product will always push to the array everytime it was click
            if we use 'push'

            so we need to check first for the item exist to the cart
        */

        // check item if exist inside the cart
        const existingItem = cartItems.find(
            item => item.Id === this.product.Id
        );

        // if exist, add 1 more quantity
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // if doesn't exist, add product with quantity 1. the current display is static only
            const productWithQuantity = {
            ...this.product,
            quantity: 1
            };
            cartItems.push(productWithQuantity);
        }
        
        setLocalStorage("so-cart", cartItems);
        
        updateCartCount();
        animateCart();
    }

    renderProductDetails() {
        this.productDetailsTemplate(this.product)
    }

    productDetailsTemplate(product) {
        const template =
            `<h3>${product.Brand.Name}</h3>

            <h2 class="divider">${product.NameWithoutBrand}</h2>

            <img class="divider"
                src="${product.Images.PrimaryLarge}"
                alt="${product.Name}" />

            <p class="product-card__price">$${product.ListPrice}</p>

            <p class="product__color">${product.Colors[0].ColorName}</p>

            <p class="product__description">
                ${product.DescriptionHtmlSimple}
            </p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>`
            document.querySelector('.product-detail').innerHTML = template;
    }
}
import { getLocalStorage, setLocalStorage, updateCartCount, animateCart } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource, category) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.category = category;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
         this.renderBreadcrumb()
        // add listener to Add to Cart button
        console.log("Product category:", this.product.Category); // Add this
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

renderBreadcrumb() {
    const categoryLink = document.getElementById("breadcrumb-category");
    const productNameEl = document.getElementById("breadcrumb-product");

    if (!categoryLink || !productNameEl) return;
    if (!this.product || !this.product.Name) return;

    // Use the product's actual category instead of URL param
    const category = this.product.Category || this.category || "products";
    
    // Format category name (backpacks → Backpacks)
    const formattedCategory = category
        .replace("-", " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    categoryLink.textContent = formattedCategory;
    categoryLink.href = `../product_listing/index.html?category=${category}`;

    productNameEl.textContent = this.product.Name;

    // Update page title
    document.title = `Sleep Outside | ${this.product.Name}`;
}

    productDetailsTemplate(product) {
        const template =
            `<h3>${product.Brand.Name}</h3>

            <h2 class="divider">${product.NameWithoutBrand}</h2>

            <picture>
                <source media="(max-width: 480px)" srcset="${product.Images.PrimaryLarge}"/>
                <img class="divider"
                    src="${product.Images.PrimaryExtraLarge}"
                    alt="${product.Name}"/>
            </picture>

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
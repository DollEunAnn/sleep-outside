// PURELY FOR FUNCTIONS = ALL THE OTHER EXTRA STUFF

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// DISCOUNT FUNCTION
export function calculateDiscount(listPrice, finalPrice) {

  //no diiscount
  if (listPrice === finalPrice) {
    return null;
  }

  const discountPercent = ((listPrice - finalPrice) / listPrice) * 100;

  return Math.round(discountPercent);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Inside src/js/utils.mjs

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const countElement = qs(".cart-count");

  if (countElement) {
    // If we have items, calculate total quantity. If not, 0.
    const totalCount = cartItems 
      ? cartItems.reduce((sum, item) => sum + item.quantity, 0) 
      : 0;

    countElement.innerText = totalCount;
    
    // Show badge if count > 0, otherwise hide
    countElement.style.display = totalCount > 0 ? "block" : "none";
  }
}

export function animateCart() {
  const cartIcon = qs(".cart"); // This targets the div surrounding the icon
  if (cartIcon) {
    cartIcon.classList.add("anim-out");
    // Remove class after 500ms so animation can run again
    setTimeout(() => {
      cartIcon.classList.remove("anim-out");
    }, 500);
  }
}

 export function loadHeaderFooter() {
  loadTemplate("../partials/header.html").then((template) => {
    renderWithTemplate(template, qs("#header"));
  });
  loadTemplate("../partials/footer.html").then((template) => {
    renderWithTemplate(template, qs("#footer"));
    }
  )

  const checkHeaderInterval = setInterval(() => {
    const cartCountElement = document.querySelector(".cart-count");
    
    // Once the element exists in the HTML
    if (cartCountElement) {
      updateCartCount();
      clearInterval(checkHeaderInterval); 
    }
  }, 50);
}

// color choose for swatches
export function swatchColorChoose() {
  document.querySelectorAll("product.card").forEach(card => {
    const mainImage = card.querySelector(".main-image");
    const swatches = card.querySelectorAll(".swatch");

    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        mainImage.src = swatch.dataset.image;

        // highlighting selected swatch
        swatches.forEach(s => s.classList.remove("selected"));
        swatch.classList.add("selected");
      })
    })
  })
}
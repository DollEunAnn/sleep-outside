const modal = document.getElementById("quickViewModal");

export function showQuickView(product) {
  //   if (!modal) return console.log("Modal not found");

  const modalDetails = modal.querySelector(".modal-content");
  //   if (!modalDetails) return console.log("Modal content not found");

  // clear old content
  modalDetails.innerHTML = "";

  // create elements
  const productName = document.createElement("h3");
  productName.textContent = product.Name;

  const productImage = document.createElement("img");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.Name;

  const productPrice = document.createElement("p");
  productPrice.textContent = `$${product.FinalPrice}`;

  const productDescription = document.createElement("p");
  productDescription.innerHTML = product.DescriptionHtmlSimple;

  // append to modal
  modalDetails.append(
    productName,
    productImage,
    productPrice,
    productDescription,
  );

  // open dialog
  modal.showModal();
}

import {
  qs,
  setLocalStorage,
  getParam,
  getLocalStorage
} from "./utils.mjs";

import {
  findProductById
} from "./externalServices.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

// render product details
function renderProductDetails() {
  const name = qs("#productName");
  const productNameWithoutBrand = qs("#productNameWithoutBrand");
  const productImage = qs("#productImage");
  const productSuggestedRetailPrice = qs("#productSuggestedRetailPrice");
  const productFinalPrice = qs("#productFinalPrice");
  const productColorName = qs("#productColorName");
  const productDescriptionHtmlSimple = qs("#productDescriptionHtmlSimple");
  const btn = qs("#addToCart");

  name.textContent = product.Name;
  productNameWithoutBrand.textContent = product.NameWithoutBrand;
  productImage.src = product.Images.PrimaryLarge;

  // Format prices to standard dollar format
  let formattedSuggestedRetailPrice = `$${parseFloat(product.SuggestedRetailPrice).toFixed(2)}`;
  let formattedFinalPrice = `$${parseFloat(product.FinalPrice).toFixed(2)}`;

  let priceHTML = "";
  let discountHTML = "";

  if (parseFloat(product.SuggestedRetailPrice) > parseFloat(product.FinalPrice)) {
    let discountPercent = (((parseFloat(product.SuggestedRetailPrice) - parseFloat(product.FinalPrice)) / parseFloat(product.SuggestedRetailPrice)) * 100).toFixed(0);
    priceHTML = `<s>${formattedSuggestedRetailPrice}</s> <b>${formattedFinalPrice}</b>`;
    discountHTML = `<span class="discount">${discountPercent}% off</span>`;
  } else {
    priceHTML = formattedFinalPrice;
  }

  productSuggestedRetailPrice.innerHTML = priceHTML;
  productFinalPrice.innerHTML = discountHTML;

  productColorName.textContent = product.Colors[0].ColorName;
  productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;
  btn.dataset.id = product.Id;
}

// add to cart
//function addToCart(id, product) {
  // setLocalStorage(id, product);
  // const localProduct = JSON.parse(localStorage.getItem(id));
  // // add qty to localStorage.id 
  // localProduct.qty = 1;
  // setLocalStorage(id, localProduct);
  
  function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
}


// Call function so it runs on page load and updates cart count
// updateCartItemCount();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const productId = getParam("product");
//   const product = await findProductById(productId);
//   addToCart(productId, product);
//   updateCartItemCount();

// }

// Animation for cart icon,
// const cartIcon = document.querySelector(".cart");
// if (cartIcon) {
//   cartIconAnimation(cartIcon);
// }
// Animation for cart icon,
//const cartIcon = document.querySelector(".cart");
  // Add the animation class and remove it after a 2 second/2000 millisecond delay
  function cartIconAnimation(cartIcon) {
    cartIcon.classList.add("iconAnimation");
  setTimeout(() => {
    cartIcon.classList.remove("iconAnimation");
  }, 2000);
}




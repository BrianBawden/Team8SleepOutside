import {
  qs,
  setLocalStorage,
  getLocalStorage
} from "./utils.mjs";

import {
  findProductById
} from "./externalServices.mjs";

import {
  cartCount,
  cartIconAnimation
} from "./shoppingCart.mjs";

//initialize cart array
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


function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  const cartIds = getCartIds();
  if (!cartContents) {
    cartContents = [];
  }
  if (cartIds.includes(product.Id)) {
    cartContents.forEach(item => {
      if (item.Id == product.Id){
        item.qty += 1;
      }
    })
  } else {

    product.qty = 1;
    cartContents.push(product);
  }
  // then add the current product to the list
  setLocalStorage("so-cart", cartContents);

  // BY-After adding an item to cart, update cart count in header
  cartCount();

  // BY-Trigger the animation when an item is added to the cart
  const cartIcon = document.querySelector(".cart");
  cartIconAnimation(cartIcon);
}


// add to cart button event handler
// async function addToCartHandler(e) {
//   const productId = getParam("product");
//   const product = await findProductById(productId);
//   addToCart(productId, product);
//   updateCartItemCount();
// }

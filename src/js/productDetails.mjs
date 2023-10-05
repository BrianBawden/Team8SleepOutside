import {
  qs,
  setLocalStorage
} from "./utils.mjs";
import {
  findProductById
} from "./productData.mjs";
import {
  getParam
} from "./utils.mjs";

export default async function productDetails(productId, selector) {
  const product = await findProductById(productId);
  renderProductDetails(product);
}

// render product details
function renderProductDetails(product) {
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
  productImage.src = product.Image;

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
function addToCart(id, product) {

  console.log("Adding to cart:", id, product);
  setLocalStorage(id, product);
}

// update cart item count in header
export function updateCartItemCount() {
  const cartItems = Object.keys(localStorage);
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.getElementById("cartItemCount");

  if (cartItemCountElement !== null) {
    if (cartItemCount === 0) {
      // If there aren't items in the cart, hide the cartItemCount element
      cartItemCountElement.style.display = "none";
    } else {
      // If there are items in the cart, show the cartItemCount element
      cartItemCountElement.style.display = "block";
      cartItemCountElement.textContent = cartItemCount;
    }
  }
}

// Call function so it runs on page load and updates cart count
updateCartItemCount();

// add to cart button event handler
async function addToCartHandler(e) {
  // const productID = e.target.dataset.id;
  const productId = getParam("product");
  console.log("Product ID: ", productId);
  const product = await findProductById(productId);
  console.log("Product:", product);
  addToCart(productId, product);
  updateCartItemCount();
  cartIconAnimation();
}

// Animation for cart icon,
const cartIcon = document.querySelector(".cart");
// Add the animation class and remove it after a 2 second/2000 millisecond delay
function cartIconAnimation() {
  cartIcon.classList.add("iconAnimation");
  setTimeout(() => {
    cartIcon.classList.remove("iconAnimation");
  }, 2000);
}



// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

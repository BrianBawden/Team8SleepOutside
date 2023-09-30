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

function renderProductDetails(product) {
  const name = qs("#productName");
  const productNameWithoutBrand = qs("#productNameWithoutBrand");
  const productImage = qs("#productImage");
  const productFinalPrice = qs("#productFinalPrice");
  const productColorName = qs("#productColorName");
  const productDescriptionHtmlSimple = qs("#productDescriptionHtmlSimple");
  const btn = qs("#addToCart");

  name.textContent = product.Name;
  productNameWithoutBrand.textContent = product.NameWithoutBrand;
  productImage.src = product.Image;
  productFinalPrice.textContent = product.FinalPrice;
  productColorName.textContent = product.Colors[0].ColorName;
  productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;
  btn.dataset.id = product.Id;
}

function addToCart(id, product) {
  setLocalStorage(id, product);
}

// update cart item count in header
export function updateCartItemCount() {
  const cartItems = Object.keys(localStorage);
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.getElementById("cartItemCount");
  if (cartItemCountElement != null) {
    cartItemCountElement.textContent = cartItemCount;
    //console.log("cart element exists");
  }
  //console.log(cartItemCount);
  //console.log(cartItemCountElement)
}


// add to cart button event handler
async function addToCartHandler(e) {
  // const productID = e.target.dataset.id;
  const productId = getParam("product");
  const product = await findProductById(productId);

  addToCart(productId, product);
  updateCartItemCount();
}
// Call function so it runs on page load
updateCartItemCount()

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
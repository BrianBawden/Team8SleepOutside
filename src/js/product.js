import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(id, product) {
  setLocalStorage(id, product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const productID = e.target.dataset.id;
  const product = await findProductById(productID);

  addProductToCart(productID, product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

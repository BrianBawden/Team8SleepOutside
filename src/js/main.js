const cartItems = Object.keys(localStorage);
const cartItemCount = cartItems.length;
const cartItemCountElement = document.getElementById("cartItemCount");
if (cartItemCountElement != null) {
  cartItemCountElement.textContent = cartItemCount;
}

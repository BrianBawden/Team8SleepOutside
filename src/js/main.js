// update cart item count in header
function updateCartItemCount() {
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
updateCartItemCount();

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

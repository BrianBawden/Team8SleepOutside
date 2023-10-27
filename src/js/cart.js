import shoppingCart from "./shoppingCart.mjs";

import { 
    loadHeaderFooter,
    updateCartItemCount,
 }  from "./utils.mjs";

// load header and footer
loadHeaderFooter();
shoppingCart();
// Call function so it runs on page load and updates cart count
document.addEventListener("DOMContentLoaded", () => {
    // Your code here
    updateCartItemCount();
  });
// updateCartItemCount();

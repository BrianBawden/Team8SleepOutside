import shoppingCart from "./shoppingCart.mjs";

import { loadHeaderFooter } from "./utils.mjs";

// load header and footer
loadHeaderFooter();
shoppingCart();
// Call function so it runs on page load and updates cart count

// COMMENTING OUT IN ORDER TO FIX ADDTOCART FUNCTION FROM PRODUCTDETAILS.MJS
// document.addEventListener("DOMContentLoaded", () => {
//     // Your code here
//     updateCartItemCount();
//   });
// updateCartItemCount();

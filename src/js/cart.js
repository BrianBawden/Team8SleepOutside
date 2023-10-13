import { updateCartItemCount } from "./shoppingCart.mjs";
import shoppingCart from "./shoppingCart.mjs";

import { loadHeaderFooter } from "./utils.mjs";

// load header and footer
loadHeaderFooter();
shoppingCart();
// Call function so it runs on page load and updates cart count
updateCartItemCount();

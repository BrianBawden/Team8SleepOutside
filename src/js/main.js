import productList from "./productList.mjs";
import { 
    renderWithTemplate, 
    loadHeaderFooter, 
    qs,
    updateCartItemCount,
  } from "./utils.mjs";

// load header and footer
loadHeaderFooter();

productList(".product-list", "tents");


// Call function so it runs on page load and updates cart count
// updateCartItemCount();

import { check } from "prettier";
import { loadHeaderFooter } from "./utils.mjs";
import { fetchAlerts } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", fetchAlerts);

// load header and footer
loadHeaderFooter();

// Call function so it runs on page load and updates cart count
// updateCartItemCount();

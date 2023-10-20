
import productList from "./productList.mjs";
import { getParam, qs } from "./utils.mjs";

const category = getParam("category")

const h2Product = qs(".topProducts");
h2Product.textContent = `Top Products: ${category}`

productList(".product-list", category);
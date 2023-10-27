import {
  getData
} from "./externalServices.mjs";

import {
  renderListWithTemplate
} from "./utils.mjs";

// productList.mjs
function productCardTemplate(product) {
  const finalPrice = product.FinalPrice;
  const suggestedRetailPrice = product.SuggestedRetailPrice;
  const isDiscounted = finalPrice < suggestedRetailPrice;
  const percentOff = isDiscounted 
    ? Math.round((1 - finalPrice / suggestedRetailPrice) * 100) 
    : 0;

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    ${
      isDiscounted
        ? `<p class="product-card__price discounted" id="productSuggestedRetailPrice">
            <s>$${suggestedRetailPrice.toFixed(2)}</s> 
            <span class="percent-off" id="discount">${percentOff}% off</span>
          </p>
          <p class="product-card__price" id="productFinalPrice">$${finalPrice.toFixed(2)}</p>`
        : `<p class="product-card__price" id="productFinalPrice">$${finalPrice.toFixed(2)}</p>`
    }
    </a>
  </li>`;
}



export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  const products = await getData(category);
  const ids = ["880RR", "985RF", "985PR", "344YJ"];
  // const filteredProducts = products.filter((product) =>  ids.includes(product.Id));

  const parent = document.querySelector(selector);
  //renderList(products, parent);
  renderListWithTemplate(productCardTemplate, parent, products);
};

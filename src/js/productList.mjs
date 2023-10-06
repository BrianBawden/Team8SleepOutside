import {
  getData
} from "./productData.mjs";

// productList.mjs
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  const products = await getData(category);
  
  const parent = document.querySelector(selector);
    renderList(products, parent);
};

function renderList(list, el) {
    const htmlStrings =  list.map(productCardTemplate);
    el.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

}
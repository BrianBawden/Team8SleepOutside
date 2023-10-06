import {
  getData
} from "./productData.mjs";

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  const products = await getData(category);
  //console.log("Product List", products);
  const parent = document.querySelector(selector);
  products.forEach(
    (product) => {
      const li = document.createElement("li");
      li.classList.add("product-card");
      const a = document.createElement("a");
      a.href = `product_pages/index.html?product=${product.Id}`;
      const img = document.createElement("img");
      img.src = product.Image;
      img.alt = product.Name;
      a.appendChild(img);
      const h3 = document.createElement("h3");
      h3.classList.add("card__brand");
      h3.textContent = product.Brand.Name;
      a.appendChild(h3);
      const h2 = document.createElement("h2");
      h2.classList.add("card__name");
      h2.textContent = product.Name;
      a.appendChild(h2);
      const p = document.createElement("p");
      p.classList.add("product-card__price");
      p.textContent = `$${product.FinalPrice}`;
      a.appendChild(p);
      li.appendChild(a);
      parent.appendChild(li);
    })
};

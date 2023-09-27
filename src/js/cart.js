import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML =
    cartItemTemplate(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


// getStorageKeys returns an array of the keys in the localStorage.
function getStorageKeys(){
  let arrayStorageKeys = [];

  for (let i = 0; i < localStorage.length; i++){
    const localKey = localStorage.key(i);
    arrayStorageKeys.push(localKey);
    // console.log(arrayStorageKeys)
    return arrayStorageKeys;
  }
}

// totalCalc returns the total final price of items in the cart based on keys in local storage.
function totalCalc(arrayKeys){
  let total = 0;
  arrayKeys.forEach(element => {
    let currentArray = getLocalStorage(element);
    console.log(getLocalStorage(element));
    console.log(currentArray.FinalPrice);
    total += currentArray.FinalPrice;
    
  });
  return total;

}

function showTotal() {
  const totalClass = document.querySelector(".total");
  if(totalClass.classList.contains("hide")){
    totalClass.classList.remove("hide");
    totalClass.classList.add("show");
  }
}

renderCartContents();

/*
 This if statement checks to see if there are any keys in the local storage. If there are it will add the final price of all the objects together and switch the hide class to show.
 */
if (localStorage.length !== 0) {
  let arrayKeys = getStorageKeys();
  let getCartTotal = totalCalc(arrayKeys);
  let finalTotal = document.querySelector(".cartTotal");

  finalTotal.textContent = getCartTotal;
  showTotal();
}
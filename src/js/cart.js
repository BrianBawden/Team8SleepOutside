import { getLocalStorage, getLocalStorageKeys } from "./utils.mjs";

// update cart item count in header
export function updateCartItemCount() {
  const cartItems = Object.keys(localStorage);
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.getElementById("cartItemCount");

  if (cartItemCountElement !== null) {
    if (cartItemCount === 0) {
      // If there aren't items in the cart, hide the cartItemCount element
      cartItemCountElement.style.display = "none";
    } else {
      // If there are items in the cart, show the cartItemCount element
      cartItemCountElement.style.display = "block";
      cartItemCountElement.textContent = cartItemCount;
    }
  }
}

// Call function so it runs on page load and updates cart count
updateCartItemCount();

function renderCartContents() {
  const cartItemskeys = getLocalStorageKeys();
  const cartItems = cartItemskeys.map((key) => getLocalStorage(key));
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();
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
  <button class="cart-card__quantity_add">+</button>
  <button class="cart-card__quantity_sub" id="cart_sub">-</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">Remove</span>
  </li>`;

  return newItem;
}

// totalCalc returns the total final price of items in the cart based on keys in local storage.
function totalCalc(arrayKeys) {
  let total = 0;
  arrayKeys.forEach((element) => {
    let currentArray = getLocalStorage(element);
    if (currentArray && currentArray.FinalPrice) {
      // check if currentArray and FinalPrice are not null
      total += currentArray.FinalPrice;
    } else {
      console.error(`Invalid item found in localStorage with key: ${element}`);
    }
  });
  return total;
}

// showTotal checks if the html class total has a hide class. If it does the hide class is removed and replaced with show to affect it's visibility on the cart index.html webpage.
function showTotal() {
  const totalClass = document.querySelector(".total");
  if (totalClass.classList.contains("hide")) {
    totalClass.classList.remove("hide");
    totalClass.classList.add("show");
  }
}

/*
 This if statement checks to see if there are any keys in the local storage. If there are it will add the final price of all the objects together and switch the hide class to show.
 */
if (localStorage.length !== 0) {
  let arrayKeys = getLocalStorageKeys();
  let getCartTotal = totalCalc(arrayKeys);
  let finalTotal = document.querySelector(".cartTotal");
  finalTotal.textContent = `$${getCartTotal}`;

  renderCartContents();
  showTotal();
}

// removeItem removes the item from the cart and updates the total price.
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemoveItem);
  });
}
// updateTotal updates the total price of the cart.
function updateTotal() {
  let arrayKeys = getLocalStorageKeys();
  let getCartTotal = totalCalc(arrayKeys);
  let finalTotal = document.querySelector(".cartTotal");
  finalTotal.textContent = `$${getCartTotal}`;
}
// handleRemoveItem removes the item from the cart and updates the total price.
function handleRemoveItem(event) {
  const itemId = event.target.dataset.id;
  localStorage.removeItem(itemId);
  renderCartContents();
  updateTotal();
  updateCartItemCount();
}

// Brian Bawden: addQty returns the current quantity of an item increased by one and is called by the .cart-card__quantity_add button.
function addQty(oldQty){
  let qty = oldQty + 1;
  return qty
}

// Brian Bawden: subQty returns the current quantity of an item decreased by one and is called by the .cart-card__quantity_sub button.
function subQty(oldQty){
  let qty = oldQty - 1;
  return qty
}
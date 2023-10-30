import {
  getLocalStorage,
  renderListWithTemplate,
  setLocalStorage
} from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
  addEventListener();
}


function displayCartTotal(total) {
  const listFooter = document.querySelector(".list-footer");
  if (total > 0 && listFooter.classList.contains("hide")) {
    // show our checkout button and total if there are items in the cart.
    listFooter.classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
  } 
  // else {
  //   listFooter.classList.add("hide");
  // }
}

function cartItemTemplate(item) {

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.qty}</p>
  <button class="cart-card__quantity_add" value="${item.Id}">+</button>
  <button class="cart-card__quantity_sub" id="cart_sub" value="${item.Id}">-</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice * item.qty);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total.toFixed(2);
}

function addEventListener(){
  const addBtn = document.querySelectorAll(".cart-card__quantity_add");
  const subBtn = document.querySelectorAll(".cart-card__quantity_sub");

  addBtn.forEach(button => {
    button.addEventListener("click", addQty)
    button.myProduct = button.value;
  })

  subBtn.forEach(button => {
    button.addEventListener("click", subQty)
    button.myProduct = button.value;
  })
}

function addQty(product){
  const outputEl = document.querySelector(".product-list");

  let cartContents = getLocalStorage("so-cart");
  let productId = product.currentTarget.myProduct;

  cartContents.forEach(item => {
    if (item.Id == productId){
      item.qty += 1;
    }
  })
  setLocalStorage("so-cart", cartContents);
  cartCount()
  ShoppingCart()
}

function subQty(product){
  let cartContents = getLocalStorage("so-cart");
  let productId = product.currentTarget.myProduct;
  cartContents.forEach(item => {
    if (item.Id == productId){
      if(item.qty > 1){item.qty -= 1;}
    }
  })
  setLocalStorage("so-cart", cartContents);
  cartCount()
  ShoppingCart()
}


/* BY - Trello card: Add a superscript number 
of items in the cart to the backpack icon in 
the header. 
*** THIS FUNCTION MUST BE CALLED 
    on page load, when an item is added, 
    and when an item is removed from the cart *** */
export function cartCount() {
  const cartItems = getLocalStorage("so-cart");
  let cartQty = 0;
  cartItems.forEach(item => {
    cartQty += item.qty;
  })
  const cartItemCountElement = document.getElementById("cartItemCount");
  if (cartItemCountElement) {
    if (cartItems && cartItems.length > 0) {
      cartItemCountElement.style.display = "block";
      cartItemCountElement.textContent = cartQty;
    } else {
      cartItemCountElement.style.display = "none";
    }
  }
}


/* BY-Trello card: Animate cart (backpack) icon when item added to cart
   Add the animation class and remove it after a 2 second/2000 millisecond delay 
   Export and call with any functions that modify cart count + or - */
export function cartIconAnimation() {
  const cartIcon = document.querySelector(".cart");
  if (cartIcon) {
    cartIcon.classList.add("iconAnimation");
    setTimeout(() => {
      cartIcon.classList.remove("iconAnimation");
    }, 2000);
  }
}



// function cartItemTemplate(item) {
//   // let qty = document.querySelector(".qty");
//   // let qtyValue = qty.value;
//   const newItem = `<li class="cart-card divider">
//     <a href="#" class="cart-card__image">
//       <img
//         src="${item.Images.PrimarySmall}"
//         alt="${item.Name}"
//       />
//     </a>
//     <a href="#"
//       <h2 class="card__name">${item.Name}</h2>
//     </a>
//     <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//     <p class="cart-card__quantity" >qty: <span id="${item.Id}">${item.qty}</span> </p>
//     <button class="cart-card__quantity_add" value="${item.Id}">+</button>
//     <button class="cart-card__quantity_sub" id="cart_sub" value="${item.Id}">-</button>
//     <p class="cart-card__price">$${item.FinalPrice}</p>
//     <span class="remove-item" data-id="${item.Id}">Remove</span>
//     </li>`;

//   return newItem;
// }

// export function renderCartContents() {
//   const cartItemskeys = getLocalStorageKeys();
//   const cartItems = cartItemskeys.map((key) => getLocalStorage(key));
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   attachRemoveListeners();
//   addQtyBtnListeners();
//   showTotal();
// }

// // totalCalc returns the total final price of items in the cart based on keys in local storage.
// function totalCalc(arrayKeys) {
//   let total = 0;
//   arrayKeys.forEach((element) => {
//     let currentArray = getLocalStorage(element);
//     if (currentArray && currentArray.FinalPrice) {
//       // check if currentArray and FinalPrice are not null
//       total += currentArray.FinalPrice;
//     } else {
//       console.error(`Invalid item found in localStorage with key: ${element}`);
//     }
//   });
//   return total;
// }

// // showTotal checks if the html class total has a hide class. If it does the hide class is removed and replaced with show to affect it's visibility on the cart index.html webpage.
// function showTotal() {
//   const totalClass = document.querySelector(".total");
//   if (totalClass.classList.contains("hide")) {
//     totalClass.classList.remove("hide");
//     totalClass.classList.add("show");
//   }
// }
// // hideTotal checks if the html class total has a show class. If it does the show class is removed and replaced with hide to affect it's visibility on the cart index.html webpage.
// function hideTotal() {
//   const totalClass = document.querySelector(".total");
//   if (totalClass.classList.contains("show")) {
//     totalClass.classList.remove("show");
//     totalClass.classList.add("hide");
//   }
// }
// //This if statement checks to see if there are any keys in the local storage. If there are it will add the final price of all the objects together and switch the hide class to show.
// if (localStorage.length !== 0) {
//   let arrayKeys = getLocalStorageKeys();
//   let getCartTotal = totalCalc(arrayKeys);
//   let finalTotal = document.querySelector(".cartTotal");
//   finalTotal.textContent = `$${getCartTotal}`;

//   renderCartContents();
//   showTotal();
// }

// // removeItem removes the item from the cart and updates the total price.
// function attachRemoveListeners() {
//   const removeButtons = document.querySelectorAll(".remove-item");
//   removeButtons.forEach((button) => {
//     button.addEventListener("click", handleRemoveItem);
//   });
// }
// // updateTotal updates the total price of the cart based on item quantities.
// function updateTotal() {
//   const arrayKeys = getLocalStorageKeys();
//   //let getCartTotal = totalCalc(arrayKeys);
//   let total = 0;

//   arrayKeys.forEach((key) => {
//     const item = getLocalStorage(key);
//     const qty = item.qty;
//     // Calculate the total price for each item and add it to the overall total
//     if (item && item.FinalPrice) {
//       const itemPrice = item.FinalPrice;
//       total += qty * itemPrice;
//     } else {
//       //console.error(`Invalid item found in localStorage with key: ${key}`);
//     }
//   });
//   // Update the cartTotal element with the calculated total
//   const finalTotal = document.querySelector(".cartTotal");
//   finalTotal.textContent = `$${total.toFixed(2)}`;
// }

// // handleRemoveItem completely deletes that item (no matter the quantity) from the cart and updates the total price.
// function handleRemoveItem(event) {
//   const itemId = event.target.dataset.id;
//   localStorage.removeItem(itemId);
//   renderCartContents();
//   updateTotal();
//   updateCartItemCount();
//   hideTotal();
// }

// //listens when the quantity + and - buttons are clicked and calls the addQty and subQty functions
// function addQtyBtnListeners() {
//   const addBtn = document.querySelectorAll(".cart-card__quantity_add");
//   const subBtn = document.querySelectorAll(".cart-card__quantity_sub");

//   addBtn.forEach((button) => {
//     button.addEventListener("click", addQty, false);
//     button.myProduct = button.value;
//   });

//   subBtn.forEach((button) => {
//     button.addEventListener("click", subQty);
//     button.myProduct = button.value;
//   });
// }

// // Brian Bawden: addQty returns the current quantity of an item increased by one and is called by the .cart-card__quantity_add button.
// function addQty(product) {
//   let productId = product.currentTarget.myProduct;
//   let qtyElement = document.getElementById(productId);
//   let productValue = JSON.parse(localStorage.getItem(productId));

//   productValue.qty += 1;
//   setLocalStorage(productId, productValue);
//   qtyElement.textContent = productValue.qty;
//   //update the total displayed on page as well as the cart item count badge over the icon
//   updateTotal();
//   updateCartItemCount();
// }

// // Brian Bawden: subQty returns the current quantity of an item decreased by one and is called by the .cart-card__quantity_sub button.
// function subQty(product) {
//   let productId = product.currentTarget.myProduct;
//   let qtyElement = document.getElementById(productId);
//   let productValue = JSON.parse(localStorage.getItem(productId));
//   //don't allow the counter to be negative
//   if (productValue.qty > 0) {
//     productValue.qty -= 1;
//     setLocalStorage(productId, productValue);
//     qtyElement.textContent = productValue.qty;
//   }
//   //update the total displayed on page as well as the cart item count badge over the icon
//   updateTotal();
//   updateCartItemCount();
// }

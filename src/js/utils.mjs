// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Retrieve all keys from localstorage
export function getLocalStorageKeys() {
  return Object.keys(localStorage).filter((key) => {
    const item = localStorage.getItem(key);
    try {
      JSON.parse(item);
      return true; // Keep this key
    } catch (e) {
      console.error(
        `Error parsing item with key ${key} from localStorage: ${e}`
      );
      return false; // Discard this key
    }
  });
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(
      `Error parsing item with key ${key} from localStorage:`,
      error
    );
    return null; // or some other default value or action
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

export function loadTemplate(path) {
  return async function () {
    const response = await fetch(path);
    if (response.ok) {
      const html = await response.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");
  renderWithTemplate(headerTemplateFn, headerElement);
  renderWithTemplate(footerTemplateFn, footerElement);
}


// Update cart item badge count in header
export function updateCartItemCount() {
  let cartTotal = 0;
  const cartItems = Object.keys(localStorage);
  const cartItemCount = cartItems.forEach(function(item) {
    let product = getLocalStorage(item);
    cartTotal += product.qty;
  })
  const cartItemCountElement = document.getElementById("cartItemCount");

  if (cartItemCountElement !== null) {
    if (cartTotal === 0) {
      // If there aren't items in the cart, hide the cartItemCount element
      cartItemCountElement.style.display = "none";
    } else {
      // If there are items in the cart, show the cartItemCount element
      cartItemCountElement.style.display = "block";
      cartItemCountElement.textContent = cartTotal;
    }
  }
}
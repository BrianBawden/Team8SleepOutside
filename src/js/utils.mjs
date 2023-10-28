import {
  cartCount
} from "./shoppingCart.mjs";

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
    console.log("item", item);
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
  if (clear && parentElement !== null) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// header and footer calls
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
  cartCount();
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


// Fetch alerts for home page
export async function fetchAlerts() {
  try {
    const response = await fetch("/json/alerts.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    createAlerts(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation: ", error);
  }
}

function createAlerts(alerts) {
  if (alerts && alerts.length > 0) {
    const alertList = document.createElement("section");
    alertList.className = "alert-list";

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      alertList.appendChild(p);
    });

    const mainElement = document.querySelector("main");
    mainElement.prepend(alertList);
  }
}

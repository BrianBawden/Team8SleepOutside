// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// Retrieve all keys from localstorage
export function getLocalStorageKeys() {
  return Object.keys(localStorage).filter(key => {
    const item = localStorage.getItem(key);
    try {
      JSON.parse(item);
      return true; // Keep this key
    } catch (e) {
      console.error(`Error parsing item with key ${key} from localStorage: ${e}`);
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
    console.error(`Error parsing item with key ${key} from localStorage:`, error);
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

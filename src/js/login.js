import { check } from "prettier";
import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs";

loadHeaderFooter();
console.log(window.location.href);
let redirect = getParam("redirect");

if (redirect === null) {
  redirect = "/orders/index.html";
}
document.querySelector("#loginButton").addEventListener("click", (e) => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(email, password);
  login({ email, password }, redirect);
});





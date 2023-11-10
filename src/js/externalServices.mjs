const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return jsonResponse;
  } else {
    console.log(jsonResponse);
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  console.log(response);
  const data = await convertToJson(response);
  return data.Result;
}

// BB: The findProductById function uses the API to get the product data based on the
// id passed to the function and converts the API response to JSON. It then checks if
// product and its results are not null and the result.id matches id. If not the url is
// redirected to the error page.
export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);

  if (product != null && product.Result != null && product.Result.Id === id) {
    return product.Result;
  } else {
    window.location.href = "../product_pages/error.html";
  }
}

// team6 checkoutProcess.mjs
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(user) {
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  console.log(response);
  return response.accessToken;
}
// make a request to the server for the current orders
// requires: a valid token
// returns: a list of orders
export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}



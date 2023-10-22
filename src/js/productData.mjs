
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  console.log(response);
  const data = await convertToJson(response);
  return data.Result;
}

// export function getData(category = "tents") {
//   //Joshua's way of ensuring we have a returned promise 
// //   const response = fetch(`../json/${category}.json`).then(convertToJson).then((data) => {
// // console.log("data", data)
// //   return data
// // }
// //   );
// //   return response;
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

// BB: The findProductById function uses the API to get the product data based on the 
// id passed to the function and converts the API response to JSON. It then checks if 
// product and its results are not null and the result.id matches id. If not the url is
// redirected to the error page.
export async function findProductById(id) {
  
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);

  if (product != null && product.Result != null && product.Result.Id === id){
    return product.Result;
  } else{
    window.location.href = '../product_pages/error.html';
  }


}
  // }); products.find((item) => {
  // if (item.Id === id){
  //   return item;
  // } else {
  //   console.log("productData line 28");
  //   // window.location.href = 'https://www.google.com/';
  // }  
  // });
// }

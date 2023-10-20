
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

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  console.log("find", product);
  return product.Result;

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

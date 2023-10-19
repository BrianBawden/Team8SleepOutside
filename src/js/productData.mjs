function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  //Joshua's way of ensuring we have a returned promise 
//   const response = fetch(`../json/${category}.json`).then(convertToJson).then((data) => {
// console.log("data", data)
//   return data
// }
//   );
//   return response;
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  for (let item of products) {
    if (item.Id === id) {
      return item;
    }
  };
  window.location.href = '../product_pages/error.html';

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

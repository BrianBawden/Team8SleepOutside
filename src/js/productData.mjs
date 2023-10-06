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
  return products.find((item) => item.Id === id);
}

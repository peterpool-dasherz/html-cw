const products = [
    { id: 1, name: "Laptop Dell XPS 13", category: "Laptop", price: 1500, position: 1, quantity: 10 },
    { id: 2, name: "iPhone 15", category: "Smartphone", price: 1200, position: 2, quantity: 20 },
    { id: 3, name: "Samsung Galaxy S24", category: "Smartphone", price: 1100, position: 3, quantity: 15 },
    { id: 4, name: "iPad Pro", category: "Tablet", price: 1000, position: 4, quantity: 8 },
    { id: 5, name: "MacBook Pro", category: "Laptop", price: 2000, position: 5, quantity: 5 },
    { id: 6, name: "Logitech MX Master 3", category: "Accessory", price: 120, position: 6, quantity: 30 },
    { id: 7, name: "Sony WH-1000XM5", category: "Headphone", price: 400, position: 7, quantity: 12 },
    { id: 8, name: "Apple Watch Series 9", category: "Smartwatch", price: 450, position: 8, quantity: 18 },
    { id: 9, name: "Asus ROG Strix", category: "Laptop", price: 1800, position: 9, quantity: 7 },
    { id: 10, name: "Xiaomi Pad 6", category: "Tablet", price: 500, position: 10, quantity: 25 }
];

// for(let i = 0; i < products.length; i++) {
//     console.log(`Product: ${products[i].name}, Price: $${products[i].price}`);
// }

// for(let i = products.length - 1; i >= 0; i--) {
//     console.log(`Product: ${products[i].name}, Price: $${products[i].price}`);
// }
// Foreach, Map, Filter, Reduce, Find, Some, Every, Sort, Reverse, Slice, Splice, Concat, Join, Includes, IndexOf, LastIndexOf, Flat, FlatMap

let StopCondition = 0;
while(StopCondition < products.length) {
    console.log(`Product: ${products[StopCondition].name}, Price: $${products[StopCondition].price}`);
    StopCondition++;
}
// 1. forEach
 // products.forEach(product => {
   // console.log(`Product: ${product.name}, Price: $${product.price}`);
 // });

 // products.forEach((item, index, array) => {
    // console.log(`Product: ${item.name}, Price: $${item.price}`);
 // });
 // function traverseArray(item, index, array) {
    // return `Product: ${item.name}, Price: $${item.price}`
 // }


// 2. map
const productNames = products.map((product, index, array) => `${index + 1}. ${product.name} - $${product.price}`);
console.log(productNames);

// 3. filter
const laptops = products.filter((product, index) => {
    return product.price > 500;
});
console.log(laptops);

// 4. reduce
// const totalInventoryValue = products.reduce((total, product) => total + (product.price * product.quantity), 0);
// console.log(`Total Inventory Value: $${totalInventoryValue}`);

// const totalInventory = products.reduce((accumulateValue, item, index, array) => {
//     return accumulateValue + item.quantity;
// }   , 0);
// console.log(`Total Inventory: ${totalInventory}`);

// const totalLaptops = products.reduce((total, product) => {
//    return product.category === 'Laptop' ? total + 1 : total;
// }, 0);
// console.log(`Total Laptops: ${totalLaptops}`);

const itemNamesString = products.reduce((string, product, index, array) => {
    return (index < array.length - 1) ? string + product.name + ", " : string + product.name;
}, "");
console.log(itemNamesString);

// 5. find
const iphone = products.find(product => product.name === "iPhone 15");
console.log(iphone);

// 6. some
const hasExpensiveProducts = products.some(product => product.price > 1000);
console.log(`Are there any expensive products? ${hasExpensiveProducts}`);

// 7. every
const allInStock = products.every(product => product.quantity > 0);
console.log(`Are all products in stock? ${allInStock}`);

// 8. sort
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
console.log(sortedByPrice);

// 9. reverse
const reversedProducts = [...products].reverse();
console.log(reversedProducts);

// 10. slice
const top5Products = products.slice(0, 5);
console.log(top5Products);

// 11. splice
const removedProduct = products.splice(2, 1); // Remove the product at index 2
console.log(removedProduct);
console.log(products);

// 12. concat
const moreProducts = [
    { id: 11, name: "Google Pixel 7", category: "Smartphone", price: 900, position: 11, quantity: 10 },
    { id: 12, name: "Dell UltraSharp Monitor", category: "Accessory", price: 300, position: 12, quantity: 20 }
];
const allProducts = products.concat(moreProducts);
console.log(allProducts);

// 13. join
const productNamesString = productNames.join(", ");
console.log(productNamesString);

// 14. includes
const hasLaptop = products.some(product => product.name.includes("Laptop"));
console.log(`Is there a laptop in the products? ${hasLaptop}`);

// 15. indexOf
const indexOfIphone = products.findIndex(product => product.name === "iPhone 15");
console.log(`Index of iPhone 15: ${indexOfIphone}`);

// 16. lastIndexOf
const lastIndexOfLaptop = products.map(product => product.category).lastIndexOf("Laptop");
console.log(`Last index of Laptop category: ${lastIndexOfLaptop}`);

// 17. flat
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flatArray = nestedArray.flat();
console.log(flatArray);
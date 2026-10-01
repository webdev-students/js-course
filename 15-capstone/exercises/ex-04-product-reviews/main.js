// Exercise 4 — Product reviews
const response = await fetch('https://dummyjson.com/products/1');
const product = await response.json();

document.querySelector('#product-title').textContent = product.title;

// TODO: getAverageRating, createStars, the summary, the list, sorting

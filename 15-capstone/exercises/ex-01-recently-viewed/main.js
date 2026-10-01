// Exercise 1 — Recently viewed
const STORAGE_KEY = 'checkout-app:recently-viewed';
const MAX_RECENT = 4;

const response = await fetch('https://dummyjson.com/products?limit=8&select=title');
const { products } = await response.json();

const buttons = document.querySelector('#product-buttons');
for (const product of products) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.id = product.id;
  button.textContent = product.title;
  buttons.append(button);
}

buttons.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  viewProduct(products.find((product) => product.id === Number(button.dataset.id)));
});

function viewProduct(product) {
  document.querySelector('#viewing').textContent = product.title;
  // TODO: remember it and redraw the "Recently viewed" list
}

// TODO: loadRecentIds(), addRecentId(id), renderRecent()

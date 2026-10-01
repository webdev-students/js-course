// Lesson 9.7 — Rendering lists from data

// Products, shaped like the DummyJSON data the Checkout store uses.
const products = [
  { id: 1, title: 'Wireless Mouse', category: 'electronics', price: 19.99, stock: 25 },
  { id: 2, title: 'Leather Wallet', category: 'accessories', price: 34.5, stock: 0 },
  { id: 3, title: 'Desk Lamp', category: 'home', price: 27, stock: 8 },
  { id: 4, title: 'USB-C Charger', category: 'electronics', price: 15.99, stock: 42 },
  { id: 5, title: 'Water Bottle', category: 'home', price: 12.5, stock: 3 },
];

const grid = document.querySelector('#product-grid');
const resultCount = document.querySelector('#result-count');

// From lesson 9.3: make untrusted text safe for innerHTML.
function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

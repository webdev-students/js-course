// Lesson 9.7 style rendering, ready for events.
let products = [
  { id: 1, title: 'Wireless Mouse', price: 19.99 },
  { id: 3, title: 'Desk Lamp', price: 27 },
  { id: 5, title: 'Water Bottle', price: 12.5 },
];
const productGrid = document.querySelector('#product-grid');
const cartCount = document.querySelector('#cart-count');
const cart = [];

function createProductCardHTML(product) {
  return `
    <li class="product-card" data-product-id="${product.id}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button type="button" data-action="add-to-cart">Add to <strong>cart</strong></button>
      <button type="button" class="secondary" data-action="details">Details</button>
    </li>
  `;
}

function renderProducts() {
  productGrid.innerHTML = products.map(createProductCardHTML).join('');
}

renderProducts();

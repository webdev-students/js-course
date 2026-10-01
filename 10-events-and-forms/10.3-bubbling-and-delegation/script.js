// Lesson 10.3 — Bubbling and delegation
const products = [
  { id: 1, title: 'T-shirt' },
  { id: 2, title: 'Sneakers' },
  { id: 3, title: 'Backpack' },
];
const grid = document.querySelector('#product-grid');

function renderProducts() {
  grid.innerHTML = products
    .map((product) => `
      <li class="product-card" data-product-id="${product.id}">
        <h3>${product.title}</h3>
        <button type="button" class="button" data-action="add">Add to cart</button>
        <button type="button" class="button secondary" data-action="remove">Remove</button>
      </li>`)
    .join('');
}
renderProducts();

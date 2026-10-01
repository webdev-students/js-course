// Exercise 5 — Infinite scroll
const PAGE_SIZE = 12;

async function fetchPage(skip) {
  const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}&select=title,price`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json(); // { products, total, skip, limit }
}

function createCard(product) {
  const card = document.createElement('li');
  card.className = 'card';
  card.textContent = `${product.title} — $${product.price}`;
  return card;
}

// TODO: state, loadMore(), the IntersectionObserver

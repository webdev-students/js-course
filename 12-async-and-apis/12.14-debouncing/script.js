// Lesson 12.14 — Debouncing (and ignoring stale answers)
const searchInput = document.querySelector('#search-input');
const results = document.querySelector('#results');
const searchCount = document.querySelector('#search-count');
let requestsSent = 0;

async function searchProducts(text) {
  requestsSent++;
  searchCount.textContent = requestsSent;
  const params = new URLSearchParams({ q: text, limit: 3, select: 'title' });
  const response = await fetch(`https://dummyjson.com/products/search?${params}`);
  const data = await response.json();
  return data.products.map((product) => product.title);
}

function showResults(text, titles) {
  console.log(`Showing results for "${text}"`);
  results.innerHTML = '';
  titles.forEach((title) => {
    const item = document.createElement('li');
    item.textContent = title;
    results.append(item);
  });
}

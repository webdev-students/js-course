// Lesson 12.10 — Loading, error and empty states
let apiBaseUrl = 'https://dummyjson.com';

async function request(path) {
  const response = await fetch(apiBaseUrl + path);
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const statusArea = document.querySelector('#status-area');
const productList = document.querySelector('#product-list');

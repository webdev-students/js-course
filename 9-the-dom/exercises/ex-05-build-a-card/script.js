// Exercise 5 — Build a card
const product = { id: 3, title: 'Desk Lamp', category: 'home', price: 27 };
const cardSlot = document.querySelector('#card-slot');

function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Way 1: function createProductCard(product) { … }

// Way 2: function createProductCardHTML(product) { … }

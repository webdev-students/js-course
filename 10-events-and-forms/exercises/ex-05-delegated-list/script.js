// Exercise 5 — Delegated wishlist
let wishlist = [
  { id: 2, title: 'Leather Wallet' },
  { id: 3, title: 'Desk Lamp' },
  { id: 7, title: 'Headphones' },
];
const cart = [];

function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Exercise 6 — Render the city list
const cities = [
  { name: 'London', country: 'United Kingdom', days: 1 },
  { name: 'Istanbul', country: 'Türkiye', days: 2 },
  { name: 'Athens', country: 'Greece', days: 2 },
  { name: 'Edinburgh', country: 'United Kingdom', days: 3 },
  { name: 'Kyoto', country: 'Japan', days: 4 },
  { name: 'San Francisco', country: 'United States', days: 3 },
];
const cityList = document.querySelector('#city-list');
const cityCount = document.querySelector('#city-count');

function escapeHTML(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Your functions here.

// Exercise 1 — everything in one file. Split it into modules!
const SHOP_NAME = 'Mira Style Shop';
const VAT_RATE = 0.075;

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function addVat(amount) {
  return amount * (1 + VAT_RATE);
}

const products = [
  { title: 'Ring (18k)', price: 95 },
  { title: 'Pen case (XL)', price: 31 },
];

document.querySelector('#shop-name').textContent = SHOP_NAME;
const list = document.querySelector('#product-list');
for (const product of products) {
  const item = document.createElement('li');
  item.textContent = `${product.title} — ${formatPrice(addVat(product.price))} incl. VAT`;
  list.append(item);
}

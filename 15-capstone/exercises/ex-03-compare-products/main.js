// Exercise 3 — Compare products
const MAX_COMPARE = 3;

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const response = await fetch('https://dummyjson.com/products?limit=6&select=title,price,rating,brand,stock');
const { products } = await response.json();

const picker = document.querySelector('#product-picker');
for (const product of products) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = product.id;
  label.append(checkbox, ` ${product.title}`);
  picker.append(label);
}

// TODO: selectedIds, the change listener, renderTable()

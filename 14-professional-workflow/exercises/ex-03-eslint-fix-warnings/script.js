// Exercise 3 — Fix the ESLint problems
var items = [
  { title: 'Ring', price: 95, quantity: 1 },
  { title: 'Belts', price: 22, quantity: 2 },
];
let label = 'Cart'
var count = 0;
let total = 0;
const debugMode = true;
for (var i = 0; i < items.length; i++) {
  count += items[i].quantity;
  total += items[i].price * items[i].quantity;
}
if (count == '3') {
  console.log(label + ': ' + count + ' items, $' + total)
}

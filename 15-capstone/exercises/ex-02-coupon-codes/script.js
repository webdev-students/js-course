// Exercise 2 — Coupon codes
const FREE_SHIPPING_FROM = 50;
const SHIPPING_COST = 4.99;

const cart = [
  { title: 'Powder Canister', price: 14.99, quantity: 1 },
  { title: 'Red Lipstick', price: 12.99, quantity: 2 },
];

function getTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM || subtotal === 0 ? 0 : SHIPPING_COST;
  return { subtotal, shipping, total: subtotal + shipping };
}

console.log(getTotals(cart));

// TODO: applyCoupon(items, code)

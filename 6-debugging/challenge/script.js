// Challenge — Fix the broken cart (5 bugs!)
const DELIVERY_FEE = 15;
const FREE_DELIVERY_FROM = 200;

const formatMoney = (amount) => `$${amount.toFixed(2)}`;

function getLineTotal(price, quantity) {
  return price + quantity;
}

function getDiscount(subtotal, code) {
  if (code.trim().toUpperCase() === 'save10') {
    return subtotal * 0.1;
  }
  return 0;
}

function getDeliveryFee(amount) {
  return amount >= FREE_DELIVERY_FROM ? DELIVERY_FEE : 0;
}

const tShirtTotal = getLineTotal(25, 2);
const backpackTotal = getLineTotal(45, 1);
console.log(`2 × T-shirt: ${formatMoney(tShirtTotal)}`);
console.log(`1 × Backpack: ${formatMoney(backpackTotl)}`);

const subtotal = tShirtTotal + backpackTotal;
const discount = getDiscount(subtotal, ' save10 ');
const delivery = getDeliveryFee(subtotal - discount);
console.log(`Subtotal: ${formatMoney(subtotal)}`);
console.log(`Discount (SAVE10): ${formatMoney(discount)}`);
console.log(`Delivery: ${formatMoney(delivery)}`);
console.log(`Total: ${formatMoney(subtotal - discount + delivery)}`);
DELIVERY_FEE = 20;

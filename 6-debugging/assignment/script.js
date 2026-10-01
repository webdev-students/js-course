// Fix the Broken App — Module 6 assignment
// A receipt printer for Mira Accessories. It has 10 planted bugs.
const SHOP_NAME = 'Mira Accessories';
const VAT_RATE = 0.75;
const DELIVERY_FEE = 15;
const FREE_DELIVERY_FROM = 200;
const RECEIPT_WIDTH = 34;

const formatMoney = (amount) => `$${amount.toFixed(2)}`;

function getLineTotal(unitPrice, quantity) {
  return unitPrice + quantity;
}

function printLine(name, unitPrice, quantity) {
  const lineTotal = getLineTotal(unitPrice, quantity);
  console.log(`${quantity} × ${name}`.padStart(22) + formatMoney(lineTotal).padStart(12));
}

function getDiscount(subtotal, couponCode) {
  const code = couponCode.trim();
  if (code === 'SAVE10') {
    return subtotal * 0.1;
  }
  if (code === 'FIRSTORDER') {
    return 10;
  }
  return 0;
}

function getDeliveryFee(amount) {
  return amount >= FREE_DELIVERY_FROM ? DELIVERY_FEE : 0;
}

function printReceipt(customerName, couponCode) {
  console.log('='.repeat(RECEIPT_WIDTH);
  console.log(SHOP_NAM);
  console.log(`Customer: ${customerName}`);
  console.log('-'.repeat(RECEIPT_WIDTH));

  const subtotal = 0;
  subtotal += printLine('Jade bangle', 25, 2);
  subtotal += printLine('Watches', 30, 2);
  subtotal += printLine('Pins', 8, 3);
  subtotal += printLine('Pearl pin', 2, 7);

  const discount = getDiscount(subtotal, couponCode);
  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * VAT_RATE;
  const delivery = getDeliveryFee(afterDiscount);
  const total = afterDiscount + vat + delivery;

  console.log('-'.repeat(RECEIPT_WIDTH));
  console.log('Subtotal:'.padEnd(22) + formatMoney(subtotal).padStart(12));
  console.log('Discount:'.padEnd(22) + `-${formatMoney(discount)}`.padStart(12));
  console.log('VAT (7.5%):'.padEnd(22) + formatMoney(vat).padStart(12));
  console.log('Delivery:'.padEnd(22) + (delivery === 0 ? 'FREE' : formatMoney(delivery)).padStart(12));
  console.log('TOTAL:'.padEnd(22) + formatMoney(total).padStart(12));
  console.log('='.repeat(RECEIPT_WIDTH));
}

printReceipt('Amy', ' save10 ');
printReceipt('Tyler');

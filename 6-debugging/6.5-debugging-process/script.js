// Lesson 6.5 — A debugging process
// Bug report from a customer: "My total is wrong! I ordered 3 items at $20 with the
// code SAVE10, and I was charged $75."

const DELIVERY_FEE = 15;

const getSubtotal = (unitPrice, quantity) => unitPrice * quantity;

function getDiscountPercent(code) {
  if (code === 'SAVE10') {
    return 10;
  }
  if (code === 'SAVE20') {
    return 20;
  }
  return 0;
}

function getOrderTotal(unitPrice, quantity, code) {
  const subtotal = getSubtotal(unitPrice, quantity);
  const discount = subtotal * getDiscountPercent(code) / 10;
  return subtotal - discount + DELIVERY_FEE;
}

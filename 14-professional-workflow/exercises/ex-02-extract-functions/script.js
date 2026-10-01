// Exercise 2 — Extract functions
function printInvoice(items, couponCode) {
  let subtotal = 0;
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    console.log(`${item.quantity} × ${item.title}: $${lineTotal.toFixed(2)}`);
    subtotal += lineTotal;
  }
  let discount = 0;
  if (couponCode === 'SAVE10') {
    discount = subtotal * 0.1;
  } else if (couponCode === 'SAVE20') {
    discount = subtotal * 0.2;
  }
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Discount: $${discount.toFixed(2)}`);
  console.log(`Total: $${(subtotal - discount).toFixed(2)}`);
}

printInvoice(
  [
    { title: 'Ring (18k)', price: 95, quantity: 1 },
    { title: 'Pen case (XL)', price: 31, quantity: 2 },
  ],
  'SAVE10',
);

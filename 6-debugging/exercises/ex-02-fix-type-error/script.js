// Exercise 2 — Fix the TypeErrors
const itemsInCart = 1;
itemsInCart = itemsInCart + 1;
console.log('Items in cart:', itemsInCart);

const formatPrice = 45;
console.log('Price:', formatPrice(45));

function getCouponLabel(code) {
  return `Coupon: ${code.toUpperCase()}`;
}
console.log(getCouponLabel('save10'));
console.log(getCouponLabel());

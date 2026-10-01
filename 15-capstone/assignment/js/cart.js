// =============================================================
// cart.js — everything the cart can DO.
// No HTML in here: just rules. The UI files call these functions,
// and state.js tells the UI to redraw.
// =============================================================
import { getState, setState } from './state.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_OPTIONS } from './config.js';
import { getOriginalPrice, roundMoney, clamp } from './utils.js';

// STEP 20: a cart item keeps a small copy of the product, so the
// cart can draw itself after a refresh without asking the API again.
function createCartItem(product, quantity) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    stock: product.stock,
    quantity,
  };
}

// STEP 20: find one item in the cart (or undefined).
export function findCartItem(productId) {
  return getState().cart.find((item) => item.id === productId);
}

// STEP 20: how many of this product are already in the cart?
export function getQuantityInCart(productId) {
  const item = findCartItem(productId);
  return item ? item.quantity : 0;
}

// STEP 20: add a product. Never goes above the stock.
// Returns how many were ACTUALLY added (0 means "no more stock").
export function addToCart(product, quantity = 1) {
  const { cart } = getState();
  const currentQuantity = getQuantityInCart(product.id);
  const newQuantity = Math.min(currentQuantity + quantity, product.stock);
  const addedQuantity = newQuantity - currentQuantity;

  if (addedQuantity <= 0) {
    return 0;
  }

  if (currentQuantity > 0) {
    // Already in the cart → make a NEW array with that one item updated.
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity, stock: product.stock } : item,
    );
    setState({ cart: updatedCart });
  } else {
    setState({ cart: [...cart, createCartItem(product, newQuantity)] });
  }

  return addedQuantity;
}

// STEP 20: take an item out completely.
export function removeFromCart(productId) {
  const { cart } = getState();
  setState({ cart: cart.filter((item) => item.id !== productId) });
}

// STEP 20: set an exact quantity, kept between 1 and the stock.
export function updateQuantity(productId, quantity) {
  const { cart } = getState();
  const updatedCart = cart.map((item) => {
    if (item.id !== productId) {
      return item;
    }
    const safeQuantity = clamp(Math.round(quantity) || 1, 1, item.stock);
    return { ...item, quantity: safeQuantity };
  });
  setState({ cart: updatedCart });
}

// STEP 20: empty the whole cart.
export function clearCart() {
  setState({ cart: [] });
}

// STEP 21: total number of things in the cart (2 phones + 1 case = 3).
export function getItemCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// STEP 23: price × quantity for one line.
export function getLineTotal(item) {
  return roundMoney(item.price * item.quantity);
}

// STEP 25: the delivery fee for an amount and a delivery option.
// Standard is free once you reach the threshold. Express always costs.
export function getDeliveryFee(amount, deliveryOptionId = 'standard') {
  if (amount <= 0) {
    return 0; // empty cart → nothing to deliver
  }
  const option = DELIVERY_OPTIONS[deliveryOptionId] ?? DELIVERY_OPTIONS.standard;
  if (option.id === 'standard' && amount >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return option.fee;
}

// STEP 25: every number the cart summary needs, each built with reduce.
//   subtotal  → what it would cost at the ORIGINAL prices
//   discount  → how much the discounts save you
//   deliveryFee, total, and how far you are from free delivery
export function getCartTotals(cart, deliveryOptionId = 'standard') {
  const subtotal = roundMoney(
    cart.reduce((sum, item) => sum + getOriginalPrice(item) * item.quantity, 0),
  );
  const discount = roundMoney(
    cart.reduce((sum, item) => sum + (getOriginalPrice(item) - item.price) * item.quantity, 0),
  );
  const itemsTotal = roundMoney(subtotal - discount);
  const deliveryFee = getDeliveryFee(itemsTotal, deliveryOptionId);
  const total = roundMoney(itemsTotal + deliveryFee);
  const amountToFreeDelivery = itemsTotal > 0
    ? roundMoney(Math.max(0, FREE_DELIVERY_THRESHOLD - itemsTotal))
    : FREE_DELIVERY_THRESHOLD;

  return { subtotal, discount, itemsTotal, deliveryFee, total, amountToFreeDelivery };
}

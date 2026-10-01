// =============================================================
// orders.js — turning a cart into a (pretend) order.
// Orders are saved in localStorage. There is no server, so
// "placing an order" just means saving an object in the browser.
// =============================================================
import { getState, setState } from './state.js';
import { getCartTotals } from './cart.js';
import { DELIVERY_OPTIONS } from './config.js';
import { createOrderId } from './utils.js';

// STEP 32: build the order object, save it, and empty the cart.
// `payment` only ever holds the last 4 digits — never a full card number.
export function placeOrder({ customer, deliveryOptionId, payment }) {
  const { cart, orders } = getState();
  const deliveryOption = DELIVERY_OPTIONS[deliveryOptionId] ?? DELIVERY_OPTIONS.standard;

  const order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed (demo)',
    customer,
    delivery: { id: deliveryOption.id, label: deliveryOption.label, days: deliveryOption.days },
    items: cart.map((item) => ({ ...item })),
    totals: getCartTotals(cart, deliveryOption.id),
    payment,
  };


  // Newest order first, and the cart is emptied in the same update.
  setState({ orders: [order, ...orders], cart: [] });
  return order;
}

// STEP 32: look up one order by its ID (or undefined).
export function getOrderById(orderId) {
  return getState().orders.find((order) => order.id === orderId);
}


// STEP 33: wipe the order history (handy for demos and recording!).
export function clearOrders() {
  setState({ orders: [] });
}

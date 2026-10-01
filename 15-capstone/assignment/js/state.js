// =============================================================
// state.js — the single source of truth for our Checkout app.
// The page is just a picture of this object. We never change
// the page directly; we change the state, and everything that
// "subscribed" redraws itself.
// =============================================================
import { loadFromStorage, saveToStorage } from './storage.js';

// STEP 19: these parts of state are saved to localStorage.
const PERSISTED_KEYS = ['cart', 'wishlist', 'orders'];

// STEP 19: rules for what a valid saved item looks like.
// If someone breaks the data in DevTools, bad items are simply dropped.
function isObject(value) {
  return typeof value === 'object' && value !== null;
}
const itemValidators = {
  cart: (item) =>
    isObject(item) &&
    Number.isInteger(item.id) &&
    typeof item.price === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0,
  wishlist: (item) => isObject(item) && Number.isInteger(item.id) && typeof item.price === 'number',
  orders: (order) => isObject(order) && typeof order.id === 'string' && Array.isArray(order.items),
};

// STEP 19: load a saved list safely — always returns an array.
function loadList(key) {
  const savedValue = loadFromStorage(key, []);
  if (!Array.isArray(savedValue)) {
    return [];
  }
  return savedValue.filter(itemValidators[key]);
}

// STEP 19: the state object itself.
const state = {
  cart: loadList('cart'),
  wishlist: loadList('wishlist'),
  orders: loadList('orders'),
};

// STEP 19: everyone who wants to know when state changes.
const listeners = [];

// STEP 19: read the current state.
export function getState() {
  return state;
}

// STEP 19: change state, save what needs saving, then tell every listener.
// Example: setState({ cart: newCart })
export function setState(changes) {
  Object.assign(state, changes);

  Object.keys(changes).forEach((key) => {
    if (PERSISTED_KEYS.includes(key)) {
      saveToStorage(key, state[key]);
    }
  });

  listeners.forEach((listener) => listener(state));
}

// STEP 19: sign up to hear about changes. Returns a function that
// signs you out again (pages use it when you navigate away).
export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}

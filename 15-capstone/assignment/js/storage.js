// =============================================================
// storage.js — the ONLY file that talks to localStorage and
// sessionStorage. Every key gets the prefix 'checkout-app:' so
// our data never clashes with other apps on the same address
// (Live Server runs lots of projects on 127.0.0.1:5500!).
// =============================================================

// STEP 18: one prefix for every key, e.g. 'checkout-app:cart'.
const KEY_PREFIX = 'checkout-app:';

// STEP 18: read a value. If it's missing OR broken, give back `fallback`.
// Broken data happens: someone edits it in DevTools, an old version
// of the app saved a different shape, or storage is disabled.
function readValue(storageName, key, fallback) {
  try {
    const rawValue = globalThis[storageName].getItem(KEY_PREFIX + key);
    if (rawValue === null) {
      return fallback; // nothing saved yet
    }
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Could not read "${key}" from ${storageName}, using the default.`, error);
    return fallback;
  }
}

// STEP 18: save a value (objects and arrays become JSON text).
function writeValue(storageName, key, value) {
  try {
    globalThis[storageName].setItem(KEY_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    // Storage can be full or blocked (e.g. some private windows).
    // The app keeps working — it just won't remember after a refresh.
    console.warn(`Could not save "${key}" to ${storageName}.`, error);
  }
}

// STEP 18: delete one of our keys.
function deleteValue(storageName, key) {
  try {
    globalThis[storageName].removeItem(KEY_PREFIX + key);
  } catch (error) {
    console.warn(`Could not remove "${key}" from ${storageName}.`, error);
  }
}

// STEP 18: localStorage — survives closing the browser.
// Used for the cart, wishlist, orders and theme.
export function loadFromStorage(key, fallback) {
  return readValue('localStorage', key, fallback);
}
export function saveToStorage(key, value) {
  writeValue('localStorage', key, value);
}
export function removeFromStorage(key) {
  deleteValue('localStorage', key);
}

// STEP 28: sessionStorage — forgotten when the tab closes.
// Used for the delivery details between the checkout page and payment.
export function loadFromSession(key, fallback) {
  return readValue('sessionStorage', key, fallback);
}
export function saveToSession(key, value) {
  writeValue('sessionStorage', key, value);
}
export function removeFromSession(key) {
  deleteValue('sessionStorage', key);
}

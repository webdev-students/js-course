// =============================================================
// config.js — every "setting" for our Checkout app lives here.
// If you ever want to change the brand name, the currency or the
// delivery rules, this is the ONLY file you need to touch.
// =============================================================

// STEP 05: the brand name of our app, stored ONCE.
// We use it for the logo text, page titles and the footer.
// (The checkout PAGE is a feature — it never uses this constant.)
export const APP_NAME = 'Checkout';

// STEP 05: money settings.
// DummyJSON gives us prices in US dollars, so we show dollars.
// Want euros instead? Change these three lines to:
//   CURRENCY = 'EUR', LOCALE = 'de-DE', EXCHANGE_RATE = 0.92
// Every price in the app goes through formatPrice(), so that's all it takes.
export const CURRENCY = 'USD';
export const LOCALE = 'en-US';
export const EXCHANGE_RATE = 1; // 1 API dollar = 1 display unit

// STEP 06: where our practice products come from (no key needed).
export const API_BASE_URL = 'https://dummyjson.com';

// STEP 07: how many products we show on each page of results.
export const PAGE_SIZE = 12;

// STEP 12: how long to wait (in milliseconds) after the last keystroke
// before we actually search.
export const SEARCH_DELAY_MS = 400;

// STEP 22: how long a toast notification stays on screen.
export const TOAST_DURATION_MS = 3000;

// STEP 25: delivery rules. All amounts are in API dollars.
// Standard delivery becomes free once the cart (after discounts)
// reaches FREE_DELIVERY_THRESHOLD.
export const FREE_DELIVERY_THRESHOLD = 100;
export const DELIVERY_OPTIONS = {
  standard: { id: 'standard', label: 'Standard delivery', fee: 5, days: 5 },
  express: { id: 'express', label: 'Express delivery', fee: 15, days: 2 },
};

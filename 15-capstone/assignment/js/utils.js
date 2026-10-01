// =============================================================
// utils.js — small helper functions used all over the app.
// None of them touch the page or the cart; they just take
// something in and give something back (pure functions).
// =============================================================
import { CURRENCY, LOCALE, EXCHANGE_RATE } from './config.js';

// STEP 05: build the money formatter ONCE and reuse it.
// Intl.NumberFormat knows how to write money for any country:
// '$1,299.99' for en-US/USD, '1.195,99 €' for de-DE/EUR.
const priceFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
});

// STEP 05: convert an API amount (dollars) into our display currency.
export function toDisplayAmount(apiAmount) {
  return apiAmount * EXCHANGE_RATE;
}

// STEP 05: turn an API price (dollars) into display text.
export function formatPrice(apiAmount) {
  return priceFormatter.format(toDisplayAmount(apiAmount));
}

// STEP 07: round money to 2 decimal places.
// We round because 0.1 + 0.2 is 0.30000000000000004 in JavaScript.
export function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

// STEP 07: we only show a discount when it's at least 1%.
// (DummyJSON has some tiny ones like 0.04% — not worth a badge.)
export function hasDiscount(product) {
  return product.discountPercentage >= 1;
}

// STEP 07: the price BEFORE the discount (the crossed-out "was" price).
// We treat the API `price` as today's price — what you actually pay —
// and `discountPercentage` as how much cheaper that is than before.
// $85 with 15% off means it used to be 85 / 0.85 = $100.
export function getOriginalPrice(product) {
  if (!hasDiscount(product)) {
    return product.price;
  }
  return roundMoney(product.price / (1 - product.discountPercentage / 100));
}

// STEP 07: make text safe to put inside innerHTML.
// Even data from an API could contain '<script>' — we never trust it.
export function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// STEP 07: '4.56' → '★ 4.6'
export function formatRating(rating) {
  return `★ ${rating.toFixed(1)}`;
}

// STEP 11: 'home-decoration' → 'Home Decoration'
export function formatCategoryName(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// STEP 12: debounce — wait until the user stops calling fn for `delay` ms,
// then call it once. Like a lift door that waits until people stop walking in.
export function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

// STEP 16: keep a number between a minimum and a maximum.
// clamp(0, 1, 5) → 1, clamp(9, 1, 5) → 5, clamp(3, 1, 5) → 3
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// STEP 32: a short, readable order ID like 'CHK-3F9A1C7B'.
// crypto.randomUUID() needs a secure page (https or localhost),
// so we fall back to the current time if it isn't available.
export function createOrderId() {
  const randomPart = globalThis.crypto && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : Date.now().toString(36).slice(-8);
  return `CHK-${randomPart.toUpperCase()}`;
}

// STEP 31: wait for `ms` milliseconds (used to fake a payment delay).
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// STEP 32: '2026-09-26T10:15:00.000Z' → 'Sep 26, 2026, 10:15 AM'
const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'short',
});
export function formatDate(isoString) {
  return dateFormatter.format(new Date(isoString));
}

// STEP 32: a date `days` from `fromDate`, e.g. the estimated delivery day.
const dayFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});
export function formatFutureDay(days, fromDate = new Date()) {
  const future = new Date(fromDate);
  future.setDate(future.getDate() + days);
  return dayFormatter.format(future);
}

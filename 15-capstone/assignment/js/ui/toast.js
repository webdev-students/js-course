// =============================================================
// ui/toast.js — small pop-up messages like "Added to cart".
// The container has aria-live="polite", so screen readers read
// each new toast out loud without the user doing anything.
// =============================================================
import { TOAST_DURATION_MS } from '../config.js';

// STEP 22: never show more than this many at once.
const MAX_TOASTS = 3;

// STEP 22: show a message. type is 'success', 'info' or 'error'.
export function showToast(message, type = 'success') {
  const region = document.querySelector('[data-toast-region]');

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  region.append(toast);


  // Too many? Remove the oldest one straight away.
  while (region.children.length > MAX_TOASTS) {
    region.firstElementChild.remove();
  }

  // Fade out, then remove from the page.
  setTimeout(() => {
    toast.classList.add('toast-leaving');
    setTimeout(() => toast.remove(), 300);
  }, TOAST_DURATION_MS);
}

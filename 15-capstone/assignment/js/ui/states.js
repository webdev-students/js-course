// =============================================================
// ui/states.js — the "nothing here" and "something went wrong"
// screens. Every list in the app can be empty, and every request
// can fail, so we build these once and reuse them everywhere.
// =============================================================
import { escapeHTML } from '../utils.js';

// STEP 08: an empty state, e.g. "Your cart is empty".
// `actionHTML` is optional trusted HTML we write ourselves (a link or button).
export function createEmptyStateHTML({ title, message, actionHTML = '' }) {
  return `
    <div class="state-message">
      <h2 class="state-message-title">${escapeHTML(title)}</h2>
      <p class="state-message-text">${escapeHTML(message)}</p>
      ${actionHTML}
    </div>
  `;
}

// STEP 08: an error state with a Retry button.
// role="alert" makes screen readers announce it immediately.
export function renderErrorState(container, { title = 'Something went wrong', message, onRetry }) {
  container.innerHTML = `
    <div class="state-message state-message-error" role="alert">
      <h2 class="state-message-title">${escapeHTML(title)}</h2>
      <p class="state-message-text">${escapeHTML(message)}</p>
      <button type="button" class="button button-primary" data-action="retry">Try again</button>
    </div>
  `;
  container.querySelector('[data-action="retry"]').addEventListener('click', onRetry, { once: true });
}

// STEP 08: turn any error into a friendly sentence.
export function getErrorMessage(error) {
  if (error.status === 404) {
    return 'We couldn’t find what you were looking for.';
  }
  if (error.status) {
    return `The product server had a problem (status ${error.status}). Please try again.`;
  }
  return 'We couldn’t reach the product server. Check your internet connection and try again.';
}

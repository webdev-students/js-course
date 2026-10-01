// =============================================================
// ui/orderSummary.js — the read-only list of items + totals
// shown beside the checkout form, on the payment step, and on
// the order confirmation page.
// =============================================================
import { escapeHTML, formatPrice } from '../utils.js';
import { getLineTotal } from '../cart.js';
import { createTotalsHTML } from './orderTotals.js';

// STEP 30: one small row: thumbnail, title, "Qty 2", line total.
function createSummaryItemHTML(item) {
  return `
    <li class="summary-item">
      <img class="summary-item-image" src="${escapeHTML(item.thumbnail)}" alt="" width="48" height="48" loading="lazy">
      <div class="summary-item-text">
        <p class="summary-item-title">${escapeHTML(item.title)}</p>
        <p class="summary-item-quantity">Qty ${item.quantity}</p>
      </div>
      <p class="summary-item-total">${formatPrice(getLineTotal(item))}</p>
    </li>
  `;
}


// STEP 30: the list of items.
export function createSummaryItemsHTML(items) {
  return `<ul class="summary-items">${items.map(createSummaryItemHTML).join('')}</ul>`;
}

// STEP 30: items + totals, for the checkout page and payment step.
export function createOrderSummaryHTML(items, totals, deliveryOptionId) {
  return `
    ${createSummaryItemsHTML(items)}
    <div data-summary-totals>${createTotalsHTML(totals, deliveryOptionId, { showDeliveryHint: false })}</div>
  `;
}

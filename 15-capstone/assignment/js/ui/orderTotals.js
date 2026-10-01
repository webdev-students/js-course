// =============================================================
// ui/orderTotals.js — Subtotal / Discount / Delivery / Total.
// Used in the cart drawer, cart page, checkout page, payment
// step and order confirmation.
// =============================================================
import { DELIVERY_OPTIONS } from '../config.js';
import { formatPrice } from '../utils.js';

// STEP 25: the totals block. `totals` comes from getCartTotals().
export function createTotalsHTML(totals, deliveryOptionId = 'standard', { showDeliveryHint = true } = {}) {
  const deliveryOption = DELIVERY_OPTIONS[deliveryOptionId] ?? DELIVERY_OPTIONS.standard;
  const deliveryText = totals.deliveryFee === 0 ? 'Free' : formatPrice(totals.deliveryFee);

  const discountRow = totals.discount > 0
    ? `<div class="totals-row totals-row-discount">
         <dt>Discount</dt>
         <dd>−${formatPrice(totals.discount)}</dd>
       </div>`
    : '';


  // STEP 25: nudge the shopper towards free standard delivery.
  let hint = '';
  if (showDeliveryHint && deliveryOption.id === 'standard' && totals.itemsTotal > 0) {
    hint = totals.amountToFreeDelivery > 0
      ? `<p class="totals-hint">Add ${formatPrice(totals.amountToFreeDelivery)} more for free standard delivery.</p>`
      : '<p class="totals-hint totals-hint-success">You’ve unlocked free standard delivery!</p>';
  }


  return `
    <dl class="totals">
      <div class="totals-row">
        <dt>Subtotal</dt>
        <dd>${formatPrice(totals.subtotal)}</dd>
      </div>
      ${discountRow}
      <div class="totals-row">
        <dt>${deliveryOption.label}</dt>
        <dd>${deliveryText}</dd>
      </div>
      <div class="totals-row totals-row-total">
        <dt>Total</dt>
        <dd>${formatPrice(totals.total)}</dd>
      </div>
    </dl>
    ${hint}
  `;
}

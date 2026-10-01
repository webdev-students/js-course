// =============================================================
// ui/confirmationPage.js — step 3 of 3, at #/order/:id.
// "Thank you, Amy! Your order CHK-3F9A1C7B is confirmed."
// =============================================================
import { getOrderById } from '../orders.js';
import { escapeHTML, formatDate, formatFutureDay } from '../utils.js';
import { setPageTitle } from './header.js';
import { createEmptyStateHTML } from './states.js';
import { createStepperHTML } from './checkoutPage.js';
import { createSummaryItemsHTML } from './orderSummary.js';
import { createTotalsHTML } from './orderTotals.js';

// STEP 32: draw the confirmation for one order.
export function renderConfirmationPage({ container, routeParams }) {
  const order = getOrderById(routeParams.id);

  // STEP 32: an order ID we don't know (e.g. from someone else's browser).
  if (!order) {
    setPageTitle('Order not found');
    container.innerHTML = `
      <section class="page">
        <h1 class="page-title" tabindex="-1">Order not found</h1>
        ${createEmptyStateHTML({
          title: 'We couldn’t find that order',
          message: 'Orders are saved in the browser they were placed in, so they don’t show up anywhere else.',
          actionHTML: '<a class="button button-primary" href="#/orders">See your orders</a>',
        })}
      </section>
    `;
    return null;
  }


  setPageTitle(`Order ${order.id}`);
  const firstName = order.customer.fullName.split(' ')[0];
  const estimatedDelivery = formatFutureDay(order.delivery.days, new Date(order.createdAt));

  container.innerHTML = `
    <section class="page confirmation">
      ${createStepperHTML(3)}
      <div class="confirmation-hero">
        <p class="confirmation-icon" aria-hidden="true">✓</p>
        <h1 class="page-title" tabindex="-1">Thank you, ${escapeHTML(firstName)}!</h1>
        <p class="confirmation-lead">Your order <strong class="order-id">${escapeHTML(order.id)}</strong> is confirmed.</p>
        <p class="demo-note">This was a demo order: no money was taken and nothing will be shipped.</p>
      </div>


      <div class="confirmation-grid">
        <section class="summary-card" aria-labelledby="confirmation-delivery-title">
          <h2 class="summary-card-title" id="confirmation-delivery-title">Delivery</h2>
          <p class="address">
            ${escapeHTML(order.customer.fullName)}<br>
            ${escapeHTML(order.customer.address)}, ${escapeHTML(order.customer.city)}<br>
            ${escapeHTML(order.customer.email)} · ${escapeHTML(order.customer.phone)}
          </p>
          <p class="address-delivery">${escapeHTML(order.delivery.label)} — estimated <strong>${estimatedDelivery}</strong></p>
        </section>

        <section class="summary-card" aria-labelledby="confirmation-payment-title">
          <h2 class="summary-card-title" id="confirmation-payment-title">Payment</h2>
          <p>${escapeHTML(order.payment.method)} ending in ${escapeHTML(order.payment.last4)}</p>
          <p>Placed on ${formatDate(order.createdAt)}</p>
          <p>Status: <span class="badge badge-success">${escapeHTML(order.status)}</span></p>
        </section>


        <section class="summary-card confirmation-items" aria-labelledby="confirmation-items-title">
          <h2 class="summary-card-title" id="confirmation-items-title">Items</h2>
          ${createSummaryItemsHTML(order.items)}
          ${createTotalsHTML(order.totals, order.delivery.id, { showDeliveryHint: false })}
        </section>
      </div>

      <div class="confirmation-actions">
        <a class="button button-primary" href="#/">Continue shopping</a>
        <a class="button button-ghost" href="#/orders">View all orders</a>
      </div>
    </section>
  `;
  return null;
}

// =============================================================
// ui/ordersPage.js — order history at #/orders.
// Orders live in localStorage, newest first.
// =============================================================
import { getState, subscribe } from '../state.js';
import { getItemCount } from '../cart.js';
import { clearOrders } from '../orders.js';
import { escapeHTML, formatDate, formatPrice } from '../utils.js';
import { setPageTitle } from './header.js';
import { createEmptyStateHTML } from './states.js';
import { confirmDialog } from './modal.js';
import { showToast } from './toast.js';


// STEP 33: one order in the list.
function createOrderCardHTML(order) {
  const itemCount = getItemCount(order.items);
  const thumbnails = order.items
    .slice(0, 4)
    .map((item) => `<img src="${escapeHTML(item.thumbnail)}" alt="" width="48" height="48" loading="lazy">`)
    .join('');
  const moreCount = order.items.length - 4;


  return `
    <li>
      <article class="order-card">
        <header class="order-card-header">
          <h2 class="order-card-id">${escapeHTML(order.id)}</h2>
          <span class="badge badge-success">${escapeHTML(order.status)}</span>
        </header>
        <p class="order-card-meta">
          ${formatDate(order.createdAt)} · ${itemCount} ${itemCount === 1 ? 'item' : 'items'} ·
          <strong>${formatPrice(order.totals.total)}</strong>
        </p>
        <div class="order-card-thumbs" aria-hidden="true">
          ${thumbnails}
          ${moreCount > 0 ? `<span class="order-card-more">+${moreCount}</span>` : ''}
        </div>
        <a class="button button-ghost button-small" href="#/order/${encodeURIComponent(order.id)}"
          aria-label="View order ${escapeHTML(order.id)}">View order</a>
      </article>
    </li>
  `;
}


// STEP 33: draw the order history.
export function renderOrdersPage({ container }) {
  setPageTitle('Your orders');
  container.innerHTML = `
    <section class="page">
      <div class="page-header">
        <h1 class="page-title" tabindex="-1">Your orders</h1>
        <button type="button" class="button button-danger button-small" data-action="clear-orders" hidden>Clear order history</button>
      </div>
      <p class="page-intro">Orders are saved in this browser only. This is a demo store, so nothing was really bought.</p>
      <div data-orders-list></div>
    </section>
  `;
  const heading = container.querySelector('h1');
  const list = container.querySelector('[data-orders-list]');
  const clearButton = container.querySelector('[data-action="clear-orders"]');


  function render(state) {
    // STEP 33: the "no orders yet" state.
    if (state.orders.length === 0) {
      clearButton.hidden = true;
      list.innerHTML = createEmptyStateHTML({
        title: 'No orders yet',
        message: 'When you place an order, it’ll show up here.',
        actionHTML: '<a class="button button-primary" href="#/">Start shopping</a>',
      });
      return;
    }
    clearButton.hidden = false;
    list.innerHTML = `<ol class="orders-list">${state.orders.map(createOrderCardHTML).join('')}</ol>`;
  }


  // STEP 33: clearing history asks first.
  clearButton.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Clear your order history?',
      message: 'Every saved order will be deleted from this browser.',
      confirmLabel: 'Yes, clear history',
    });
    if (confirmed) {
      clearOrders();
      showToast('Order history cleared', 'info');
      heading.focus();
    }
  });


  let lastRenderedOrders = getState().orders;
  render(getState());
  const unsubscribe = subscribe((state) => {
    if (state.orders !== lastRenderedOrders) {
      lastRenderedOrders = state.orders;
      render(state);
    }
  });

  // STEP 33: stop listening when we leave the page.
  return { cleanup: unsubscribe };
}

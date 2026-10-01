// =============================================================
// ui/cartDrawer.js — the cart that slides in from the right.
// Opens from the header cart button. Tab stays inside it,
// Escape closes it, and focus goes back to the cart button.
// =============================================================
import { getState, subscribe } from '../state.js';
import { getCartTotals } from '../cart.js';
import { onRouteChange } from '../router.js';
import { createFocusTrap } from './focusTrap.js';
import { createEmptyStateHTML } from './states.js';
import { createCartItemHTML, attachCartItemActions, renderWithFocus, confirmAndEmptyCart } from './cartItem.js';
import { createTotalsHTML } from './orderTotals.js';

// STEP 23: set up the drawer once, when the app starts.
export function initCartDrawer() {
  const drawer = document.querySelector('#cart-drawer');
  const backdrop = document.querySelector('[data-drawer-backdrop]');
  const body = drawer.querySelector('[data-drawer-body]');
  const footer = drawer.querySelector('[data-drawer-footer]');
  const title = drawer.querySelector('#cart-drawer-title');
  const openButton = document.querySelector('[data-action="open-cart"]');

  let isOpen = false;
  let lastRenderedCart = null;

  // STEP 24: Escape closes the drawer.
  const trap = createFocusTrap(drawer, { onEscape: () => closeDrawer() });


  // STEP 23: draw the drawer's contents from state.
  function render(state) {
    // The cart array is replaced (never changed in place) on every update,
    // so if it's the SAME array as last time, nothing in the cart changed.
    if (state.cart === lastRenderedCart) {
      return;
    }
    lastRenderedCart = state.cart;


    if (state.cart.length === 0) {
      body.innerHTML = createEmptyStateHTML({
        title: 'Your cart is empty',
        message: 'Find something you love and it’ll show up here.',
        actionHTML: '<a class="button button-primary" href="#/" data-action="close-drawer">Start shopping</a>',
      });
      footer.hidden = true;
      footer.innerHTML = '';
      if (isOpen && !drawer.contains(document.activeElement)) {
        title.focus();
      }
      return;
    }

    renderWithFocus(body, `<ul class="cart-list">${state.cart.map(createCartItemHTML).join('')}</ul>`, title);

    // STEP 25: totals and the next steps.
    footer.hidden = false;
    footer.innerHTML = `
      ${createTotalsHTML(getCartTotals(state.cart))}
      <div class="drawer-actions">
        <a class="button button-primary button-block" href="#/checkout">Go to checkout</a>
        <a class="button button-ghost button-block" href="#/cart">View full cart</a>
        <button type="button" class="link-button" data-action="empty-cart">Empty cart</button>
      </div>
    `;
  }


  // STEP 23: open.
  function openDrawer() {
    if (isOpen) {
      return;
    }
    isOpen = true;
    drawer.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('has-overlay');
    openButton.setAttribute('aria-expanded', 'true');
    trap.activate();
  }


  // STEP 23: close. When we're closing because the page changed,
  // we DON'T send focus back to the cart button (the router moves it to the new page).
  function closeDrawer({ restoreFocus = true } = {}) {
    if (!isOpen) {
      return;
    }
    isOpen = false;
    drawer.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('has-overlay');
    openButton.setAttribute('aria-expanded', 'false');
    trap.deactivate({ restoreFocus });
  }


  // STEP 23: wire up the buttons.
  openButton.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', () => closeDrawer());
  drawer.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="close-drawer"]')) {
      closeDrawer();
    }
    if (event.target.closest('[data-action="empty-cart"]')) {
      confirmAndEmptyCart();
    }
  });
  attachCartItemActions(body);

  // STEP 23: going to another page (e.g. "Go to checkout") closes the drawer.
  onRouteChange(() => closeDrawer({ restoreFocus: false }));

  render(getState());
  subscribe(render);
}

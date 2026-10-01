// =============================================================
// ui/cartPage.js — the full-page cart at #/cart.
// Same rows and totals as the drawer, with more room.
// =============================================================
import { getState, subscribe } from '../state.js';
import { getCartTotals, getItemCount } from '../cart.js';
import { setPageTitle } from './header.js';
import { createEmptyStateHTML } from './states.js';
import { createCartItemHTML, attachCartItemActions, renderWithFocus, confirmAndEmptyCart } from './cartItem.js';
import { createTotalsHTML } from './orderTotals.js';

// STEP 26: draw the cart page, and redraw it whenever the cart changes.
export function renderCartPage({ container }) {
  setPageTitle('Your cart');
  container.innerHTML = `
    <section class="page">
      <h1 class="page-title" tabindex="-1">Your cart</h1>
      <div data-cart-page></div>
    </section>
  `;
  const heading = container.querySelector('h1');
  const content = container.querySelector('[data-cart-page]');
  let itemsList = null;
  let lastRenderedCart = null;


  function render(state) {
    if (state.cart === lastRenderedCart) {
      return;
    }
    lastRenderedCart = state.cart;

    // STEP 26: the empty cart state.
    if (state.cart.length === 0) {
      itemsList = null;
      content.innerHTML = createEmptyStateHTML({
        title: 'Your cart is empty',
        message: 'Looks like you haven’t added anything yet.',
        actionHTML: '<a class="button button-primary" href="#/">Start shopping</a>',
      });
      return;
    }


    // STEP 26: build the layout once, then only redraw the parts that change.
    if (!itemsList) {
      content.innerHTML = `
        <div class="cart-layout">
          <div class="cart-layout-items">
            <p class="cart-layout-count" data-cart-count-text></p>
            <ul class="cart-list cart-list-page" data-cart-items></ul>
            <div class="cart-layout-actions">
              <a class="button button-ghost" href="#/">← Continue shopping</a>
              <button type="button" class="button button-danger" data-action="empty-cart">Empty cart</button>
            </div>
          </div>
          <aside class="summary-card" aria-labelledby="cart-summary-title">
            <h2 class="summary-card-title" id="cart-summary-title">Order summary</h2>
            <div data-cart-totals></div>
            <a class="button button-primary button-block button-large" href="#/checkout">Go to checkout</a>
            <p class="summary-card-note">This is a demo store — you won’t be charged.</p>
          </aside>
        </div>
      `;
      itemsList = content.querySelector('[data-cart-items]');
      attachCartItemActions(itemsList);
      content.querySelector('[data-action="empty-cart"]').addEventListener('click', confirmAndEmptyCart);
    }


    const itemCount = getItemCount(state.cart);
    content.querySelector('[data-cart-count-text]').textContent =
      `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`;
    renderWithFocus(itemsList, state.cart.map(createCartItemHTML).join(''), heading);
    content.querySelector('[data-cart-totals]').innerHTML = createTotalsHTML(getCartTotals(state.cart));
  }


  render(getState());
  const unsubscribe = subscribe(render);

  // STEP 26: stop listening when we leave the page.
  return { cleanup: unsubscribe };
}

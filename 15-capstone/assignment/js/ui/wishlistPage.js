// =============================================================
// ui/wishlistPage.js — saved products at #/wishlist.
// =============================================================
import { getState, subscribe } from '../state.js';
import { setPageTitle } from './header.js';
import { createEmptyStateHTML } from './states.js';
import { createProductCardHTML, attachProductActions } from './productCard.js';
import { renderWithFocus } from './cartItem.js';

// STEP 27: draw the wishlist, and redraw when it changes.
export function renderWishlistPage({ container }) {
  setPageTitle('Your wishlist');
  container.innerHTML = `
    <section class="page">
      <h1 class="page-title" tabindex="-1">Your wishlist</h1>
      <p class="page-intro" data-wishlist-summary></p>
      <div class="product-grid" data-wishlist-grid></div>
    </section>
  `;
  const heading = container.querySelector('h1');
  const summary = container.querySelector('[data-wishlist-summary]');
  const grid = container.querySelector('[data-wishlist-grid]');
  let lastRenderedWishlist = null;


  function render(state) {
    // Same array as last time → the wishlist didn't change (maybe the cart did).
    if (state.wishlist === lastRenderedWishlist) {
      return;
    }
    const hadItems = lastRenderedWishlist !== null && lastRenderedWishlist.length > 0;
    lastRenderedWishlist = state.wishlist;

    // STEP 27: the empty wishlist state.
    if (state.wishlist.length === 0) {
      summary.textContent = '';
      grid.innerHTML = createEmptyStateHTML({
        title: 'Your wishlist is empty',
        message: 'Tap the heart on any product to save it for later.',
        actionHTML: '<a class="button button-primary" href="#/">Browse products</a>',
      });
      // You just removed the last item → put focus somewhere sensible.
      if (hadItems) {
        heading.focus();
      }
      return;
    }

    const count = state.wishlist.length;
    summary.textContent = `${count} saved ${count === 1 ? 'product' : 'products'}`;
    renderWithFocus(grid, state.wishlist.map(createProductCardHTML).join(''), heading);
  }


  // STEP 27: the heart and Add to cart buttons on these cards.
  attachProductActions(grid, (productId) => getState().wishlist.find((item) => item.id === productId));

  render(getState());
  const unsubscribe = subscribe(render);

  // STEP 27: stop listening when we leave the page.
  return { cleanup: unsubscribe };
}

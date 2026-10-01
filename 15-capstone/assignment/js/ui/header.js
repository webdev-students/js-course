// =============================================================
// ui/header.js — the brand, the page title, the nav links and
// the little count badges in the header.
// =============================================================
import { APP_NAME } from '../config.js';
import { getState, subscribe } from '../state.js';
import { getItemCount } from '../cart.js';
import { onRouteChange } from '../router.js';

// STEP 05: set the browser tab title, e.g. 'Your cart | Checkout'.
export function setPageTitle(pageTitle) {
  document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
}

// STEP 21: update the header badges from state.
function updateBadges(state) {
  const cartCount = getItemCount(state.cart);
  const wishlistCount = state.wishlist.length;

  const cartBadge = document.querySelector('[data-cart-count]');
  cartBadge.textContent = cartCount;
  cartBadge.hidden = cartCount === 0;
  document
    .querySelector('[data-action="open-cart"]')
    .setAttribute('aria-label', `Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`);

  const wishlistBadge = document.querySelector('[data-wishlist-count]');
  wishlistBadge.textContent = wishlistCount;
  wishlistBadge.hidden = wishlistCount === 0;
}

// STEP 09: mark the nav link for the current page with aria-current.
function highlightActiveLink(path) {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const linkPath = link.getAttribute('href').slice(1); // '#/orders' → '/orders'
    const isActive = linkPath === '/' ? path === '/' || path.startsWith('/product') : path.startsWith(linkPath);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// STEP 05: put APP_NAME everywhere the brand appears.
export function initHeader() {
  document.querySelectorAll('[data-app-name]').forEach((element) => {
    element.textContent = APP_NAME;
  });
  // The logo is the BRAND, not the checkout page — say so for screen readers.
  document.querySelector('.logo').setAttribute('aria-label', `${APP_NAME} store home`);
  document.querySelector('[data-current-year]').textContent = new Date().getFullYear();
  updateBadges(getState());
  subscribe(updateBadges);
  onRouteChange(highlightActiveLink);
}

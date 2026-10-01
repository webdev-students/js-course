// =============================================================
// main.js — where our Checkout app starts.
// index.html loads ONLY this file (type="module"); every other
// file is pulled in through these imports.
// =============================================================
import { addRoute, setNotFound, startRouter } from './router.js';
import { initHeader, setPageTitle } from './ui/header.js';
import { initTheme } from './ui/theme.js';
import { initCartDrawer } from './ui/cartDrawer.js';
import { createEmptyStateHTML } from './ui/states.js';
import { renderHomePage } from './ui/productList.js';
import { renderProductPage } from './ui/productDetail.js';
import { renderCartPage } from './ui/cartPage.js';
import { renderWishlistPage } from './ui/wishlistPage.js';
import { renderCheckoutPage } from './ui/checkoutPage.js';
import { renderPaymentStep } from './ui/paymentStep.js';
import { renderConfirmationPage } from './ui/confirmationPage.js';
import { renderOrdersPage } from './ui/ordersPage.js';

// STEP 34: theme first, so the colours are right straight away.
initTheme();

// STEP 05: brand name, year.
initHeader();

// STEP 23: the slide-in cart.
initCartDrawer();

// STEP 09: every page in the app.
addRoute('/', renderHomePage);
addRoute('/product/:id', renderProductPage);
addRoute('/cart', renderCartPage);
addRoute('/wishlist', renderWishlistPage);
addRoute('/checkout', renderCheckoutPage);
addRoute('/payment', renderPaymentStep);
addRoute('/order/:id', renderConfirmationPage);
addRoute('/orders', renderOrdersPage);

// STEP 09: any other address → "page not found".
setNotFound(({ container }) => {
  setPageTitle('Page not found');
  container.innerHTML = `
    <section class="page">
      <h1 class="page-title" tabindex="-1">Page not found</h1>
      ${createEmptyStateHTML({
        title: 'This page doesn’t exist',
        message: 'The link might be broken, or the page may have moved.',
        actionHTML: '<a class="button button-primary" href="#/">Back to the shop</a>',
      })}
    </section>
  `;
});

// STEP 09: the "Skip to main content" link. Its href is #main, which
// our router would treat as a page! So we handle it ourselves.
document.querySelector('[data-skip-link]').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('#main').focus();
});

// STEP 09: go!
startRouter(document.querySelector('#main'));

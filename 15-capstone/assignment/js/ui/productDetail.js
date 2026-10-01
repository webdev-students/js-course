// =============================================================
// ui/productDetail.js — one product: gallery, description,
// stock, quantity picker, Add to cart, wishlist, and related
// products from the same category.
// Route: #/product/:id
// =============================================================
import { getProductById, getRelatedProducts } from '../api.js';
import { getQuantityInCart } from '../cart.js';
import { isInWishlist, toggleWishlist } from '../wishlist.js';
import { subscribe } from '../state.js';
import { escapeHTML, formatCategoryName, formatRating, hasDiscount, clamp } from '../utils.js';
import { setPageTitle } from './header.js';
import { createDetailSkeletonHTML, createSkeletonCardsHTML } from './skeletons.js';
import { createEmptyStateHTML, renderErrorState, getErrorMessage } from './states.js';
import {
  createPriceHTML,
  createProductCardHTML,
  attachProductActions,
  addToCartWithToast,
  getStockStatus,
} from './productCard.js';
import { showToast } from './toast.js';

// STEP 16: the big image plus a row of thumbnail buttons.
function createGalleryHTML(product) {
  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const title = escapeHTML(product.title);

  const thumbnailsHTML = images.length > 1
    ? `<div class="gallery-thumbs">
        ${images
          .map(
            (imageUrl, index) => `
              <button type="button" class="gallery-thumb" data-action="show-image" data-index="${index}"
                aria-label="Show image ${index + 1} of ${images.length}" aria-pressed="${index === 0}">
                <img src="${escapeHTML(imageUrl)}" alt="" width="72" height="72" loading="lazy">
              </button>`,
          )
          .join('')}
      </div>`
    : '';

  return `
    <div class="gallery" data-gallery>
      <div class="gallery-main">
        <img data-gallery-main src="${escapeHTML(images[0])}" alt="${title}, image 1 of ${images.length}" width="600" height="600">
      </div>
      ${thumbnailsHTML}
    </div>
  `;
}

// STEP 15: the whole detail page (once the product has loaded).
function createProductDetailHTML(product) {
  const title = escapeHTML(product.title);
  const stockStatus = getStockStatus(product.stock);
  const categoryName = escapeHTML(formatCategoryName(product.category));
  const discountBadge = hasDiscount(product)
    ? `<span class="badge badge-discount">Save ${Math.round(product.discountPercentage)}%</span>`
    : '';
  const reviewCount = product.reviews ? product.reviews.length : 0;

  // STEP 15: little facts from the API (only the ones that exist).
  const facts = [product.shippingInformation, product.warrantyInformation, product.returnPolicy]
    .filter(Boolean)
    .map((text) => `<li>${escapeHTML(text)}</li>`)
    .join('');

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="#/">Shop</a></li>
        <li><a href="#/?category=${encodeURIComponent(product.category)}">${categoryName}</a></li>
        <li aria-current="page">${title}</li>
      </ol>
    </nav>

    <div class="product-detail">
      ${createGalleryHTML(product)}

      <div class="product-detail-info">
        <p class="product-detail-brand">${escapeHTML(product.brand ?? categoryName)}</p>
        <h1 class="product-detail-title" tabindex="-1">${title}</h1>
        <p class="rating" aria-label="Rated ${product.rating.toFixed(1)} out of 5 from ${reviewCount} reviews">
          ${formatRating(product.rating)} <span class="rating-count">(${reviewCount} reviews)</span>
        </p>
        <div class="product-detail-price">${createPriceHTML(product)} ${discountBadge}</div>
        <p class="stock-status stock-status-${stockStatus.modifier}">${stockStatus.label}</p>
        <p class="product-detail-description">${escapeHTML(product.description)}</p>

        <div class="purchase" data-purchase>
          <div class="quantity" role="group" aria-labelledby="quantity-label">
            <span class="field-label" id="quantity-label">Quantity</span>
            <div class="quantity-controls">
              <button type="button" class="quantity-button" data-action="decrease" aria-label="Decrease quantity">−</button>
              <input type="number" class="quantity-input" data-quantity-input aria-labelledby="quantity-label"
                min="1" value="1" inputmode="numeric">
              <button type="button" class="quantity-button" data-action="increase" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <p class="purchase-note" data-purchase-note aria-live="polite"></p>
          <div class="purchase-buttons">
            <button type="button" class="button button-primary button-large" data-action="add-to-cart-detail">Add to cart</button>
            <button type="button" class="button button-ghost button-large" data-action="toggle-wishlist-detail" aria-pressed="false">
              <span data-heart aria-hidden="true">♡</span> <span data-wishlist-text>Save to wishlist</span>
            </button>
          </div>
        </div>

        ${facts ? `<ul class="product-detail-facts">${facts}</ul>` : ''}
      </div>
    </div>

    <section class="related" data-related aria-labelledby="related-title">
      <h2 id="related-title" class="section-title">You might also like</h2>
      <div class="product-grid product-grid-compact" data-related-grid aria-busy="true">
        ${createSkeletonCardsHTML(4)}
      </div>
    </section>
  `;
}

// STEP 15: draw the product page.
export function renderProductPage({ container, routeParams, isCurrent }) {
  const productId = Number(routeParams.id);
  let product = null;
  let unsubscribe = null;

  // STEP 15: '/product/abc' is not a real product — don't even ask the API.
  function renderNotFound() {
    setPageTitle('Product not found');
    container.innerHTML = `
      <section class="page">
        <h1 class="visually-hidden" tabindex="-1">Product not found</h1>
        ${createEmptyStateHTML({
          title: 'We couldn’t find that product',
          message: 'It may have been removed, or the link might be wrong.',
          actionHTML: '<a class="button button-primary" href="#/">Back to the shop</a>',
        })}
      </section>
    `;
  }

  // STEP 16: swap the big image when a thumbnail is clicked.
  function attachGalleryEvents() {
    const gallery = container.querySelector('[data-gallery]');
    const mainImage = gallery.querySelector('[data-gallery-main]');
    const imageCount = product.images.length;
    gallery.addEventListener('click', (event) => {
      const thumbnail = event.target.closest('[data-action="show-image"]');
      if (!thumbnail) {
        return;
      }
      const index = Number(thumbnail.dataset.index);
      mainImage.src = product.images[index];
      mainImage.alt = `${product.title}, image ${index + 1} of ${imageCount}`;
      gallery.querySelectorAll('[data-action="show-image"]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button === thumbnail));
      });
    });
  }

  // STEP 16: the quantity picker can't go above what's left.
  // STEP 21: "left" means stock minus what's already in your cart.
  function updatePurchaseControls() {
    const purchase = container.querySelector('[data-purchase]');
    const input = purchase.querySelector('[data-quantity-input]');
    const decreaseButton = purchase.querySelector('[data-action="decrease"]');
    const increaseButton = purchase.querySelector('[data-action="increase"]');
    const addButton = purchase.querySelector('[data-action="add-to-cart-detail"]');
    const note = purchase.querySelector('[data-purchase-note]');

    const inCart = getQuantityInCart(product.id);
    const available = product.stock - inCart;

    if (available <= 0) {
      input.value = 0;
      input.disabled = true;
      decreaseButton.disabled = true;
      increaseButton.disabled = true;
      addButton.disabled = true;
      addButton.textContent = product.stock === 0 ? 'Sold out' : 'All in your cart';
      note.textContent = product.stock === 0
        ? 'This product is out of stock right now.'
        : `You've got all ${product.stock} in your cart.`;
      return;
    }

    const quantity = clamp(Number(input.value) || 1, 1, available);
    input.value = quantity;
    input.max = available;
    input.disabled = false;
    addButton.disabled = false;
    addButton.textContent = 'Add to cart';
    decreaseButton.disabled = quantity <= 1;
    increaseButton.disabled = quantity >= available;
    note.textContent = inCart > 0
      ? `You have ${inCart} in your cart. ${available} more available.`
      : `${available} available.`;
  }

  // STEP 27: the big "Save to wishlist" button.
  function updateWishlistDetailButton() {
    const button = container.querySelector('[data-action="toggle-wishlist-detail"]');
    const isSaved = isInWishlist(product.id);
    button.setAttribute('aria-pressed', String(isSaved));
    button.querySelector('[data-heart]').textContent = isSaved ? '♥' : '♡';
    button.querySelector('[data-wishlist-text]').textContent = isSaved ? 'Saved to wishlist' : 'Save to wishlist';
  }

  // STEP 16: all the buttons in the purchase box.
  function attachPurchaseEvents() {
    const purchase = container.querySelector('[data-purchase]');
    const input = purchase.querySelector('[data-quantity-input]');

    purchase.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) {
        return;
      }
      const action = button.dataset.action;
      if (action === 'decrease') {
        input.value = Number(input.value) - 1;
        updatePurchaseControls();
      }
      if (action === 'increase') {
        input.value = Number(input.value) + 1;
        updatePurchaseControls();
      }
      if (action === 'add-to-cart-detail') {
        addToCartWithToast(product, Number(input.value));
        input.value = 1;
        // updatePurchaseControls() runs through subscribe() below.
      }
      if (action === 'toggle-wishlist-detail') {
        const isSaved = toggleWishlist(product);
        showToast(isSaved ? 'Saved to wishlist' : 'Removed from wishlist', 'info');
      }
    });

    // Typing a number straight into the box.
    input.addEventListener('change', updatePurchaseControls);
  }

  // STEP 17: "You might also like" — same category, not this product.
  async function loadRelatedProducts() {
    const section = container.querySelector('[data-related]');
    const grid = section.querySelector('[data-related-grid]');
    try {
      const related = await getRelatedProducts(product);
      if (!isCurrent()) {
        return;
      }
      if (related.length === 0) {
        section.hidden = true;
        return;
      }
      grid.removeAttribute('aria-busy');
      grid.innerHTML = related.map(createProductCardHTML).join('');
      attachProductActions(grid, (id) => related.find((item) => item.id === id));
    } catch (error) {
      // Related products are a bonus — if they fail, just hide the section.
      console.warn('Could not load related products.', error);
      section.hidden = true;
    }
  }

  // STEP 15: load the product (with skeleton, error and not-found states).
  async function loadProduct() {
    setPageTitle('Loading product…');
    container.innerHTML = `
      <section class="page">
        <h1 class="visually-hidden" tabindex="-1">Loading product…</h1>
        ${createDetailSkeletonHTML()}
      </section>
    `;

    try {
      product = await getProductById(productId);
    } catch (error) {
      if (!isCurrent()) {
        return;
      }
      if (error.status === 404) {
        renderNotFound();
        return;
      }
      console.error(error);
      renderErrorState(container, {
        title: 'We couldn’t load this product',
        message: getErrorMessage(error),
        onRetry: loadProduct,
      });
      return;
    }


    // You clicked away while it was loading? Then don't draw it.
    if (!isCurrent()) {
      return;
    }

    setPageTitle(product.title);
    container.innerHTML = `<section class="page">${createProductDetailHTML(product)}</section>`;
    attachGalleryEvents();
    attachPurchaseEvents();
    updatePurchaseControls();
    updateWishlistDetailButton();
    loadRelatedProducts();

    // STEP 21: if the cart or wishlist changes (e.g. from the drawer),
    // keep the purchase box and heart button in sync.
    unsubscribe = subscribe(() => {
      updatePurchaseControls();
      updateWishlistDetailButton();
    });
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    renderNotFound();
    return null;
  }

  loadProduct();

  // STEP 21: stop listening to state when we leave this page.
  return {
    cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    },
  };
}

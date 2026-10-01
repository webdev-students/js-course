// =============================================================
// ui/productCard.js — one product card, plus the click handling
// for the buttons on it (Add to cart, heart).
// Used on the shop page, the wishlist page and "related products".
// =============================================================
import { escapeHTML, formatPrice, formatRating, getOriginalPrice, hasDiscount } from '../utils.js';
import { addToCart } from '../cart.js';
import { isInWishlist, toggleWishlist } from '../wishlist.js';
import { showToast } from './toast.js';

// STEP 07: the price block — today's price, and the crossed-out old price.
export function createPriceHTML(product) {
  const originalPrice = hasDiscount(product)
    ? `<s class="price-original"><span class="visually-hidden">Was </span>${formatPrice(getOriginalPrice(product))}</s>`
    : '';
  return `
    <p class="price">
      <span class="price-current"><span class="visually-hidden">Price: </span>${formatPrice(product.price)}</span>
      ${originalPrice}
    </p>
  `;
}

// STEP 15: "In stock", "Only 3 left" or "Out of stock".
export function getStockStatus(stock) {
  if (stock === 0) {
    return { label: 'Out of stock', modifier: 'out' };
  }
  if (stock <= 5) {
    return { label: `Only ${stock} left`, modifier: 'low' };
  }
  return { label: 'In stock', modifier: 'in' };
}

// STEP 27: the heart button's text depends on whether it's saved.
function getWishlistButtonLabel(product, isSaved) {
  return isSaved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`;
}

// STEP 27: update a heart button after it's clicked.
export function updateWishlistButton(button, product, isSaved) {
  button.setAttribute('aria-pressed', String(isSaved));
  button.setAttribute('aria-label', getWishlistButtonLabel(product, isSaved));
  button.querySelector('[data-heart]').textContent = isSaved ? '♥' : '♡';
}

// STEP 07: the HTML for one card. Every value from the API goes
// through escapeHTML() before it touches innerHTML.
export function createProductCardHTML(product) {
  const title = escapeHTML(product.title);
  const isOutOfStock = product.stock === 0;
  const stockStatus = getStockStatus(product.stock);
  const isSaved = isInWishlist(product.id);

  // STEP 07: the "-15%" badge (only for real discounts).
  const discountBadge = hasDiscount(product)
    ? `<span class="badge badge-discount">-${Math.round(product.discountPercentage)}%</span>`
    : '';

  // STEP 15: only warn about stock when it's low or gone.
  const stockBadge = stockStatus.modifier === 'in'
    ? ''
    : `<span class="badge badge-stock badge-stock-${stockStatus.modifier}">${stockStatus.label}</span>`;

  return `
    <article class="product-card">
      <a class="product-card-link" href="#/product/${product.id}">
        <div class="product-card-media">
          <img src="${escapeHTML(product.thumbnail)}" alt="${title}" width="300" height="300" loading="lazy">
          ${discountBadge}
          ${stockBadge}
        </div>
        <h3 class="product-card-title">${title}</h3>
      </a>
      <p class="product-card-meta">
        <span>${escapeHTML(product.brand ?? 'No brand')}</span>
        <span class="rating" aria-label="Rated ${product.rating.toFixed(1)} out of 5">${formatRating(product.rating)}</span>
      </p>
      ${createPriceHTML(product)}
      <div class="product-card-actions">
        <button type="button" class="button button-primary button-small"
          data-action="add-to-cart" data-product-id="${product.id}" data-focus-key="add-${product.id}"
          ${isOutOfStock ? 'disabled' : ''}>
          ${isOutOfStock ? 'Sold out' : 'Add to cart'}
        </button>
        <button type="button" class="icon-button icon-button-heart"
          data-action="toggle-wishlist" data-product-id="${product.id}" data-focus-key="wish-${product.id}"
          aria-pressed="${isSaved}" aria-label="${escapeHTML(getWishlistButtonLabel(product, isSaved))}">
          <span data-heart aria-hidden="true">${isSaved ? '♥' : '♡'}</span>
        </button>
      </div>
    </article>
  `;
}

// STEP 22: add to cart AND tell the user what happened.
export function addToCartWithToast(product, quantity = 1) {
  const addedQuantity = addToCart(product, quantity);
  if (addedQuantity === 0) {
    showToast(`You already have all ${product.stock} of these in your cart.`, 'error');
  } else if (addedQuantity < quantity) {
    showToast(`Only ${addedQuantity} more added — that's all the stock we have.`, 'info');
  } else if (addedQuantity > 1) {
    showToast(`Added to cart: ${addedQuantity} × ${product.title}`);
  } else {
    showToast(`Added to cart: ${product.title}`);
  }
  return addedQuantity;
}

// STEP 21: ONE click listener for a whole grid of cards
// (event delegation). `findProduct(id)` gives back the product object.
export function attachProductActions(container, findProduct) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-product-id]');
    if (!button || !container.contains(button)) {
      return;
    }
    const product = findProduct(Number(button.dataset.productId));
    if (!product) {
      return;
    }

    if (button.dataset.action === 'add-to-cart') {
      addToCartWithToast(product);
    }

    if (button.dataset.action === 'toggle-wishlist') {
      const isSaved = toggleWishlist(product);
      if (button.isConnected) {
        updateWishlistButton(button, product, isSaved);
      }
      showToast(isSaved ? 'Saved to wishlist' : 'Removed from wishlist', 'info');
    }
  });
}

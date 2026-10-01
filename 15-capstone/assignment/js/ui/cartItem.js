// =============================================================
// ui/cartItem.js — one row in the cart (image, title, quantity
// buttons, line total, Remove). Shared by the cart drawer AND
// the full cart page, so we only write it once.
// =============================================================
import { escapeHTML, formatPrice } from '../utils.js';
import { findCartItem, updateQuantity, removeFromCart, getLineTotal, clearCart } from '../cart.js';
import { showToast } from './toast.js';
import { confirmDialog } from './modal.js';

// STEP 23: the HTML for one cart row.
// data-focus-key lets us put focus back on the same button after redrawing.
export function createCartItemHTML(item) {
  const title = escapeHTML(item.title);
  const isAtMinimum = item.quantity <= 1;
  const isAtMaximum = item.quantity >= item.stock;

  return `
    <li class="cart-item">
      <img class="cart-item-image" src="${escapeHTML(item.thumbnail)}" alt="" width="72" height="72" loading="lazy">
      <div class="cart-item-details">
        <a class="cart-item-title" href="#/product/${item.id}">${title}</a>
        <p class="cart-item-price">${formatPrice(item.price)} each</p>
        <div class="quantity quantity-small" role="group" aria-label="Quantity of ${title}">
          <button type="button" class="quantity-button" data-action="decrease-item" data-product-id="${item.id}"
            data-focus-key="decrease-${item.id}" aria-label="Decrease quantity of ${title}" ${isAtMinimum ? 'disabled' : ''}>−</button>
          <input type="number" class="quantity-input" data-action="set-item-quantity" data-product-id="${item.id}"
            data-focus-key="quantity-${item.id}" aria-label="Quantity of ${title}"
            min="1" max="${item.stock}" value="${item.quantity}" inputmode="numeric">
          <button type="button" class="quantity-button" data-action="increase-item" data-product-id="${item.id}"
            data-focus-key="increase-${item.id}" aria-label="Increase quantity of ${title}" ${isAtMaximum ? 'disabled' : ''}>+</button>
        </div>
        ${isAtMaximum ? `<p class="cart-item-note">Max ${item.stock} in stock</p>` : ''}
      </div>
      <div class="cart-item-side">
        <p class="cart-item-total">${formatPrice(getLineTotal(item))}</p>
        <button type="button" class="link-button" data-action="remove-item" data-product-id="${item.id}"
          data-focus-key="remove-${item.id}" aria-label="Remove ${title} from cart">Remove</button>
      </div>
    </li>
  `;
}

// STEP 23: replace a list's HTML but keep keyboard focus where it was.
// Without this, pressing "+" redraws the list and focus jumps to <body>,
// so a keyboard user would have to Tab all the way back.
export function renderWithFocus(container, html, fallbackElement) {
  const activeKey = container.contains(document.activeElement)
    ? document.activeElement.dataset.focusKey
    : undefined;

  container.innerHTML = html;

  if (!activeKey) {
    return;
  }
  const sameElement = container.querySelector(`[data-focus-key="${activeKey}"]`);
  if (sameElement && !sameElement.disabled) {
    sameElement.focus();
    return;
  }
  // The button got disabled (hit the limit) → focus that row's quantity box.
  // The row is gone (removed) → focus the fallback, e.g. the heading.
  const productId = activeKey.split('-').pop();
  const quantityInput = container.querySelector(`[data-focus-key="quantity-${productId}"]`);
  const target = quantityInput ?? fallbackElement;
  if (target) {
    target.focus();
  }
}

// STEP 23: one set of listeners for every row (event delegation).
export function attachCartItemActions(container) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-product-id]');
    if (!button) {
      return;
    }
    const productId = Number(button.dataset.productId);
    const item = findCartItem(productId);
    if (!item) {
      return;
    }

    if (button.dataset.action === 'decrease-item') {
      updateQuantity(productId, item.quantity - 1);
    }
    if (button.dataset.action === 'increase-item') {
      updateQuantity(productId, item.quantity + 1);
    }
    if (button.dataset.action === 'remove-item') {
      removeFromCart(productId);
      showToast(`Removed from cart: ${item.title}`, 'info');
    }
  });


  // Typing a quantity directly into the box.
  container.addEventListener('change', (event) => {
    if (event.target.dataset.action !== 'set-item-quantity') {
      return;
    }
    const productId = Number(event.target.dataset.productId);
    const item = findCartItem(productId);
    const requested = Number(event.target.value);
    updateQuantity(productId, requested);
    if (item && requested > item.stock) {
      showToast(`Sorry, we only have ${item.stock} in stock.`, 'info');
    }
  });
}

// STEP 24: "Empty cart" always asks first — it can't be undone.
export async function confirmAndEmptyCart() {
  const confirmed = await confirmDialog({
    title: 'Empty your cart?',
    message: 'This removes every item from your cart. You can’t undo this.',
    confirmLabel: 'Yes, empty cart',
  });
  if (confirmed) {
    clearCart();
    showToast('Your cart is now empty', 'info');
  }
}

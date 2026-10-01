// =============================================================
// ui/checkoutPage.js — the checkout page at #/checkout.
// Step 1 of 3: delivery details. The order summary sits beside
// the form. Nothing is sent anywhere — the details are kept in
// sessionStorage until the (fake) payment step needs them.
// =============================================================
import { getState, subscribe } from '../state.js';
import { getCartTotals } from '../cart.js';
import { DELIVERY_OPTIONS, FREE_DELIVERY_THRESHOLD } from '../config.js';
import { loadFromSession, saveToSession } from '../storage.js';
import { validateCheckoutForm } from '../validation.js';
import { navigate } from '../router.js';
import { formatPrice } from '../utils.js';
import { setPageTitle } from './header.js';
import { createEmptyStateHTML } from './states.js';
import { createFieldHTML, showFieldError, clearFieldError, hasFieldError, showFormErrors } from './formErrors.js';
import { createOrderSummaryHTML } from './orderSummary.js';
import { createTotalsHTML } from './orderTotals.js';

// STEP 29: the fields, in the order they appear (used to find the first error).
const CHECKOUT_FIELDS = ['fullName', 'email', 'phone', 'address', 'city', 'deliveryOption'];

// STEP 28: a few city suggestions — you can still type any city.
const CITY_SUGGESTIONS = ['London', 'Athens', 'San Francisco', 'Kyoto', 'Istanbul', 'Edinburgh', 'Mexico City', 'Kingston'];


// STEP 28: the "1 → 2 → 3" progress bar at the top of the checkout pages.
export function createStepperHTML(currentStep) {
  const steps = ['Delivery details', 'Payment', 'Confirmation'];
  const items = steps
    .map((label, index) => {
      const stepNumber = index + 1;
      let state = '';
      if (stepNumber < currentStep) {
        state = 'is-done';
      }
      if (stepNumber === currentStep) {
        state = 'is-current';
      }
      return `<li class="stepper-step ${state}" ${stepNumber === currentStep ? 'aria-current="step"' : ''}>
        <span class="stepper-number" aria-hidden="true">${stepNumber}</span> ${label}
      </li>`;
    })
    .join('');
  return `<ol class="stepper" aria-label="Checkout progress">${items}</ol>`;
}


// STEP 28: 'Free' or '$5.00' for one delivery option.
function getDeliveryPriceText(option, itemsTotal) {
  const isFree = option.id === 'standard' && itemsTotal >= FREE_DELIVERY_THRESHOLD;
  return isFree ? 'Free' : formatPrice(option.fee);
}


// STEP 28: the two delivery choices as big clickable "radio cards".
function createDeliveryOptionsHTML(itemsTotal) {
  const optionsHTML = Object.values(DELIVERY_OPTIONS)
    .map((option) => {
      return `
        <label class="radio-card">
          <input type="radio" name="deliveryOption" value="${option.id}" aria-describedby="deliveryOption-error">
          <span class="radio-card-body">
            <span class="radio-card-title">${option.label}</span>
            <span class="radio-card-meta">${option.days} business days · <span data-delivery-price="${option.id}">${getDeliveryPriceText(option, itemsTotal)}</span></span>
          </span>
        </label>
      `;
    })
    .join('');

  return `
    <fieldset class="field field-group">
      <legend class="field-label">Delivery option</legend>
      <div class="radio-cards">${optionsHTML}</div>
      <p class="field-error" id="deliveryOption-error" data-error-for="deliveryOption" hidden></p>
    </fieldset>
  `;
}


// STEP 28: the "nothing to check out" screen.
function renderEmptyCheckout(container) {
  container.innerHTML = `
    <section class="page">
      <h1 class="page-title" tabindex="-1">Checkout — Delivery Details</h1>
      ${createEmptyStateHTML({
        title: 'Your cart is empty',
        message: 'Add something to your cart before you head to the checkout page.',
        actionHTML: '<a class="button button-primary" href="#/">Start shopping</a>',
      })}
    </section>
  `;
}


// STEP 28: draw the checkout page.
export function renderCheckoutPage({ container }) {
  setPageTitle('Checkout — Delivery details');
  let { cart } = getState();

  // STEP 28: nothing to check out? Say so instead of showing a form.
  if (cart.length === 0) {
    renderEmptyCheckout(container);
    return null;
  }

  // STEP 28: bring back anything typed earlier in this tab.
  const savedDetails = loadFromSession('checkout-details', {});
  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryOption: 'standard',
    ...(typeof savedDetails === 'object' && savedDetails !== null ? savedDetails : {}),
  };
  const baseTotals = getCartTotals(cart, 'standard');

  container.innerHTML = `
    <section class="page">
      ${createStepperHTML(1)}
      <h1 class="page-title" tabindex="-1">Checkout — Delivery Details</h1>
      <div class="checkout-layout">
        <form class="checkout-form" data-checkout-form novalidate>
          <p class="form-summary" data-form-summary role="alert" hidden></p>
          ${createFieldHTML({ name: 'fullName', label: 'Full name', autocomplete: 'name', placeholder: 'Amy Osborn' })}
          ${createFieldHTML({ name: 'email', label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'amy@example.com', hint: 'We’ll “send” your receipt here (not really — it’s a demo).' })}
          ${createFieldHTML({ name: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel', placeholder: '+44 770 123 4567', inputmode: 'tel' })}
          ${createFieldHTML({ name: 'address', label: 'Street address', autocomplete: 'street-address', placeholder: '12 Baker Street, Marylebone' })}
          ${createFieldHTML({ name: 'city', label: 'City', autocomplete: 'address-level2', placeholder: 'London', list: 'city-suggestions' })}
          <datalist id="city-suggestions">
            ${CITY_SUGGESTIONS.map((city) => `<option value="${city}"></option>`).join('')}
          </datalist>
          ${createDeliveryOptionsHTML(baseTotals.itemsTotal)}
          <div class="checkout-form-actions">
            <a class="button button-ghost" href="#/cart">← Back to cart</a>
            <button type="submit" class="button button-primary button-large">Continue to payment →</button>
          </div>
        </form>

        <aside class="summary-card checkout-layout-summary" aria-labelledby="checkout-summary-title">
          <h2 class="summary-card-title" id="checkout-summary-title">Order summary</h2>
          <div data-order-summary>${createOrderSummaryHTML(cart, getCartTotals(cart, initialValues.deliveryOption), initialValues.deliveryOption)}</div>
        </aside>
      </div>
    </section>
  `;

  const form = container.querySelector('[data-checkout-form]');
  const formSummary = form.querySelector('[data-form-summary]');
  const orderSummary = container.querySelector('[data-order-summary]');

  // STEP 28: put the saved values back into the inputs.
  ['fullName', 'email', 'phone', 'address', 'city'].forEach((name) => {
    form.elements[name].value = initialValues[name];
  });
  form.elements.deliveryOption.value = Object.hasOwn(DELIVERY_OPTIONS, initialValues.deliveryOption)
    ? initialValues.deliveryOption
    : 'standard';


  // STEP 28: read the whole form into a plain object with FormData.
  function getFormValues() {
    return Object.fromEntries(new FormData(form));
  }

  // STEP 29: check ONE field and show/hide its error.
  function validateField(name) {
    const errors = validateCheckoutForm(getFormValues());
    if (errors[name]) {
      showFieldError(form, name, errors[name]);
    } else {
      clearFieldError(form, name);
    }
  }

  // STEP 29: check a field when you LEAVE it — but not if you just
  // tabbed past an empty box without typing (that would feel rude).
  form.addEventListener('focusout', (event) => {
    const { name, value } = event.target;
    if (!CHECKOUT_FIELDS.includes(name) || name === 'deliveryOption') {
      return;
    }
    if (value.trim() !== '' || hasFieldError(form, name)) {
      validateField(name);
    }
  });

  form.addEventListener('input', (event) => {
    const { name } = event.target;
    // STEP 29: once a field shows an error, re-check it as you type,
    // so the error disappears the moment it's fixed.
    if (CHECKOUT_FIELDS.includes(name) && hasFieldError(form, name)) {
      validateField(name);
    }
    // STEP 28: keep a draft, so going back to the cart doesn't lose your typing.
    saveToSession('checkout-details', getFormValues());
  });

  // STEP 30: redraw the summary totals for the chosen delivery option.
  function updateSummaryTotals() {
    const deliveryOptionId = form.elements.deliveryOption.value || 'standard';
    orderSummary.querySelector('[data-summary-totals]').innerHTML =
      createTotalsHTML(getCartTotals(cart, deliveryOptionId), deliveryOptionId, { showDeliveryHint: false });
  }

  // STEP 30: changing delivery changes the totals in the summary.
  form.addEventListener('change', (event) => {
    if (event.target.name === 'deliveryOption') {
      updateSummaryTotals();
      clearFieldError(form, 'deliveryOption');
    }
  });

  // STEP 30: the cart can change while you're here (from the cart drawer).
  // Keep the summary and the "Free" delivery label honest.
  const unsubscribe = subscribe((state) => {
    if (state.cart === cart) {
      return;
    }
    cart = state.cart;
    if (cart.length === 0) {
      renderEmptyCheckout(container);
      return;
    }
    const deliveryOptionId = form.elements.deliveryOption.value || 'standard';
    orderSummary.innerHTML = createOrderSummaryHTML(cart, getCartTotals(cart, deliveryOptionId), deliveryOptionId);
    const { itemsTotal } = getCartTotals(cart);
    Object.values(DELIVERY_OPTIONS).forEach((option) => {
      form.querySelector(`[data-delivery-price="${option.id}"]`).textContent = getDeliveryPriceText(option, itemsTotal);
    });
  });


  // STEP 29: on submit, check everything. All good → go to payment.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = getFormValues();
    const errors = validateCheckoutForm(values);
    const errorCount = showFormErrors(form, errors, CHECKOUT_FIELDS);

    if (errorCount > 0) {
      formSummary.textContent = `Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} below.`;
      formSummary.hidden = false;
      return;
    }

    formSummary.hidden = true;
    const cleanValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    );
    saveToSession('checkout-details', cleanValues);
    navigate('/payment');
  });

  // STEP 30: stop listening to the cart when we leave the page.
  return { cleanup: unsubscribe };
}

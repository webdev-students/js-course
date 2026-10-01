// =============================================================
// ui/paymentStep.js — step 2 of 3, at #/payment.
// ⚠️ THIS IS A FAKE PAYMENT. Our Checkout store is a practice
// project: we only check that the card details LOOK right, wait
// a moment so it feels real, and save the order in the browser.
// No card data is sent anywhere, and we never store the full number.
// =============================================================
import { getState, subscribe } from '../state.js';
import { getCartTotals } from '../cart.js';
import { placeOrder } from '../orders.js';
import { loadFromSession, removeFromSession } from '../storage.js';
import { validateCheckoutForm, validatePaymentForm } from '../validation.js';
import { DELIVERY_OPTIONS } from '../config.js';
import { escapeHTML, formatPrice, wait } from '../utils.js';
import { setPageTitle } from './header.js';
import { createFieldHTML, showFormErrors, clearFieldError, hasFieldError, showFieldError } from './formErrors.js';
import { createOrderSummaryHTML } from './orderSummary.js';
import { createStepperHTML } from './checkoutPage.js';
import { showToast } from './toast.js';


// STEP 31: the fields, in the order they appear.
const PAYMENT_FIELDS = ['cardName', 'cardNumber', 'expiry', 'cvc'];

// STEP 31: how long the pretend "bank" takes to answer.
const FAKE_PROCESSING_MS = 1500;


// STEP 31: '4242424242424242' → '4242 4242 4242 4242'
export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// STEP 31: '0829' → '08/29'
export function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}


// STEP 31: draw the payment step.
export function renderPaymentStep({ container, isCurrent }) {
  setPageTitle('Payment (demo)');
  const { cart } = getState();
  const details = loadFromSession('checkout-details', null);

  // STEP 31: you can't pay for an empty cart…
  if (cart.length === 0) {
    location.replace('#/cart');
    return null;
  }
  // …or without delivery details (e.g. you typed #/payment in the address bar).
  if (!details || Object.keys(validateCheckoutForm(details)).length > 0) {
    location.replace('#/checkout');
    return null;
  }


  const deliveryOption = DELIVERY_OPTIONS[details.deliveryOption];
  const totals = getCartTotals(cart, deliveryOption.id);

  container.innerHTML = `
    <section class="page">
      ${createStepperHTML(2)}
      <h1 class="page-title" tabindex="-1">Payment</h1>

      <div class="demo-notice" role="note">
        <p class="demo-notice-title">This is a demo payment</p>
        <p>Our Checkout store is a practice project. No real money moves, and your card details never leave this page.
          Use the test card <strong>4242 4242 4242 4242</strong>, any future expiry date and any 3 digits.</p>
        <button type="button" class="button button-ghost button-small" data-action="fill-test-card">Fill in the test card for me</button>
      </div>

      <div class="checkout-layout">
        <div>
          <section class="summary-card" aria-labelledby="delivery-recap-title">
            <div class="summary-card-header">
              <h2 class="summary-card-title" id="delivery-recap-title">Delivering to</h2>
              <a class="link-button" href="#/checkout">Edit</a>
            </div>
            <p class="address">
              ${escapeHTML(details.fullName)}<br>
              ${escapeHTML(details.address)}, ${escapeHTML(details.city)}<br>
              ${escapeHTML(details.email)} · ${escapeHTML(details.phone)}
            </p>
            <p class="address-delivery">${deliveryOption.label} (${deliveryOption.days} business days)</p>
          </section>


          <form class="checkout-form" data-payment-form novalidate>
            <p class="form-summary" data-form-summary role="alert" hidden></p>
            ${createFieldHTML({ name: 'cardName', label: 'Name on card', placeholder: 'Amy Osborn' })}
            ${createFieldHTML({ name: 'cardNumber', label: 'Card number', inputmode: 'numeric', placeholder: '4242 4242 4242 4242', maxlength: '19' })}
            <div class="field-row">
              ${createFieldHTML({ name: 'expiry', label: 'Expiry (MM/YY)', inputmode: 'numeric', placeholder: '08/29', maxlength: '5' })}
              ${createFieldHTML({ name: 'cvc', label: 'CVC', inputmode: 'numeric', placeholder: '123', maxlength: '4' })}
            </div>
            <p class="payment-status" data-payment-status role="status"></p>
            <div class="checkout-form-actions">
              <a class="button button-ghost" href="#/checkout">← Back to delivery details</a>
              <button type="submit" class="button button-primary button-large" data-pay-button>
                Pay ${formatPrice(totals.total)} (demo)
              </button>
            </div>
          </form>
        </div>

        <aside class="summary-card checkout-layout-summary" aria-labelledby="payment-summary-title">
          <h2 class="summary-card-title" id="payment-summary-title">Order summary</h2>
          <div data-order-summary>${createOrderSummaryHTML(cart, totals, deliveryOption.id)}</div>
        </aside>
      </div>
    </section>
  `;


  const form = container.querySelector('[data-payment-form]');
  const formSummary = form.querySelector('[data-form-summary]');
  const status = form.querySelector('[data-payment-status]');
  const payButton = form.querySelector('[data-pay-button]');
  let isProcessing = false;

  // STEP 31: tidy the card number and expiry as you type.
  form.elements.cardNumber.addEventListener('input', (event) => {
    event.target.value = formatCardNumber(event.target.value);
  });
  form.elements.expiry.addEventListener('input', (event) => {
    event.target.value = formatExpiry(event.target.value);
  });
  form.elements.cvc.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
  });


  // STEP 31: re-check a broken field as soon as it's edited.
  form.addEventListener('input', (event) => {
    const { name } = event.target;
    if (PAYMENT_FIELDS.includes(name) && hasFieldError(form, name)) {
      const errors = validatePaymentForm(Object.fromEntries(new FormData(form)));
      if (errors[name]) {
        showFieldError(form, name, errors[name]);
      } else {
        clearFieldError(form, name);
      }
    }
  });


  // STEP 31: a shortcut for demos (and for recording videos!).
  container.querySelector('[data-action="fill-test-card"]').addEventListener('click', () => {
    form.elements.cardName.value = details.fullName;
    form.elements.cardNumber.value = '4242 4242 4242 4242';
    const nextYear = String((new Date().getFullYear() + 1) % 100).padStart(2, '0');
    form.elements.expiry.value = `12/${nextYear}`;
    form.elements.cvc.value = '123';
    PAYMENT_FIELDS.forEach((name) => clearFieldError(form, name));
    formSummary.hidden = true;
    payButton.focus();
  });


  // STEP 31: "pay" (pretend).
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isProcessing) {
      return; // no double orders from double clicks
    }

    const values = Object.fromEntries(new FormData(form));
    const errors = validatePaymentForm(values);
    const errorCount = showFormErrors(form, errors, PAYMENT_FIELDS);
    if (errorCount > 0) {
      formSummary.textContent = `Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} below.`;
      formSummary.hidden = false;
      return;
    }
    formSummary.hidden = true;


    // STEP 31: pretend to talk to a bank.
    isProcessing = true;
    payButton.disabled = true;
    payButton.textContent = 'Processing…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Processing your demo payment…';
    await wait(FAKE_PROCESSING_MS);

    // Left the page while "processing"? Then don't place the order.
    if (!isCurrent()) {
      return;
    }

    // STEP 32: save the order. Only the LAST 4 digits are kept.
    const cardDigits = values.cardNumber.replace(/\D/g, '');
    const { deliveryOption: deliveryOptionId, ...customer } = details;
    const order = placeOrder({
      customer,
      deliveryOptionId,
      payment: { method: 'Demo card', last4: cardDigits.slice(-4) },
    });
    removeFromSession('checkout-details');
    showToast('Order placed! (demo)');

    // replace() so the Back button doesn't return to this payment form.
    location.replace(`#/order/${encodeURIComponent(order.id)}`);
  });


  // STEP 31: if the cart changes while you're here (from the cart drawer),
  // update the summary and the amount on the Pay button.
  let lastCart = cart;
  const unsubscribe = subscribe((state) => {
    if (isProcessing || state.cart === lastCart) {
      return;
    }
    lastCart = state.cart;
    if (state.cart.length === 0) {
      location.replace('#/cart');
      return;
    }
    const newTotals = getCartTotals(state.cart, deliveryOption.id);
    container.querySelector('[data-order-summary]').innerHTML =
      createOrderSummaryHTML(state.cart, newTotals, deliveryOption.id);
    payButton.textContent = `Pay ${formatPrice(newTotals.total)} (demo)`;
  });

  // STEP 31: stop listening when we leave the page.
  return { cleanup: unsubscribe };
}

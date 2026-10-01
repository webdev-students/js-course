// =============================================================
// validation.js — the rules for the checkout form and the
// (fake) payment form. Pure functions: values in, errors out.
// An empty errors object means "all good".
// =============================================================
import { DELIVERY_OPTIONS } from './config.js';

// STEP 29: the patterns we check against.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_CHARACTERS = /^\+?[\d\s()-]+$/;

// STEP 29: count just the digits in a string: '+44 770-123' → 9.
function countDigits(text) {
  return text.replace(/\D/g, '').length;
}


// STEP 29: check the delivery details. Returns e.g.
// { email: 'Please enter a valid email address, like amy@example.com.' }
export function validateCheckoutForm(values) {
  const errors = {};
  const fullName = (values.fullName ?? '').trim();
  const email = (values.email ?? '').trim();
  const phone = (values.phone ?? '').trim();
  const address = (values.address ?? '').trim();
  const city = (values.city ?? '').trim();


  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (email === '') {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address, like amy@example.com.';
  }

  if (phone === '') {
    errors.phone = 'Please enter your phone number.';
  } else if (!PHONE_ALLOWED_CHARACTERS.test(phone) || countDigits(phone) < 7 || countDigits(phone) > 15) {
    errors.phone = 'Please enter a valid phone number, like +44 770 123 4567.';
  }


  if (address.length < 5) {
    errors.address = 'Please enter your street address.';
  }

  if (city.length < 2) {
    errors.city = 'Please enter your city.';
  }

  if (!Object.hasOwn(DELIVERY_OPTIONS, values.deliveryOption ?? '')) {
    errors.deliveryOption = 'Please choose a delivery option.';
  }

  return errors;
}


// STEP 31: check the FAKE card details. We only check the format —
// nothing is ever sent to a bank.
export function validatePaymentForm(values, today = new Date()) {
  const errors = {};
  const cardName = (values.cardName ?? '').trim();
  const cardNumber = (values.cardNumber ?? '').replace(/\s/g, '');
  const expiry = (values.expiry ?? '').trim();
  const cvc = (values.cvc ?? '').trim();

  if (cardName.length < 2) {
    errors.cardName = 'Please enter the name on the card.';
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    errors.cardNumber = 'Card number must be 16 digits. Try the test card 4242 4242 4242 4242.';
  }


  const expiryMatch = expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!expiryMatch) {
    errors.expiry = 'Please use the format MM/YY, like 08/29.';
  } else {
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    // The card works until the END of its expiry month.
    const endOfExpiryMonth = new Date(year, month, 1);
    if (month < 1 || month > 12) {
      errors.expiry = 'The month must be between 01 and 12.';
    } else if (endOfExpiryMonth <= today) {
      errors.expiry = 'This card has expired. Use a date in the future.';
    }
  }


  if (!/^\d{3,4}$/.test(cvc)) {
    errors.cvc = 'CVC must be 3 or 4 digits.';
  }

  return errors;
}

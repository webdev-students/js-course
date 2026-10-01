// Exercise 6 — Accessibility audit
const emailInput = document.querySelector('#email');
const errorMessage = document.querySelector('#email-error');

document.querySelector('#subscribe').addEventListener('click', () => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  errorMessage.hidden = isValid;
});

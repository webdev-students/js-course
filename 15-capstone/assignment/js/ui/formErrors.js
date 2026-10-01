// =============================================================
// ui/formErrors.js — show and hide accessible inline errors.
// Each field has an error <p> linked to its input with
// aria-describedby, so a screen reader reads the error when
// the input gets focus. aria-invalid marks the input as wrong.
// =============================================================

// STEP 29: show the error for one field.
export function showFieldError(form, name, message) {
  const errorElement = form.querySelector(`[data-error-for="${name}"]`);
  errorElement.textContent = message;
  errorElement.hidden = false;
  form.querySelectorAll(`[name="${name}"]`).forEach((input) => {
    input.setAttribute('aria-invalid', 'true');
  });
}

// STEP 29: hide the error for one field.
export function clearFieldError(form, name) {
  const errorElement = form.querySelector(`[data-error-for="${name}"]`);
  errorElement.textContent = '';
  errorElement.hidden = true;
  form.querySelectorAll(`[name="${name}"]`).forEach((input) => {
    input.removeAttribute('aria-invalid');
  });
}

// STEP 29: is this field currently showing an error?
export function hasFieldError(form, name) {
  return !form.querySelector(`[data-error-for="${name}"]`).hidden;
}

// STEP 29: update EVERY field from an errors object, then put
// focus on the first broken one. Returns how many are broken.
export function showFormErrors(form, errors, fieldNames) {
  fieldNames.forEach((name) => {
    if (errors[name]) {
      showFieldError(form, name, errors[name]);
    } else {
      clearFieldError(form, name);
    }
  });

  const firstInvalidName = fieldNames.find((name) => errors[name]);
  if (firstInvalidName) {
    form.querySelector(`[name="${firstInvalidName}"]`).focus();
  }
  return fieldNames.filter((name) => errors[name]).length;
}

// STEP 28: one input field with a label, optional hint and an error slot.
// (We fill in saved values afterwards with form.elements, which is
// safer than putting user text inside an HTML string.)
export function createFieldHTML({ name, label, type = 'text', autocomplete = 'off', hint = '', inputmode = '', placeholder = '', maxlength = '', list = '' }) {
  const describedBy = [hint ? `${name}-hint` : '', `${name}-error`].filter(Boolean).join(' ');
  return `
    <div class="field">
      <label class="field-label" for="field-${name}">${label}</label>
      ${hint ? `<p class="field-hint" id="${name}-hint">${hint}</p>` : ''}
      <input class="field-input" id="field-${name}" name="${name}" type="${type}"
        autocomplete="${autocomplete}" aria-describedby="${describedBy}" required
        ${inputmode ? `inputmode="${inputmode}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${maxlength ? `maxlength="${maxlength}"` : ''}
        ${list ? `list="${list}"` : ''}>
      <p class="field-error" id="${name}-error" data-error-for="${name}" hidden></p>
    </div>
  `;
}

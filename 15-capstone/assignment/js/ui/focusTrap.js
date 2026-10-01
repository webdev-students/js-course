// =============================================================
// ui/focusTrap.js — keep keyboard focus INSIDE an open drawer or
// dialog. Without this, pressing Tab would wander off behind the
// dark overlay into the page you can't even see.
// =============================================================

// STEP 24: everything a keyboard user can Tab to.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// STEP 24: traps can stack (the "Empty cart?" dialog opens ON TOP of
// the cart drawer). Only the top one reacts to the keyboard.
const activeTraps = [];

function handleKeydown(event) {
  const topTrap = activeTraps[activeTraps.length - 1];
  if (topTrap) {
    topTrap.handleKeydown(event);
  }
}

// STEP 24: create a trap for `element`. `onEscape` runs when Escape is pressed.
export function createFocusTrap(element, { onEscape }) {
  let previouslyFocused = null;

  function getFocusableElements() {
    return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
      (candidate) => !candidate.closest('[hidden]'),
    );
  }

  const trap = {
    handleKeydown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsInside = element.contains(document.activeElement);

      // Shift+Tab on the first item → jump to the last one (and the reverse).
      if (event.shiftKey && (document.activeElement === first || !focusIsInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !focusIsInside)) {
        event.preventDefault();
        first.focus();
      }
    },

    // Remember where focus was, then move it inside.
    activate() {
      previouslyFocused = document.activeElement;
      if (activeTraps.length === 0) {
        document.addEventListener('keydown', handleKeydown);
      }
      activeTraps.push(trap);
      const startElement = element.querySelector('[data-autofocus]') ?? getFocusableElements()[0] ?? element;
      startElement.focus();
    },

    // Give focus back to whatever opened us (e.g. the cart button).
    // restoreFocus: false → leave focus alone (the router is moving it).
    deactivate({ restoreFocus = true } = {}) {
      const index = activeTraps.indexOf(trap);
      if (index !== -1) {
        activeTraps.splice(index, 1);
      }
      if (activeTraps.length === 0) {
        document.removeEventListener('keydown', handleKeydown);
      }
      if (restoreFocus && previouslyFocused && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    },
  };

  return trap;
}

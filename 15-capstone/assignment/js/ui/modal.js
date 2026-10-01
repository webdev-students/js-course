// =============================================================
// ui/modal.js — an accessible "Are you sure?" dialog.
// confirmDialog() returns a Promise, so we can write:
//   const confirmed = await confirmDialog({ ... });
// =============================================================
import { createFocusTrap } from './focusTrap.js';

// STEP 24: show the dialog and wait for Yes / Cancel / Escape.
export function confirmDialog({ title, message, confirmLabel = 'Yes', cancelLabel = 'Cancel' }) {
  const modal = document.querySelector('#confirm-dialog');
  const panel = modal.querySelector('[data-modal-panel]');
  const confirmButton = modal.querySelector('[data-modal-confirm]');
  const cancelButton = modal.querySelector('[data-modal-cancel]');
  const backdrop = modal.querySelector('[data-modal-backdrop]');

  // Already open? Don't open a second one on top.
  if (!modal.hidden) {
    return Promise.resolve(false);
  }

  modal.querySelector('[data-modal-title]').textContent = title;
  modal.querySelector('[data-modal-message]').textContent = message;
  confirmButton.textContent = confirmLabel;
  cancelButton.textContent = cancelLabel;
  modal.hidden = false;


  return new Promise((resolve) => {
    // Escape counts as "Cancel".
    const trap = createFocusTrap(panel, { onEscape: () => close(false) });

    function close(result) {
      modal.hidden = true;
      confirmButton.removeEventListener('click', handleConfirm);
      cancelButton.removeEventListener('click', handleCancel);
      backdrop.removeEventListener('click', handleCancel);
      trap.deactivate();
      resolve(result);
    }
    function handleConfirm() {
      close(true);
    }
    function handleCancel() {
      close(false);
    }

    confirmButton.addEventListener('click', handleConfirm);
    cancelButton.addEventListener('click', handleCancel);
    backdrop.addEventListener('click', handleCancel);

    // Focus starts on "Cancel" (it has data-autofocus) — the safe choice.
    trap.activate();
  });
}

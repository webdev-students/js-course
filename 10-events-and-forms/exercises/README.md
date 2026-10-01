# Module 10: Events & Forms — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Click counter

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-01-click-counter/`

Build a quantity picker like the one on a product page:

1. **+** adds one, **−** takes one away. The quantity can't go below **1** or above the stock (`MAX_QUANTITY = 5`).
2. Disable **−** when the quantity is 1, and **+** when it's 5 (`button.disabled`).
3. Show the line total under it: `Total: $59.97` (price $19.99).
4. Use ONE handler function for both buttons: read `event.currentTarget.dataset.change` (`"1"` or `"-1"`).

## Exercise 02 — Live character count

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-live-character-count/`

A product review box allows at most 120 characters.

1. Under the box, show `0 / 120` and update it on **every** keystroke (`input` event).
2. When there are fewer than 20 characters left, add the class `warning` to the counter; remove it again when there's room.
3. Disable the **Post review** button when the box is empty (spaces don't count) or over the limit.
4. Show a preview of the review under the button, as plain text (so `<b>` stays as characters).

## Exercise 03 — Newsletter form

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-newsletter-form/`

Make the newsletter form work properly — the same way as lesson 10.5:

1. On `submit`: `preventDefault`, read the values with `FormData`.
2. `validate(values)` returns an errors object:
   - `email`: must look like an email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`),
   - `topic`: must not be the empty `"Choose a topic…"` option,
   - `agree`: the checkbox must be ticked (`Please agree to receive emails.`).
3. Show each error in its `…-error` paragraph, set `aria-invalid="true"` on the field, and focus the first broken field. Clear errors that are fixed.
4. On success: hide the form (`form.hidden = true`) and show `Subscribed amy@example.com to Deals.` in `#result`.

## Exercise 04 — Keyboard shortcuts

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-keyboard-shortcuts/`

A photo gallery that works from the keyboard. The starter has 4 photos in an array and one `<img>`.

1. **→** (`ArrowRight`) shows the next photo, **←** (`ArrowLeft`) the previous one. Wrap around at the ends (after the last comes the first).
2. Update the caption: `Photo 2 of 4 — Desk Lamp`.
3. **Home** jumps to the first photo, **End** to the last.
4. Shortcuts must NOT work while the user is typing in the feedback box.
5. Also make the **Previous** and **Next** buttons work — reuse the same `showPhoto(index)` function.

## Exercise 05 — Delegated wishlist

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-05-delegated-list/`

A wishlist rendered from an array. Each item has **Move to cart** and **Remove** buttons.

1. Write `renderWishlist()` that draws the `wishlist` array into `#wishlist` (escape the titles!), and shows `Your wishlist is empty.` when there's nothing left. Also update `#cart-count`.
2. Add **ONE** click listener on `#wishlist` (event delegation). Use `event.target.closest('[data-action]')` and the item's `data-product-id`.
3. `remove` → filter the item out of `wishlist`, re-render.
4. `move-to-cart` → push it into `cart`, remove it from `wishlist`, re-render.
5. Check: after removing an item, the other buttons still work (because the listener is on the list, not the buttons).

## Exercise 06 — Modal dialog

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-06-modal/`

Build a "Size guide" dialog, like lesson 10.10:

1. **Open**: clicking **Size guide** shows the dialog (`hidden = false`), remembers `document.activeElement`, and moves focus to the dialog's **Close** button.
2. **Close** with: the **Close** button, a click on the backdrop, or **Escape** — then give the focus back to the **Size guide** button.
3. While the dialog is open, add the class `no-scroll` to `<body>`; remove it when it closes.
4. **Bonus — trap the focus**: while the dialog is open, pressing **Tab** on the last focusable element inside it moves focus to the first one, and **Shift+Tab** on the first moves to the last. (The dialog has two focusable elements: a link and the Close button.)

## Exercise 07 — Tabs

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-07-tabs/`

A product page has three tabs: **Description**, **Specs** and **Reviews**. Only one panel shows at a time.

1. Clicking a tab shows its panel (`hidden = false`) and hides the others. Use **one** delegated listener on the tab list.
2. The selected tab has `aria-selected="true"` and the class `highlight`; the others have `aria-selected="false"`.
3. **Keyboard**: when a tab has focus, **→** and **←** move to the next / previous tab (wrapping around), select it, and focus it.
4. Only the selected tab is in the Tab order: selected tab `tabindex="0"`, the others `tabindex="-1"`.

All the tab buttons have `role="tab"`, `data-panel="…"` naming the panel's id.

## Exercise 08 — FAQ accordion

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-08-accordion/`

A delivery FAQ: each question is a button, and its answer is hidden underneath.

1. Clicking a question shows or hides its answer, and flips `aria-expanded` between `"true"` and `"false"`. Use **one** delegated listener.
2. Only one answer is open at a time: opening one closes the others.
3. An **Expand all** / **Collapse all** button opens or closes everything, and changes its own text to match.
4. Show how many answers are open: `1 of 3 open`.

Each question button has `aria-controls="…"` with its answer's id.

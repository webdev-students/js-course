# Module 11: State & Local Storage — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Counter with state

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-01-counter-state/`

Rebuild a tiny "items in basket" widget using the state pattern from lesson 11.1:

1. `const state = { count: 0, step: 1 }`.
2. `setState(changes)` merges the changes and calls every subscriber; `subscribe(listener)` adds a listener and calls it straight away.
3. Two subscribers: one updates `#count`; the other disables **−** when the count is 0.
4. Buttons: **+** adds `state.step`, **−** takes it away (never below 0), and the **Step** select changes `state.step` (1, 5 or 10).
5. No handler may change the page directly — only `setState`.

## Exercise 02 — Remember my name

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-remember-name/`

1. When the page loads, if a name is saved in localStorage under `'greeter:name'`, show `Welcome back, Amy!` and hide the form. Otherwise show `Hello, stranger!` and the form.
2. Submitting the form (a trimmed, non-empty name) saves it, and switches to the welcome message.
3. **Forget me** removes the saved name and shows the form again.
4. Refresh after each step to check it really is remembered.

## Exercise 03 — Save a settings object

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-save-settings-object/`

A shop's settings panel has three controls: **theme** (light / dark), **currency** (USD / EUR) and **show out-of-stock products** (a checkbox).

1. Keep all three in ONE settings object: `{ theme: 'light', currency: 'USD', showSoldOut: true }`.
2. Save the whole object under `'shop:settings'` with `JSON.stringify` whenever anything changes.
3. On load, read it SAFELY with a `loadFromStorage(key, fallback)` helper (`try` / `catch` — from lesson 11.4). Merge the loaded object over the defaults with spread, so a missing setting still gets its default: `{ ...DEFAULT_SETTINGS, ...saved }`.
4. Put the loaded values into the controls, and show a summary line: `Theme: dark · Currency: EUR · Sold out: hidden`.
5. Test: change everything, refresh; then break the saved value in DevTools and refresh — the defaults should come back, with a warning in the Console.

**Expected output in the Console:**

```text
⚠️ Couldn't read "shop:settings", using the defaults.
```

## Exercise 04 — Contact form draft

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-04-session-form-draft/`

A "Contact us" form with a subject and a long message. Losing a long message to an accidental refresh is painful.

1. Save a draft to **sessionStorage** (`'contact:draft'`) on every `input`.
2. On load, restore the draft into the fields (safely — `try` / `catch`), and show `Draft restored.`
3. Show the message length live: `42 characters`.
4. A **Discard draft** button clears the form AND the saved draft (ask first with `confirm('Discard your message?')`).
5. Submitting (with `preventDefault`) shows `Message sent!` and removes the draft.

## Exercise 05 — Id generator

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-id-generator/`

Write three id makers, and a page that shows them:

1. `makeCounter(prefix, start = 1)` — a closure (Module 5!) that returns a function giving `'TKT-1'`, `'TKT-2'`, … each time it's called.
2. `createOrderId()` — `'CHK-'` plus the first 8 characters of `crypto.randomUUID()` in capitals.
3. `createShortId(length = 6)` — random letters and digits from `'ABCDEFGHJKMNPQRSTUVWXYZ23456789'` (no easily-confused 0/O, 1/I/L), using `crypto.getRandomValues(new Uint32Array(length))`. *(Look it up on MDN — practice from Module 6!)*
4. The **Generate** button adds one of each to the list on the page.
5. Generate 1,000 order ids in a loop, put them in a `Set`, and log whether there were any duplicates.

**Expected output in the Console:**

```text
1000 order ids, unique ones: 1000
Short id looks right? true
```

## Exercise 06 — Format dates

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-06-format-dates/`

An order history, saved as ISO strings. For a fixed "today" (`const TODAY = new Date('2026-09-27T12:00:00')`), print a line per order:

```text
CHK-1A2B3C4D — Thursday, 24 September 2026 — 3 days ago — arrives Tue 29 Sept
```

1. `formatOrderDate(isoString)` — `Intl.DateTimeFormat('en-GB', { dateStyle: 'full' })`.
2. `daysBetween(earlier, later)` — whole days between two dates. Hint: subtract the `getTime()` values and divide by `1000 * 60 * 60 * 24`, then `Math.round`.
3. `describeAge(days)` — `today`, `yesterday`, or `3 days ago`.
4. `getStatus(orderDate)` — delivered if 5 or more days have passed, otherwise `arrives Fri 2 Oct` (5 days after the order, formatted with `{ weekday: 'short', day: 'numeric', month: 'short' }`).
5. Show the orders newest first, as a list on the page.

**Expected output in the Console:**

```text
CHK-9F8E7D6C — Sunday, 27 September 2026 — today — arrives Fri 2 Oct
CHK-77AB12CD — Saturday, 26 September 2026 — yesterday — arrives Thu 1 Oct
CHK-1A2B3C4D — Thursday, 24 September 2026 — 3 days ago — arrives Tue 29 Sept
CHK-5A5A5A5A — Wednesday, 16 September 2026 — 11 days ago — delivered
```

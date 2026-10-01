# Module 13: Modern JS — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Split into modules

**Level:** Easy · **Time:** 20 min · **Folder:** `exercises/ex-01-split-into-modules/`

The starter's `script.js` does everything in one file: settings, price formatting, a product list and drawing it. Split it into modules:

- `js/config.js` — exports `SHOP_NAME` and `VAT_RATE`.
- `js/utils.js` — exports `formatPrice(amount)` and `addVat(amount)` (imports `VAT_RATE`).
- `js/products.js` — exports the `products` array.
- `js/main.js` — imports what it needs and draws the page.

Change `index.html` to load `js/main.js` with `type="module"`, and delete `script.js`. The page must look exactly the same.

## Exercise 02 — Product class

**Level:** Easy · **Time:** 20 min · **Folder:** `exercises/ex-02-product-class/`

Write a `Product` class:

- `constructor(title, price, stock)`.
- `getLabel()` → `'Desk Lamp — $27.00'`.
- `isInStock()` → `true` / `false`.
- `sell(quantity = 1)` → takes the quantity off the stock, but never below 0; returns how many were actually sold.
- `static fromJSON(data)` → makes a Product from a plain object like `{ title, price, stock }`.

Then create three products from the `data` array in the starter (with `map` and `fromJSON`), sell 5 of each, and log their labels and remaining stock.

**Expected output in the Console:**

```text
Desk Lamp — $27.00 | sold 5 | 3 left | in stock: true
Water Bottle — $12.50 | sold 3 | 0 left | in stock: false
Leather Wallet — $34.50 | sold 0 | 0 left | in stock: false
```

## Exercise 03 — Bank account with private fields

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-bank-account-private/`

Write a `BankAccount` class whose balance can't be changed from outside:

- `#balance` (private) and `#history` (a private array).
- `constructor(owner, openingBalance = 0)`.
- `deposit(amount)` and `withdraw(amount)` — throw an Error for amounts that aren't positive numbers; `withdraw` throws `Insufficient funds` if there isn't enough. Each successful action adds `'+50'` or `'-20'` to the history.
- `get balance()` — read-only.
- `get history()` — returns a **copy** of the history array (so nobody can change the real one).

Test: open with $100, deposit 50, withdraw 20, try to withdraw 500 (catch the error), try `account.balance = 1000000`, and log the balance and the history.

**Expected output in the Console:**

```text
Withdraw failed: Insufficient funds
Amy's balance: $130
History: (2) ['+50', '-20']
```

## Exercise 04 — Shape inheritance

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-04-shape-inheritance/`

A tiler prices jobs by area. Write:

- `class Shape` with `constructor(name)`, a method `getArea()` that returns 0, and `describe()` → `'Kitchen floor: 12.00 m²'` (using `this.getArea()`).
- `class Rectangle extends Shape` — `constructor(name, width, length)`; `getArea()` = width × length.
- `class Circle extends Shape` — `constructor(name, radius)`; `getArea()` = π × r².
- `class Square extends Rectangle` — `constructor(name, side)` calls `super(name, side, side)`.

Then put one of each in an array, log `describe()` for each, and the total area of all of them (rounded to 2 decimals). Finally, log whether the square is an `instanceof` Rectangle and Shape.

**Expected output in the Console:**

```text
Kitchen floor: 12.00 m²
Round patio: 12.57 m²
Bathroom: 6.25 m²
Total: 30.82 m²
true true
```

## Exercise 05 — Bind the button

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-bind-the-button/`

The starter has a `Timer` class with `start()`, `stop()` and `tick()` methods. Its buttons don't work: `this` gets lost.

1. Explain in a comment, for each broken line, what `this` is when the method runs.
2. Fix the **Start** button with an arrow function.
3. Fix the **Stop** button with `bind`.
4. Fix `setInterval(this.tick, 1000)` inside `start()`.
5. Starting twice must not create two intervals.

## Exercise 06 — Validate with regex

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-06-validate-with-regex/`

Write the validators for a delivery form, each returning `true` or `false`:

1. `isValidEmail(text)` — the pattern from lesson 13.8.
2. `isValidPhone(text)` — a UK mobile number: 11 digits starting `07`. Spaces and dashes are allowed (remove them first with `replace`).
3. `isValidPostcode(text)` — a US ZIP code: exactly 5 digits.
4. `isStrongPassword(text)` — at least 8 characters, a small letter, a capital and a digit (lookaheads).
5. `formatPhone(text)` — returns `'0770 123 4567'` from `'07701234567'` (capture groups).

Run the test table in the starter — every line should say `ok`.

**Expected output in the Console:**

```text
ok   isValidEmail('amy@example.com') → true
ok   isValidEmail('amy@example') → false
ok   isValidPhone('0770 123 4567') → true
ok   isValidPhone('07701234567') → true
ok   isValidPhone('06031234567') → false
ok   isValidPostcode('10001') → true
ok   isValidPostcode('1000') → false
ok   isStrongPassword('Password1') → true
ok   isStrongPassword('password1') → false
0770 123 4567
```

## Exercise 07 — Price formatter

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-07-price-formatter/`

Build the Checkout store's price formatting from lesson 13.9, as a small settings-driven module:

1. `createPriceFormatter({ currency, locale, exchangeRate })` returns an object with:
   - `format(apiDollars)` → the converted, formatted price,
   - `formatRange(minDollars, maxDollars)` → `'$10.00 – $25.00'`,
   - `formatDiscount(percent)` → `'-15%'` (use `style: 'percent'` with `signDisplay: 'always'`… then flip it to a minus!). Hint: format `-percent / 100`.
2. Build the formatter objects ONCE (inside `createPriceFormatter`, not inside `format`).
3. Make two: US dollars (`'USD'`, `'en-US'`, rate 1) and euros (`'EUR'`, `'de-DE'`, a pretend rate of 0.92). Log the same prices with both.

**Expected output in the Console:**

```text
$9.99 | $10.00 – $25.00 | -15%
9,19 € | 9,20 € – 23,00 € | -15 %
```

## Exercise 08 — Mini router

**Level:** Hard · **Time:** 35 min · **Folder:** `exercises/ex-08-mini-router/`

Build a reusable hash router module, like a smaller version of the Checkout store's `router.js`.

`js/router.js` exports:
- `addRoute(pattern, render)` — patterns like `'/'`, `'/about'`, `'/product/:id'`.
- `startRouter(outlet)` — listens for `hashchange`, routes once on start.
- `navigate(path)` — `location.hash = path`.

When routing: find the first route whose pattern matches (`:id` matches any one part, and its value is passed to `render` as `{ id }`), put what `render` returns into the outlet, set `document.title`, focus the page's `h1`, and mark the current nav link with `aria-current="page"`. Unknown paths show a "Page not found" view.

`js/main.js` registers three routes (home, about, product) and starts the router.

# Module 9: The DOM — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Change the heading

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-change-heading/`

The starter page shows a shop's welcome banner. Using only JavaScript (don't edit `index.html`!):

1. Change the `h1` to `Welcome to Mira Accessories`.
2. Change the paragraph with the class `tagline` to `Fresh jewels, every day.`
3. Change the browser tab's title to `Mira Accessories`.
4. Log the new heading text AND the old text of the paragraph (save it in a variable before you change it).

**Expected output in the Console:**

```text
Heading is now: Welcome to Mira Accessories
Tagline used to be: Tagline goes here.
```

## Exercise 02 — Select all the cards

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-select-all-cards/`

The starter page has six product cards. With `querySelectorAll`:

1. Log how many cards there are.
2. Log every product title, one per line.
3. Make an array of all the prices as **numbers** (the text is like `$19.99` — cut off the `$` with `slice(1)`), and log the total of all the prices, to 2 decimal places.
4. Change the heading to `6 products — $149.94 in total` (build the text from your variables, don't type the numbers).
5. Log the title of the most expensive product.

**Expected output in the Console:**

```text
Cards: 6
Wireless Mouse
Leather Wallet
Desk Lamp
USB-C Charger
Water Bottle
Headphones
Total: 149.94
Most expensive: Headphones
```

## Exercise 03 — Highlights with classList

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-03-toggle-highlight/`

The starter page lists products, each with a `data-sale` attribute (`"yes"` or `"no"`) and a `data-price`.

Using **only `classList`** (no `style`):

1. Add the class `highlight` to every product on sale.
2. Add the class `sold-out` to the item whose `data-available` is `"false"`.
3. Use `classList.toggle(name, condition)` to add `is-hidden` to every item that costs more than $30 — in one line inside a `forEach`.
4. Log how many items are still visible (hint: those WITHOUT `is-hidden`).

**Expected output in the Console:**

```text
Visible items: 4
```

## Exercise 04 — Data attributes

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-data-attributes/`

The starter page has three product cards. Each card has `data-product-id`, `data-price` and `data-stock`, and an empty `<p class="stock-label">` and a **Buy** button.

For every card:

1. Read its data with `dataset` (and convert the numbers!).
2. Fill in its `.stock-label`: `Sold out`, `Only 3 left`, or `12 in stock` (fewer than 5 counts as "only").
3. If it's sold out: disable the button, change its text to `Sold out`, and add the `sold-out` class to the card.
4. Give each button an `aria-label` like `Buy product 7` with `setAttribute`.
5. Add a new data attribute `data-low-stock="true"` to cards with fewer than 5 left (but more than 0).

Finally, log the ids of the low-stock products as an array.

**Expected output in the Console:**

```text
Low stock: ['15']
```

## Exercise 05 — Build a card

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-05-build-a-card/`

The starter has one product object and an empty `<div id="card-slot">`. Build a product card for it **twice**, in two different ways:

**Way 1 — `createElement`:** write `createProductCard(product)` that returns an `<article class="product-card">` element containing:
- a `span.badge` with the category,
- an `h3` with the title,
- a `p.price` with the price formatted like `$27.00`,
- a `button` with the text `Add to cart` and `data-product-id` set to the product's id.

Append it to `#card-slot`.

**Way 2 — an HTML string:** write `createProductCardHTML(product)` that returns the same card as a string (escape the text with `escapeHTML`!), and add it **after** the first card with `insertAdjacentHTML('beforeend', …)`.

Then test the escaping: change the product's title to `Lamp <script>alert(1)</script>` and check that both cards show the text safely.

**Expected output in the Console:**

```text
Cards on the page: 2
```

## Exercise 06 — Render the city list

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-06-render-city-list/`

The starter has an array of delivery cities (objects with `name`, `country` and `days`) and an empty `<ul id="city-list">`.

1. Write `createCityHTML(city)` that returns `<li><strong>London</strong>, United Kingdom — 1 day</li>` (with `day` or `days` correct, and the text escaped).
2. Write `renderCities(list)` that draws the whole list with `map` + `join` + `innerHTML`, and updates `#city-count` to `6 cities`. If the list is empty, show `<li class="muted">No cities found.</li>` and `0 cities`.
3. Call it with: all the cities; then only the cities with delivery in 2 days or fewer, sorted by days (fastest first).
4. **Bonus:** write `renderCitiesWithFragment(list)` that builds the same list with `createElement`, a `DocumentFragment` and `replaceChildren` — and use it for the final render.

**Expected output in the Console:**

```text
All cities: 6
Fast cities: 3
First item: London, United Kingdom — 1 day
```

## Exercise 07 — Traverse to the parent

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-traverse-to-parent/`

The starter page is a small cart: each `<li class="cart-item">` has a title, a quantity, a price and a **Remove** button. We haven't learned clicks yet (that's next module), so the starter pretends a button was clicked: `const clickedButton = document.querySelectorAll('.remove-button')[1];`.

Starting ONLY from `clickedButton` (no other `querySelector` on the document):

1. Find its cart item with `closest`, and log the product's `data-product-id`.
2. Log the item's title, using `querySelector` on the item.
3. Log the titles of the items **before** and **after** it (`previousElementSibling` / `nextElementSibling`), or `'none'` if there isn't one.
4. Remove the item from the page.
5. Update the `#cart-total` paragraph (find it by going up to the `.cart` section with `closest`, then down) with the new total: add up `quantity × price` of the items that are left, from their `data-` attributes.

**Expected output in the Console:**

```text
Product id: 3
Title: Desk Lamp
Before: Wireless Mouse | after: Water Bottle
New total: 77.48
```

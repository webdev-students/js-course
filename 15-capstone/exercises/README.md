# Module 15: Capstone: the Checkout store — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Recently viewed

**Level:** Easy · **Time:** 30 min · **Folder:** `exercises/ex-01-recently-viewed/`

Stores love a "Recently viewed" row. Build the logic on a small practice page first, then add it to your Checkout store.

The starter already fetches 8 products and shows them as buttons. Clicking a button calls `viewProduct(product)`, which shows the product's title. Your job:

1. Write `loadRecentIds()` — reads `'checkout-app:recently-viewed'` from localStorage and returns an array of ids. Empty or broken storage must return `[]` (use `try` / `catch`, like `storage.js` in the store).
2. Write `addRecentId(id)` — puts the id at the **front**, removes it from anywhere else in the list (no duplicates), keeps at most **4**, and saves.
3. Write `renderRecent()` — shows the titles of the recent products in `#recent-list`, newest first, or "Nothing yet" when the list is empty.
4. Call `addRecentId` and `renderRecent` inside `viewProduct`, and call `renderRecent()` once at start-up.
5. Refresh the page: the row must still be there.

**Plug it into our Checkout store:** add the two functions to a new `js/recently-viewed.js` that uses `load` / `save` from `storage.js`, call `addRecentId(product.id)` when the product page renders, and show the row on the home page with `createProductCard`.

## Exercise 02 — Coupon codes

**Level:** Medium · **Time:** 35 min · **Folder:** `exercises/ex-02-coupon-codes/`

Add coupon codes to the store's totals — as pure logic first, tested in the Console, just like `cart.js` was.

The starter has the cart and `getTotals(cart)` (subtotal, shipping, total — shipping is free from $50). Write `applyCoupon(cart, code)` that returns the totals **plus** a `discount` and a `message`:

| Code | What it does |
|------|--------------|
| `SAVE10` | 10% off the subtotal |
| `FLAT5` | $5 off, only when the subtotal is at least $20 |
| `FREESHIP` | shipping becomes 0 |

Rules:
1. Codes ignore case and spaces: `' save10 '` works.
2. An unknown code: no discount, message `Unknown code "XYZ"`.
3. `FLAT5` under $20: no discount, message `FLAT5 needs a subtotal of at least $20.00`.
4. Store the coupons in a lookup object, not an if-chain.
5. Round money to cents with `Math.round(amount * 100) / 100`.

**Plug it into our Checkout store:** add a coupon field on the cart page, keep the applied code in `state`, and show the discount line in the order summary.

**Expected output in the Console:**

```text
{subtotal: 40.97, shipping: 4.99, total: 45.96}
SAVE10 applied: −$4.10 41.86
FREESHIP applied: −$4.99 40.97
FLAT5 applied: −$5.00 40.96
FLAT5 needs a subtotal of at least $20.00
Unknown code "XYZ"
```

## Exercise 03 — Compare products

**Level:** Medium · **Time:** 40 min · **Folder:** `exercises/ex-03-compare-products/`

Let shoppers tick up to **three** products and compare them side by side.

The starter fetches 6 products and draws a checkbox for each. Your job:

1. Keep the ticked ids in a `selectedIds` array (state), updated by ONE `change` listener on `#product-picker` (event delegation).
2. When 3 are ticked, **disable** the other checkboxes. Unticking one enables them again.
3. `renderTable()` draws `#compare-table`: a header row with the product titles, then one row each for **Price**, **Rating**, **Brand** and **Stock**. Use `formatPrice` for the price.
4. Highlight the lowest price and the highest rating with the class `best` (only when 2 or more are selected).
5. With nothing ticked, the table is replaced by "Tick up to 3 products to compare".

**Plug it into our Checkout store:** a "Compare" checkbox on each product card, the ids kept in `state`, and a new `#/compare` route that draws the table.

## Exercise 04 — Product reviews

**Level:** Medium · **Time:** 40 min · **Folder:** `exercises/ex-04-product-reviews/`

Every DummyJSON product comes with a `reviews` array: `{ rating, comment, date, reviewerName }`. Show them on a product page.

The starter fetches product 1 and shows its title. Your job:

1. Write `getAverageRating(reviews)` — the average, rounded to 1 decimal (`4.0`). Zero reviews gives `0`.
2. Write `createStars(rating)` — `'★★★☆☆'` for 3: `'★'.repeat(…)` plus `'☆'.repeat(…)`. Give the element an `aria-label` like `3 out of 5 stars`, because screen readers can't read stars.
3. Show the summary in `#review-summary`: stars, the average, and `(3 reviews)` — or `(1 review)`.
4. Draw each review in `#review-list`: stars, the name, the date (via `Intl.DateTimeFormat`), and the comment.
5. The `#review-sort` select sorts by **Highest rating** or **Lowest rating**, without fetching again (sort a copy with `toSorted` or `[...reviews].sort`).

**Plug it into our Checkout store:** add the section to `renderProductPage` — the product object the page already fetched has `reviews`.

## Exercise 05 — Infinite scroll

**Level:** Hard · **Time:** 45 min · **Folder:** `exercises/ex-05-infinite-scroll/`

Our Checkout store uses page numbers. Some shops load more products automatically as you scroll down instead. Build that here.

**One new tool: `IntersectionObserver`.** It tells you when an element scrolls into view — no scroll listener firing hundreds of times a second:

```js
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) console.log('The sentinel is on screen!');
});
observer.observe(document.querySelector('#sentinel'));
```

`#sentinel` is an empty `div` at the bottom of the list. When it scrolls into view, it's time to load more.

The starter has `fetchPage(skip)` and `createCard(product)`. Your job:

1. Keep state: `skip` (how many are loaded), `total` (from the API), and `isLoading`.
2. `loadMore()`: if already loading, or everything is loaded, do nothing. Otherwise set `isLoading`, show `#status` "Loading…", fetch 12 more, append their cards, update `skip` and `total`, and clear `isLoading` in a `finally`.
3. Observe the sentinel and call `loadMore()` when it's on screen (that also loads the first 12).
4. When `skip >= total`: stop observing (`observer.disconnect()`) and show "You've seen all 194 products".
5. If a fetch fails: show "Couldn't load more. Scroll to try again." and let the next scroll retry.
6. Watch out: the observer only fires when the sentinel **changes** from off-screen to on-screen. On a tall window, the sentinel can still be visible after a load, and then nothing happens. After each load, `observer.unobserve(sentinel)` then `observer.observe(sentinel)` makes it check again.

**Plug it into our Checkout store:** it'd replace pagination on the home page — but think first: what happens to the URL state from step 11, and to the Back button? That trade-off is why we chose pages.

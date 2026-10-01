# Assignment: Product Grid

**Module 9 · The DOM** · Time: about 1½ hours

## Why this assignment?
Your first real shop page, drawn entirely from data. It's the same structure as the Checkout store's shop page: an array of product objects becomes a grid of cards — safely escaped, with discounts, ratings and stock labels.

## What you'll build
The starter has 8 products (shaped like the DummyJSON data) and three empty containers: `#category-summary`, `#top-rated` and `#product-grid`. Fill them all with JavaScript:

- **All products**: a card for every product, and a count above the grid: `8 products`.
- **Top rated**: the 3 highest-rated products, using the **same** card function.
- **Category summary**: `electronics: 3`, `accessories: 2`, `home: 2`, `sports: 1`.

## Getting started
Open `assignment/starter/` with Live Server. Don't change `index.html` or `style.css` — everything happens in `script.js`.

## Requirements
1. **Helpers**: `escapeHTML(text)`, `formatPrice(amount)` → `$27.00`, `getDiscountedPrice(product)` (rounded to cents) and `getStars(rating)` → `★★★★☆`.
2. **`createProductCardHTML(product)`** returns one `<li class="product-card">` with:
   - `data-product-id`,
   - an image: `https://dummyjson.com/image/240x160/f3ece3/7a5c3a?text=` followed by the title (use `encodeURIComponent`), with a proper `alt`,
   - the category (as a `.badge`) and the title (`h3`),
   - the sale price — and, only when there's a discount, the old price crossed out (`<s class="old-price">`) and a `-15%` badge,
   - the stars and the rating number, with an `aria-label` like `Rated 4.3 out of 5`,
   - a stock label: `Sold out`, `Only 3 left` (under 5), or `25 in stock`,
   - the extra class `sold-out` when the stock is 0.
   Every piece of text from the data must go through `escapeHTML`.
3. **`renderProducts(container, list)`** draws any list into any container with `map` + `join` + `innerHTML`, and shows `No products to show.` for an empty list.
4. **Top rated**: `toSorted` + `slice`, drawn with `renderProducts`.
5. **Category summary**: count with a `Map`, draw with `createElement`, a `DocumentFragment` and `replaceChildren`.

## Acceptance checklist
- [ ] 8 cards in the grid, 3 in Top rated (Headphones, Leather Wallet, USB-C Charger), and `8 products` above the grid.
- [ ] 5 products show a crossed-out old price; 3 don't.
- [ ] Leather Wallet and Headphones are faded and say `Sold out`; Water Bottle says `Only 3 left`.
- [ ] `renderProducts(productGrid, [])` in the Console shows the empty message.
- [ ] Changing a title in the data to `<b>Bold?</b>` shows the tags as text, not bold.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Card HTML | 7 | Every required part; discount only when there is one; stock rules |
| Safety | 3 | All data text escaped (including `alt`); image URL encoded |
| Rendering | 5 | One reusable `renderProducts`; empty state; count |
| Category summary | 3 | Map + `createElement` + fragment |
| Tidy code | 2 | Small helpers; clear names; no leftover test logs |

## Stretch goals
- Show a `Free delivery` badge on products that cost $50 or more after the discount.
- Show each category's total stock next to its count: `electronics: 3 (67 in stock)`.
- Add a "Sold out" section at the bottom, listing only the sold-out products.

## Remember
Try for at least 30 minutes before watching the solution video.

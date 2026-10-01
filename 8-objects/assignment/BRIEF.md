# Assignment: Cart Logic

**Module 8 · Objects** · Time: about 1½ hours

## Why this assignment?
This is a **warm-up for the Checkout store's cart**. In Module 15 you'll build the real cart for our Checkout app — and its logic is almost exactly what you write here: the same function names, the same rules, the same "always return a new cart" approach. Get it working in the Console now, and the capstone cart will feel familiar.

## What you'll build
A shopping cart that lives in the Console — no web page yet. The cart is an **array of item objects**, and every change goes through a small function that returns a **new** cart.

```text
--- Cart: 8 items (Standard) ---
3 × Wireless Mouse    $59.97
2 × Desk Lamp         $54.00
3 × Water Bottle      $37.50
Items:                $151.47
Delivery:             FREE
Total:                $151.47
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has a comment for each part.

## Requirements
1. **Settings**: `FREE_DELIVERY_THRESHOLD = 100` and a `DELIVERY_OPTIONS` lookup table: standard ($5, free from $100) and express ($15, never free). A small `catalogue` of at least 3 products with `id`, `title`, `price` (dollars) and `stock`.
2. **Changing the cart** — each function takes the cart and returns a NEW cart (never change the old one):
   - `addToCart(cart, product, quantity = 1)` — adds a new item, or increases the quantity of one already in the cart. The quantity can never go above the product's `stock`.
   - `removeFromCart(cart, productId)`.
   - `updateQuantity(cart, productId, quantity)` — sets an exact quantity, kept between 1 and the stock.
3. **Numbers**:
   - `getItemCount(cart)` — total quantity (2 mice + 1 lamp = 3).
   - `getLineTotal(item)` — price × quantity, rounded to cents.
   - `getDeliveryFee(amount, deliveryOptionId = 'standard')` — 0 for an empty cart; unknown ids fall back to standard.
   - `getCartTotals(cart, deliveryOptionId = 'standard')` — returns an **object**: `{ itemsTotal, deliveryFee, total, amountToFreeDelivery }`.
4. **Printing**: `printCart(cart, deliveryOptionId = 'standard')` prints the cart like the example, plus `Add $27.53 more for free standard delivery.` when there's still some way to go. It's the only function that logs.
5. Use `find`, `filter`, `map`, `reduce`, spread and destructuring. `===` only, single quotes, semicolons, no errors.

## Acceptance checklist
- [ ] Adding a product twice gives ONE line with the quantities added together.
- [ ] Adding 10 of a product with a stock of 3 gives 3.
- [ ] `updateQuantity(cart, id, 0)` gives 1; `updateQuantity(cart, id, 99)` gives the stock.
- [ ] Standard delivery is free from $100 of items; express always costs $15; an empty cart's delivery is $0.
- [ ] Keeping a reference to an old cart (`const old = cart;`) and then adding to `cart` does NOT change `old`.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Changing the cart | 7 | All three functions correct, stock limits respected, always a new cart |
| Numbers | 6 | Counts, line totals, delivery rules and the totals object all correct |
| Printing | 3 | Neat, lined-up output; the free-delivery nudge |
| Tidy code | 4 | Settings as constants, a lookup table, destructuring, only `printCart` logs |

## Stretch goals
- Add `discountPercentage` to products, and make `getCartTotals` also return `subtotal` (original prices) and `discount` (how much the customer saves).
- Add `clearCart()` and `getQuantityInCart(cart, productId)`.
- Save the cart as JSON with `JSON.stringify`, then load it back with `JSON.parse` and print it again.

## Remember
Try for at least 30 minutes before watching the solution video.

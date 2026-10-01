# Challenge: Cart logic

**Time:** about 40 min

Build the logic behind a shopping cart — no web page, just the Console. This is a warm-up for our store's real cart in Module 15.

Start from the `catalogue` in the starter, and write small functions that **return a new cart** instead of changing the old one:

1. `addToCart(cart, productId, quantity = 1)` — adds the product, or increases its quantity if it's already in the cart. Never more than the product's `stock`.
2. `removeFromCart(cart, productId)`.
3. `getCartTotals(cart)` — returns `{ itemCount, subtotal, delivery, total }`. Delivery is **$5**, and **free from $100**. An empty cart has no delivery.
4. Print a short summary after each change.

**What you should see in the Console:**

```text
Added 2 T-shirts: 2 items, $50 + $5 delivery = $55
Asked for 5 sneakers (only 2 in stock): 4 items, $210 + $0 delivery = $210
Removed the sneakers: 2 items, $50 + $5 delivery = $55
Empty cart: 0 items, $0 + $0 delivery = $0
```

# Challenge: Mini shop with routes

**Time:** about 45 min

Build a tiny three-page shop in ONE HTML file, split into modules:

1. `format.js` exports `formatPrice(dollars)`, using ONE `Intl.NumberFormat` for US dollars.
2. `products.js` exports a `Product` class (`title`, `price`, `getLabel()` → `'Backpack — $49.99'`) and a `products` array of three products: Backpack $49.99, Sneakers $89.50, Mug $12.99.
3. `main.js` is a hash router:
   - `#/` → heading `Shop` and a list of every product's label, each one a link to `#/product/<index>`.
   - `#/product/1` → heading `Sneakers` and the price `$89.50`.
   - `#/about` → heading `About us`.
   - Anything else → heading `Page not found`.
4. Route on `hashchange` AND on first load. Move the focus to the new heading.

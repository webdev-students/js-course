# Challenge: Product grid

**Time:** about 40 min

Turn the `products` array in the starter into a product grid:

1. Write `createProductCardHTML(product)` — the title, the category as a badge, the price as `$19.99`, and `Sold out` or `In stock`. Escape every piece of text.
2. Write `renderProducts(list)` that fills `#product-grid` and sets `#result-count` to `6 products` (or `1 product`). An empty list shows `No products found.`
3. Show all products, with sold-out cards given the class `sold-out`.
4. Change the heading to `6 products — $149.94 in total` (build the text from the data; don't type the numbers).
5. **Stretch:** show only the in-stock products, cheapest first.

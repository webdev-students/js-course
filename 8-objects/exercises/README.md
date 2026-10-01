# Module 8: Objects — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Product object

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-01-product-object/`

1. Create a `product` object for a phone with: `title` (`'Pixel 8'`), `brand` (`'Google'`), `price` (`129.99`), `stock` (`14`), `colours` (an array: `'black'`, `'gold'`, `'blue'`) and `isNew` (`true`).
2. Print one sentence: `Pixel 8 by Google — $129.99 (3 colours)`.
3. A customer buys two: take 2 off `stock`.
4. The price drops by 10%: update `price` (rounded to 2 decimal places, as a number).
5. Add a new property `rating` of `4.4`, and delete `isNew`.
6. Print the whole object with `console.log`, and then with `JSON.stringify(product, null, 2)`.

**Expected output in the Console:**

```text
Pixel 8 by Google — $129.99 (3 colours)
{title: 'Pixel 8', brand: 'Google', price: 116.99, stock: 12, colours: Array(3), …}
{
  "title": "Pixel 8",
  "brand": "Google",
  "price": 116.99,
  "stock": 12,
  "colours": [
    "black",
    "gold",
    "blue"
  ],
  "rating": 4.4
}
```

## Exercise 02 — Dynamic keys

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-dynamic-keys/`

A sign-up form sends its fields one at a time, as a **field name** and a **value**.

1. Start with an empty object: `const formData = {};`.
2. Write `updateField(fieldName, value)` that stores the value under that field name (bracket notation!).
3. Call it for `'fullName'` → `'Amy Osborn'`, `'email'` → `'AMY@Example.com'`, `'city'` → `'Edinburgh'`.
4. Write `getField(fieldName)` that returns the value, or `'(not filled in)'` if that field doesn't exist yet (`Object.hasOwn` or `??`).
5. Make a **lookup table** of cleaning rules: `const cleaners = { email: (text) => text.trim().toLowerCase(), fullName: (text) => text.trim() };`. Change `updateField` so that, if there's a cleaner for this field, the value is cleaned before it's stored: `cleaners[fieldName]`.
6. Print `getField('email')`, `getField('phone')` and the whole `formData`.

**Expected output in the Console:**

```text
amy@example.com
(not filled in)
{fullName: 'Amy Osborn', email: 'amy@example.com', city: 'Edinburgh'}
```

## Exercise 03 — Student methods

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-03-student-methods/`

Create a `student` object with `name` (`'Claire'`), `scores` (an empty array), and these **methods** (use the method shorthand and `this`):

- `addScore(score)` — adds a score to `this.scores`. Ignore anything that isn't a number from 0 to 100 (print a warning with `console.warn` instead).
- `getAverage()` — returns the average of the scores rounded to 1 decimal place, or `0` if there are no scores.
- `getBest()` — returns the highest score, or `null` if there are none.
- `report()` — returns a string like `Claire: 3 scores, average 82.3, best 95`.

Then: add the scores `72`, `95`, `80` and `140` (which should be rejected), and print `student.report()`.

**Bonus:** answer in a comment — why must these methods NOT be arrow functions?

**Expected output in the Console:**

```text
⚠️ Ignored score: 140
Claire: 3 scores, average 82.3, best 95
```

## Exercise 04 — Object entries report

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-object-entries-report/`

A shop recorded its monthly sales (in dollars) in an object:

```js
const monthlySales = { Jan: 8200, Feb: 6400, Mar: 9100, Apr: 0, May: 11500, Jun: 7300 };
```

Using `Object.keys`, `Object.values`, `Object.entries` and `Object.fromEntries`:

1. Print how many months are recorded, and the total sales for all of them.
2. Print a line per month, like `Jan  $8200  ████████` — one `█` for every full $1,000.
3. Print the best month's name and amount (hint: sort the entries by value).
4. Print the names of any months with no sales.
5. Make a NEW object `salesInThousands` where every value is divided by 1000 — using `Object.fromEntries` — and print it.

**Expected output in the Console:**

```text
6 months, total $42500
Jan  $8200   ████████
Feb  $6400   ██████
Mar  $9100   █████████
Apr  $0      
May  $11500  ███████████
Jun  $7300   ███████
Best month: May ($11500)
No sales in: Apr
{Jan: 8.2, Feb: 6.4, Mar: 9.1, Apr: 0, May: 11.5, …}
```

## Exercise 05 — Nested address

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-nested-address/`

The starter has a `customer` object with a nested `addresses` object (home and office), and an `orders` array.

1. Print the customer's full name and home city.
2. Print the street of the office address.
3. The customer moved: change the home street to `'22 Awolowo Road'` and the home city to `'Ikoyi, London'`.
4. Add a `phones` object to the customer with `mobile: '0770 123 4567'`.
5. Write `formatAddress(address)` (destructure the parameter!) that returns `'22 Awolowo Road, Ikoyi, London'`, and use it for both addresses.
6. Print the total of all their orders, and the date of their most recent order (the last one in the array).

**Expected output in the Console:**

```text
Ethan Ortiz lives in Soho, London.
Office street: 1 Marina
Home: 22 Awolowo Road, Ikoyi, London
Office: 1 Marina, London Island
Mobile: 0770 123 4567
Orders total: $183.75 | latest order: 2026-09-03
```

## Exercise 06 — Filter products

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-06-filter-products/`

The starter has an array of 8 product objects, shaped like the DummyJSON data the Checkout store uses.

Write these functions. Each takes the `products` array and **returns** a result (no logging inside):

1. `getByCategory(products, category)` — the products in that category.
2. `searchByTitle(products, text)` — products whose title includes the text, ignoring capitals.
3. `getInPriceRange(products, min, max)` — products with `min <= price <= max`, cheapest first.
4. `getDiscountedPrice(product)` — the price after `discountPercentage`, rounded to 2 decimal places.
5. `getCardLabels(products)` — labels like `'Desk Lamp — $22.95 (15% off)'` (use a destructured parameter in the `map` callback).

Then print, using `console.table` or `join`:
- the beauty products' titles,
- the search results for `'phone'`,
- the card labels for products between $10 and $30.

**Expected output in the Console:**

```text
Beauty: Essence Mascara, Red Lipstick, Face Cream
Search "phone": iPhone Case, Phone Stand, Headphones
Red Lipstick — $12.99
iPhone Case — $13.05 (10% off)
Face Cream — $21.49
Desk Lamp — $22.95 (15% off)
```

## Exercise 07 — Safe access

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-07-safe-access/`

Real API data has gaps. The starter has three orders — and some of them are missing parts: no customer phone, no address, no items, `null` discount.

Write `getOrderSummary(order)` that **returns** one line per order and never crashes:

```text
CHK-1 | Amy | Edinburgh | 2 items | first: Ring | discount: 0% | phone: 0770 111 2222
```

Rules:
- Missing city → `'city unknown'`. Missing or empty items → `0 items` and `first: none`.
- Missing phone → `'no phone'`. `null` or missing discount → `0%` — but a real `0` discount must also show `0%`, and `10` must show `10%`.
- Use `?.` and `??` — **no** `if` statements.

Then print the summary for all three orders with `map` and `join('\n')`.

**Expected output in the Console:**

```text
CHK-1 | Amy | Edinburgh | 2 items | first: Ring | discount: 0% | phone: 0770 111 2222
CHK-2 | Tyler | city unknown | 0 items | first: none | discount: 0% | phone: no phone
CHK-3 | Claire | Kyoto | 0 items | first: none | discount: 10% | phone: no phone
```

## Exercise 08 — Unique categories

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-08-unique-categories/`

Build the data behind a shop's **category menu** from a list of products (in the starter).

1. `getCategories(products)` — the unique category names, sorted A → Z. Use a `Set`.
2. `countByCategory(products)` — a `Map` from category → number of products. Loop once with `for…of`, using `get`/`set`.
3. `formatCategoryName(slug)` — turns `'mobile-accessories'` into `'Mobile Accessories'` (split, map, join).
4. Print the menu, one line per category, like `Mobile Accessories (3)`, using your three functions.
5. Print how many categories there are, and whether there's a `'furniture'` category (`has`).
6. **Stretch:** make `countByCategory` return a plain object instead, using `Object.fromEntries(map)` — and explain in a comment why you might want an object rather than a Map (hint: JSON).

**Expected output in the Console:**

```text
Beauty (3)
Furniture (1)
Home Decoration (2)
Mobile Accessories (3)
Categories: 4 | has furniture? true
{"beauty":3,"mobile-accessories":3,"home-decoration":2,"furniture":1}
```

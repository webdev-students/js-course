# Module 8 quiz — Objects

**1. `const product = { title: 'Lamp', price: 27 };` — which line reads the price?**
A) `product[price]` · B) `product.price` · C) `product(price)` · D) `price.product`

**2. `const key = 'title';` — what does `product.key` give, and what does `product[key]` give?**
A) `'Lamp'` and `'Lamp'` · B) `undefined` and `'Lamp'` · C) `'Lamp'` and `undefined` · D) An error and `'Lamp'`

**3. Inside a method called as `cart.getTotal()`, what is `this`?**
A) The `getTotal` function · B) `cart` · C) `undefined` · D) The whole page

**4. What does `Object.entries({ a: 1, b: 2 })` give?**
A) `['a', 'b']` · B) `[1, 2]` · C) `[['a', 1], ['b', 2]]` · D) `{ a: 1, b: 2 }`

**5. `const stock = { belts: 0 };` — what do `Boolean(stock.belts)` and `Object.hasOwn(stock, 'belts')` give?**
A) `true`, `true` · B) `false`, `false` · C) `false`, `true` · D) `true`, `false`

**6. `const { deliveryOption, ...customer } = { name: 'Amy', city: 'Edinburgh', deliveryOption: 'express' };` — what is `customer`?**
A) `'express'` · B) `{ name: 'Amy', city: 'Edinburgh' }` · C) `{ deliveryOption: 'express' }` · D) `['Amy', 'Edinburgh']`

**7. What does `{ ...{ theme: 'light', size: 12 }, theme: 'dark' }` give?**
A) `{ theme: 'light', size: 12 }` · B) `{ theme: 'dark', size: 12 }` · C) `{ theme: 'dark' }` · D) An error

**8. `const user = {};` — what does `user.address?.city ?? 'Unknown'` give?**
A) An error · B) `undefined` · C) `'Unknown'` · D) `null`

**9. `const a = { n: 1 }; const b = a; b.n = 2;` — what is `a.n`?**
A) `1` · B) `2` · C) `undefined` · D) An error

**10. What does `JSON.stringify({ title: 'Lamp', getLabel() { return 'x'; } })` give?**
A) `'{"title":"Lamp","getLabel":"x"}'` · B) `'{"title":"Lamp"}'` · C) `'{title: "Lamp"}'` · D) An error

# Module 12: Async JS & APIs — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Delayed greeting

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-delayed-greeting/`

Practise the order of async code.

1. Log `1. Welcome!` straight away.
2. Log `3. Your table is ready.` after 1 second (`setTimeout`).
3. Log `2. Please wait a moment…` straight away, AFTER setting the timer (it must still appear second).
4. Log `4. Here's your menu.` half a second after the table is ready — start that timer INSIDE the first timer's callback.
5. Finally, add a `setTimeout(…, 0)` that logs `2b. (a zero-delay timer)` and predict, in a comment, where it appears.

**Expected output in the Console:**

```text
1. Welcome!
2. Please wait a moment…
2b. (a zero-delay timer)
3. Your table is ready.
4. Here's your menu.
```

## Exercise 02 — Stopwatch

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-02-stopwatch/`

Build a stopwatch with **Start**, **Stop** and **Reset**:

1. The display shows seconds with one decimal place: `0.0`, `0.1` … `12.3`.
2. **Start** begins counting (update every 100ms with `setInterval`). Don't start a second interval if it's already running!
3. **Stop** pauses it; **Start** again continues from where it stopped.
4. **Reset** stops it and goes back to `0.0`.
5. Be accurate: don't count ticks — store the time you started (`Date.now()`) and work out the elapsed time on each tick.
6. Disable **Start** while running and **Stop** while stopped.

## Exercise 03 — Promise wrapper

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-promise-wrapper/`

The starter has an old-style callback function, `loadStock(productId, callback)`, that calls `callback(error, stock)` after a delay (products over 100 don't exist).

1. Write `loadStockPromise(productId)` that WRAPS it in a `new Promise`: resolve with the stock, or reject with the error.
2. Write `wait(ms)` that returns a promise resolved after `ms` milliseconds.
3. Write an async function `checkProducts()` that:
   - awaits the stock of product 7 and logs `Product 7: 9 in stock`,
   - waits 300ms,
   - tries product 999 inside `try` / `catch` and logs `Product 999: not found`,
   - loads products 1, 2 and 3 **at the same time** with `Promise.all` and logs the total stock.
4. Log `Done` in a `finally` block.

**Expected output in the Console:**

```text
Product 7: 9 in stock
Product 999: not found
Products 1–3: (3) [7, 14, 1] | total: 22
Done
```

## Exercise 04 — Fetch a user

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-fetch-a-user/`

DummyJSON also has practice **users**: `https://dummyjson.com/users/1`.

1. Write a `request(path)` helper (like lesson 12.9): fetch, check `response.ok`, throw an error with `error.status`, return the JSON.
2. Write `showUser(id)` that loads a user and fills in the card: full name, email, age, and city (`user.address.city`). Use `textContent`.
3. The **Load user** form takes an id. Show `Loading…` while waiting; disable the button while loading.
4. For a user that doesn't exist (try 9999), show `No user with id 9999.`; for other errors, `Something went wrong.`
5. Tip: use `select` in the address to get only the fields you need: `?select=firstName,lastName,email,age,address`.

## Exercise 05 — Posts with states

**Level:** Medium · **Time:** 30 min · **Folder:** `exercises/ex-05-posts-with-states/`

Load blog posts from JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5`) with all four states from lesson 12.10:

1. A state object: `{ status: 'loading' | 'success' | 'error', posts: [], errorMessage: '' }`, and a `render()` that shows ONE of: loading (`Loading posts…` and `aria-busy="true"` on the list), error (a message and a **Try again** button, with `role="alert"`), empty (`No posts yet.`), or the posts (title in an `<h3>`, body in a `<p>` — escaped, or built with `textContent`).
2. `loadPosts(userId)` sets loading, fetches, then success or error.
3. A **User** select (users 1, 2 and 42 — user 42 has no posts) reloads the posts for that user.
4. Test the error state by changing the address to `https://jsonplaceholder.typicode.com/wrong`.

## Exercise 06 — Build a query string

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-06-build-query-string/`

Write `buildProductsUrl(options)` that returns the right DummyJSON address for the Checkout store's shop page. `options` has `search`, `category`, `page`, `pageSize`, `sortBy` and `order` — any of them may be missing.

Rules (they're the rules in the Checkout store's `api.js`):
- A search uses `/products/search` with `q`. Otherwise a category uses `/products/category/<category>` (encoded). Otherwise `/products`.
- Always send `limit` (the page size, default 12) and `skip` (from the page number, default 1).
- Only send `sortBy` and `order` when `sortBy` is given.
- Always send `select=id,title,price` (it gets encoded as `id%2Ctitle%2Cprice`).

Test it with the cases in the starter and compare with the expected output.

**Expected output in the Console:**

```text
https://dummyjson.com/products?limit=12&skip=0&select=id%2Ctitle%2Cprice
https://dummyjson.com/products?limit=12&skip=24&select=id%2Ctitle%2Cprice
https://dummyjson.com/products/search?limit=12&skip=0&select=id%2Ctitle%2Cprice&q=red+lipstick+%26+gloss
https://dummyjson.com/products/category/mens-shirts?limit=6&skip=0&select=id%2Ctitle%2Cprice&sortBy=price&order=desc
```

## Exercise 07 — Create a post

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-07-create-post/`

A "Share a product review" form that POSTs to JSONPlaceholder (`https://jsonplaceholder.typicode.com/posts`).

1. Validate first: the title must be at least 3 characters (show an error with `aria-invalid`, like Module 10).
2. While sending: disable the button and change its text to `Sharing…`; restore it in `finally`.
3. Send `{ title, body, userId: 1 }` as JSON, with the `Content-Type` header.
4. On `201`, add the new post to the TOP of the list on the page (`prepend`), showing the id the server gave it: `#101 Great watch`.
5. On failure, show `Couldn't share your review. Please try again.`

## Exercise 08 — Debounced search

**Level:** Hard · **Time:** 35 min · **Folder:** `exercises/ex-08-debounced-search/`

A product search box — like the Checkout store's — built from everything in Module 12:

1. `debounce(fn, delay)` — search 400ms after the user stops typing.
2. Empty text (after `trim`) → clear the results and show nothing; don't send a request.
3. Show `Searching…` while waiting, then `23 results for "phone"` (the API's `total`) and the first 5 titles with their prices — or `No products match "xyzzy".`
4. Ignore stale answers with a request counter (`latestRequestId`).
5. Handle errors with a friendly message.
6. Use `URLSearchParams` for `q`, `limit` and `select`.

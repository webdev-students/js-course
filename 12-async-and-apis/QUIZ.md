# Module 12 quiz — Async JS & APIs

**1. In what order do these log?** `console.log('A'); setTimeout(() => console.log('B'), 0); console.log('C');`
A) A B C · B) A C B · C) B A C · D) C A B

**2. Which runs first once the current code has finished: a `.then` callback, or a `setTimeout(…, 0)` callback?**
A) The timeout · B) The `.then` callback (the microtask queue is emptied first) · C) Whichever was written first · D) They run at the same time

**3. What does an `async` function always return?**
A) `undefined` · B) The value you `return` · C) A promise · D) A string

**4. `const data = response.json();` — what's wrong?**
A) Nothing · B) It's missing `await`: `json()` returns a promise · C) It should be `JSON.parse(response)` · D) `json` should be in capitals

**5. `fetch` gets a 404 response. What happens?**
A) `fetch` rejects · B) `fetch` resolves normally — you must check `response.ok` · C) The page reloads · D) It retries automatically

**6. Which status code means "the server had a problem"?**
A) 200 · B) 201 · C) 404 · D) 500

**7. How do you send JSON in a POST request?**
A) `fetch(url, { body: data })` · B) `fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })` · C) `fetch.post(url, data)` · D) `fetch(url + JSON.stringify(data))`

**8. You need a product AND the category list, which don't depend on each other. What's fastest?**
A) `await` one, then `await` the other · B) `await Promise.all([getProduct(), getCategories()])` · C) Use `setTimeout` · D) Load the whole page again

**9. What does debouncing a search box do?**
A) Searches on every keystroke · B) Waits until the user stops typing for a moment, then searches once · C) Stops the user typing · D) Caches every result

**10. Where should a secret API key go?**
A) In your JavaScript file · B) In localStorage · C) On a server you control — never in front-end code · D) In an HTML comment

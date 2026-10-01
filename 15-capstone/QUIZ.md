# Module 15 quiz — Capstone: the Checkout store

**1. Why does our Checkout store keep the brand name in `APP_NAME` in `config.js`?**
A) It's required by JavaScript · B) So renaming the store is one line, and the name never gets out of sync · C) To make it private · D) For speed

**2. Which file is the ONLY one allowed to talk to localStorage?**
A) `main.js` · B) `storage.js` · C) `cart.js` · D) Every file

**3. The URL is `#/?q=phone&page=2`. Why keep search and page in the URL?**
A) It's faster · B) Refresh, Back, bookmarks and shared links all show the same results · C) The API needs it · D) To hide them

**4. Why does live search wait until you stop typing (debounce)?**
A) To look smooth · B) To avoid sending a request for every single key press · C) Because fetch is slow · D) It's required by DummyJSON

**5. Two searches are sent; the OLDER answer arrives last. What does our store do?**
A) Shows the older results · B) Crashes · C) Ignores it — each request has a number, and stale answers are thrown away · D) Sends a third request

**6. Why is `cart.js` written with no HTML at all?**
A) HTML is slow · B) Pure logic is easy to test in the Console and reuse on any page · C) Modules can't use HTML · D) No reason

**7. How is the cart total worked out?**
A) A `for...in` loop · B) `reduce` over the cart items · C) `Math.sum` · D) The API does it

**8. What does the focus trap in the cart drawer do?**
A) Stops the mouse · B) Keeps Tab and Shift+Tab inside the open drawer; Escape closes it and focus returns to the button · C) Hides the drawer · D) Locks the page scroll

**9. Why does GitHub Pages need no special setup for our routes like `#/cart`?**
A) GitHub knows our app · B) The part after `#` never goes to the server, so it only ever serves `index.html` · C) We added a config file · D) It doesn't work

**10. Showing prices in euros instead of dollars takes…**
A) Rewriting every price · B) Three constants: `CURRENCY`, `LOCALE` and `EXCHANGE_RATE` — every price goes through `formatPrice` · C) A new API · D) It's impossible

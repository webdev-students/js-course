# 🛒 Checkout: a practice e-commerce store

**Checkout** is a complete online store front end built with **plain JavaScript**: no frameworks,
no build tools. It's the final project of our JavaScript course.

> ⚠️ **This is a practice project.** There is **no real backend and no real payment**.
> Products come from [DummyJSON](https://dummyjson.com/docs/products), a free practice API.
> Your cart, wishlist, orders and theme are saved **in your own browser** (localStorage).
> The payment step only *checks the format* of a card number. Nothing is sent anywhere.

![Screenshot of the shop page](docs/screenshot-shop.png)
<!-- 📸 Screenshot placeholder: add your own images to a docs/ folder -->

---

## Features

- 🛍️ **Product listing**: cards with image, title, price, rating and discount badge
- 📄 **Pagination** using the API's `limit` and `skip` (page numbers + Prev/Next)
- 🔍 **Live search** that waits until you stop typing (debounced)
- 🗂️ **Filter** by category (loaded from the API) and by price range; **sort** by price, rating or name
- 🔗 **Shareable URLs**: search, filters, sort and page live in the address bar (`URLSearchParams`)
- 🖼️ **Product page**: image gallery with thumbnails, description, stock status, quantity picker, related products
- 🧺 **Cart drawer + cart page**: change quantity (never more than the stock), remove, empty cart, item badge
- 🧮 **Totals with `reduce`**: subtotal, discount, delivery fee (free standard delivery over $100), total
- 💵 **Money formatting** with `Intl.NumberFormat`; currency lives in one config constant
- ♡ **Wishlist** with its own page
- 📝 **Checkout page** with full validation and accessible inline error messages, plus an order summary
- 🧪 **Simulated payment** (clearly labelled as fake), then an **order confirmation** with an order ID
- 📦 **Order history** saved in localStorage
- 💾 Everything **persists across refreshes**, and broken or missing saved data is handled safely
- 🔔 **Toast notifications**, **loading skeletons**, **error states with Retry**, **empty states**
- 🌙 **Dark/light theme** (saved)
- ♿ **Keyboard accessible**: focus trap in the cart drawer and dialog, Escape closes, visible focus, skip link
- 📱 **Responsive** from phones to desktops

## Run it locally

ES modules (`<script type="module">`) **don't work from `file://`**. You need a small local web server.

1. Open this `final/` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. The store opens at something like `http://127.0.0.1:5500/index.html#/`.

You need an internet connection: the products come from `https://dummyjson.com`.

### Try this

| Try | What should happen |
|-----|--------------------|
| Type `phone` in Search | Results update after you stop typing; the URL becomes `#/?q=phone` |
| Pick a category, set a price range, sort | The URL keeps everything. Refresh and it's all still there |
| Open a product, click a thumbnail | The big image changes |
| Add to cart, open the cart (top right) | Press **Tab** repeatedly: focus never leaves the drawer. **Escape** closes it |
| Checkout page → press *Continue* with an empty form | Inline errors appear and focus jumps to the first one |
| Payment → *Fill in the test card for me* → *Pay* | "Processing…", then the confirmation page with an order ID |
| Refresh anywhere | Cart, wishlist, orders and theme are all remembered |

## Project structure

```
final/
  index.html            the page shell: header, <main>, footer, cart drawer, dialog, toasts
  css/style.css         all styles (light + dark themes via CSS variables)
  js/
    main.js             starts the app: theme, header, drawer, routes
    config.js           APP_NAME, currency, page size, delivery rules — all settings
    api.js              the only file that talks to DummyJSON
    storage.js          the only file that talks to localStorage / sessionStorage
    state.js            the single source of truth + subscribe()
    cart.js             cart rules + totals (pure functions, no HTML)
    wishlist.js         wishlist rules
    orders.js           turns the cart into an order
    validation.js       checkout + payment form rules
    router.js           tiny hash router (#/, #/product/12, #/cart ...)
    utils.js            formatPrice, debounce, escapeHTML and other helpers
    ui/                 everything that draws on the page
      header.js  productList.js  productCard.js  filters.js  pagination.js
      skeletons.js  states.js  productDetail.js  cartDrawer.js  cartItem.js
      cartPage.js  orderTotals.js  orderSummary.js  wishlistPage.js
      checkoutPage.js  paymentStep.js  confirmationPage.js  ordersPage.js
      formErrors.js  modal.js  focusTrap.js  toast.js  theme.js
```

### Pages (hash routes)

| URL | Page |
|-----|------|
| `#/` | Shop (accepts `?q=`, `category=`, `min=`, `max=`, `sort=`, `page=`) |
| `#/product/:id` | Product detail |
| `#/cart` | Cart page |
| `#/wishlist` | Wishlist |
| `#/checkout` | Checkout page: delivery details (step 1 of 3) |
| `#/payment` | Simulated payment (step 2 of 3) |
| `#/order/:id` | Order confirmation (step 3 of 3) |
| `#/orders` | Order history |

### Saved data

| Key | Where | What |
|-----|-------|------|
| `checkout-app:cart` | localStorage | cart items |
| `checkout-app:wishlist` | localStorage | saved products |
| `checkout-app:orders` | localStorage | placed (demo) orders |
| `checkout-app:theme` | localStorage | `"light"` or `"dark"` |
| `checkout-app:checkout-details` | sessionStorage | delivery details between the checkout page and payment |

To reset everything: DevTools → **Application** → **Local storage** → delete the `checkout-app:` keys.

## Changing the currency

All prices from the API are US dollars. In `js/config.js`:

```js
export const CURRENCY = 'USD';
export const LOCALE = 'en-US';
export const EXCHANGE_RATE = 1;
```

For euros, change them to `'EUR'`, `'de-DE'` and an exchange rate such as `0.92`.
Every price in the app goes through `formatPrice()`, so nothing else needs to change.

## How a few things work

- **Prices:** we treat the API's `price` as today's price and work out the crossed-out "was" price
  from `discountPercentage`. That way the price you see is the price that sorting and filtering use.
- **Price filter:** the API can't filter by price, so when a price range is set we fetch every
  matching product (`limit=0`), filter them in the browser, and do the `skip`/`limit` page math ourselves.
- **Stale searches:** every product request gets a number; if an older request finishes after a
  newer one, its results are thrown away.
- **Security:** every piece of API text goes through `escapeHTML()` before it touches `innerHTML`.
  Only the last 4 digits of the (fake) card number are ever saved.

## Deploy

### GitHub Pages
1. Push this folder to a GitHub repository (`index.html` at the top level of the repo).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Pick the `main` branch and `/ (root)` → **Save**.
4. After a minute your store is live at `https://<your-username>.github.io/<repo-name>/`.

### Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this `final/` folder onto the page.
3. Netlify gives you a live URL straight away (you can rename it in *Site settings*).

Hash routing (`#/cart`) means no server configuration is needed on either host.

## Credits

- Product data and images: [DummyJSON](https://dummyjson.com) (free practice API)
- Built for our JavaScript course.

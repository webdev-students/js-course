# Assignment: Make It Yours

**Module 15 · Capstone** · Time: about 3 hours

## Why this assignment?
Our Checkout store is finished — now turn it into YOUR store. Changing an app you didn't just copy line by line is the best proof that you understand how it's built. And a store with your own name, colours and a feature nobody else has is a far better portfolio piece.

## Getting started
`assignment/starter/` is an exact copy of the finished Checkout store. Work in it, or in your own deployed store from lesson 15.37.

## Requirements
1. **A new name:** change `APP_NAME` in `js/config.js`. The logo, tab title and footer must all update — and the name must appear nowhere else in the code.
2. **Your currency:** show prices in the currency of your choice by changing `CURRENCY`, `LOCALE` and `EXCHANGE_RATE` (for euros: `'EUR'`, `'de-DE'`, e.g. `0.92`). Every price, total and delivery fee must use it.
3. **Your colour:** change `--color-primary` and `--color-primary-hover` for **both** themes. Check the contrast of button text with Lighthouse.
4. **One new feature**, in its **own module**, with any saved data going through `storage.js` (so the key starts with `checkout-app:`). Pick one:
   - **Recently viewed** products on the product page (see exercise 1).
   - **Coupon codes** on the cart page (see exercise 2).
   - **Compare** up to 3 products on a new `#/compare` route (see exercise 3).
   - **Reviews** on the product page (see exercise 4).
   - Your own idea — check it with the "one job per file" rule first.
5. Commit and push: your live site shows all four changes.

## Acceptance checklist
- [ ] The new name shows in the logo, the tab title and the footer (`© <year> <your name>`).
- [ ] Every price on every page uses your currency.
- [ ] Both themes use your accent colour; button text is readable.
- [ ] The new feature works, survives a refresh, and doesn't crash when its saved data is broken in DevTools.
- [ ] The new feature works with the keyboard only.
- [ ] The README describes YOUR store and its new feature, with the live link.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Name, currency, colour | 5 | All done through the config constants and CSS variables — nothing hard-coded |
| New feature | 8 | Works, own module, reuses existing UI pieces, handles empty and broken data |
| Accessibility | 3 | Keyboard works; headings, labels and focus make sense |
| README + deploy | 4 | Updated README, live link, clear commits |

## Stretch goals
- Convert the price filter's Min / Max boxes to your currency (divide by `EXCHANGE_RATE` before comparing).
- Do two new features instead of one.
- A "Clear history" button on the orders page, with a confirmation dialog built from `ui/modal.js`.

## Remember
Try for at least an hour before watching the solution video. The solution video shows **one** way to do it: Nova, euros, green, and "Recently viewed".

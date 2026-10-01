# Module 2: Values, Variables & Types — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Declare some variables

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-declare-variables/`

You're setting up a product for a shop. In `script.js`:

1. Make a **constant** for the product name: `'Canvas tote bag'`.
2. Make a **constant** for the price: `85`.
3. Make a variable for the number **in stock**: `12`. (Should it be `const` or `let`? It's going to change!)
4. Print: `Canvas tote bag costs 85` (use the variables, with a comma or a template literal).
5. Two bags are sold: take 2 away from the stock. Print `In stock: 10`.
6. A delivery of 5 arrives: add 5. Print `In stock: 15`.

**Expected output in the Console:**

```text
Canvas tote bag costs 85
In stock: 10
In stock: 15
```

**Check yourself:** if you made `inStock` a `const`, you got `TypeError: Assignment to constant variable.` — that's JavaScript telling you it needs to be `let`.

## Exercise 02 — typeof detective

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-02-typeof-detective/`

Be a detective. For each value below, **write your guess first** (in a comment), then check it with `typeof`.

`'Kyoto'` · `42` · `'42'` · `true` · `'false'` · `3.14` · `null` · `undefined` · `''` · `[1, 2, 3]`

Print each one as `value → type`, for example: `42 → number`. Which ones surprised you?

**Expected output in the Console:**

```text
Kyoto → string
42 → number
42 → string
true → boolean
false → string
3.14 → number
null → object
undefined → undefined
 → string
(3) [1, 2, 3] → object
```

The surprises: `'42'` and `'false'` are strings (quotes!), `typeof null` is `'object'` (a bug from 1995), and an array is an `'object'`. Notice the empty string prints as nothing before the arrow.

## Exercise 03 — A template-literal bio

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-03-template-literal-bio/`

Write a short bio using **one template literal over several lines**.

1. Make variables for: `firstName`, `lastName`, `city`, `yearsCoding` (a number), `favouriteColour`.
2. Build ONE template literal called `bio` that prints exactly this shape (with your own values):

```text
Name: Amy Osborn
From: Edinburgh
Coding for: 0 years (just starting!)
Favourite colour: Green
Next year I'll have 1 year of experience.
```

3. The last line must be **calculated** inside `${}` — don't type the number.
4. Print it with one `console.log(bio)`.

**Expected output in the Console:**

```text
Name: Amy Osborn
From: Edinburgh
Coding for: 0 years (just starting!)
Favourite colour: Green
Next year I'll have 1 year of experience.
```

**Stretch:** make the last line say "year" or "years" correctly — you'll learn the neat way (a ternary) in lesson 3.7.

## Exercise 04 — Clean up messy input

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-string-cleanup/`

A sign-up form collected this messy data (it's already in `script.js`):

- name: `'   bETH ahmed  '`
- email: `'  BETH.Ahmed@Mail.COM '`
- phone: `'0770 123 4567'`

Clean it up with string methods and print:

1. `Name: Beth Ahmed` — trimmed, first letters capital, the rest small. *(Hint: split into the two words with `split(' ')` after trimming, then fix each word with `[0].toUpperCase()` and `.slice(1).toLowerCase()`.)*
2. `Email: beth.ahmed@mail.com` — trimmed and all lower case.
3. `Phone: 07701234567` — no spaces.
4. `Initials: B.A.`
5. `Email valid: true` — true if the cleaned email includes `'@'` and ends with `'.com'`.

**Expected output in the Console:**

```text
Name: Beth Ahmed
Email: beth.ahmed@mail.com
Phone: 07701234567
Initials: B.A.
Email valid: true
```

Step 5 uses `&&` ("and"), which you'll learn properly in lesson 3.2 — it's `true` only if both sides are `true`.

## Exercise 05 — The shop receipt

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-price-calculator/`

A customer buys **3 pairs of insoles at $72.50 each** and **2 gold rings at $459.99 each**. There's **7.5% VAT** on the goods, and delivery costs **$25**.

In `script.js`, calculate and print a receipt with every amount shown to **2 decimal places**:

```text
Insoles: $217.50
Ring: $919.98
Subtotal: $1137.48
VAT (7.5%): $85.31
Delivery: $25.00
Total: $1247.79
```

Rules:
- Store the prices, quantities, VAT rate (`0.075`) and delivery fee in `const` variables.
- Round each money amount to 2 decimal places **as a number** with `Math.round(amount * 100) / 100` before adding things up.
- Use `toFixed(2)` only when **printing**.

**Expected output in the Console:**

```text
Insoles: $217.50
Ring: $919.98
Subtotal: $1137.48
VAT (7.5%): $85.31
Delivery: $25.00
Total: $1247.79
```

**Why round as we go?** Money is only ever whole cents. If you keep the tiny floating-point leftovers, they can add up and make a total one cent off. In Module 13 you'll format this with commas too: `$1,247.79`.

## Exercise 06 — Dice and discounts

**Level:** Medium · **Time:** 15 min · **Folder:** `exercises/ex-06-random-dice/`

Build the start of a little board game and a lucky-dip discount:

1. Roll **two dice** (each 1–6) and print them: `Dice: 4 and 2`.
2. Print their **total**: `Total: 6`.
3. Pick a **random discount between 5 and 25 percent** (both included): `Discount: 17%`.
4. A product costs $120. Print the **price after the discount**, rounded to the nearest dollar with `Math.round`: `Price after discount: $100`.

Refresh a few times — your numbers change every time, but they must always be in range. (The output below is one example run.)

**Expected output in the Console:**

```text
Dice: 1 and 6
Total: 7
Discount: 11%
Price after discount: $107
```

## Exercise 07 — Convert user input safely

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-convert-user-input/`

A form sent these four answers — all strings, because that's what forms (and `prompt`) always give you. They're already in `script.js`:

`'  3 '`, `'2 plates'`, `'abc'`, `''`

For **each** answer:
1. Convert it with `Number()` and print `Number('…') → …`.
2. Convert it with `Number.parseInt(…, 10)` and print `parseInt('…') → …`.
3. Print whether the `Number()` result is **NaN** with `Number.isNaN`.

Then answer in a comment: which conversion would you use for a quantity box, and why?

**Finally, the bug hunt.** This line is also in the starter. It's supposed to print `Total: 45`. Explain in a comment why it prints something else, then fix it:

```js
console.log('Total: ' + '3' * 10 + 15);
```

**Expected output in the Console:**

```text
Number('  3 ') → 3
Number('2 plates') → NaN
Number('abc') → NaN
Number('') → 0
parseInt('  3 ') → 3
parseInt('2 plates') → 2
parseInt('abc') → NaN
parseInt('') → NaN
NaN? false true true false
Total: 45
```

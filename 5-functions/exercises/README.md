# Module 5: Functions — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Greet function

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-greet-function/`

1. Write a function declaration `greet(name, timeOfDay)` that **returns** a greeting like `Good morning, Amy!`.
2. Call it three times with different names and times of day, and log each result.
3. What happens if you call `greet('Amy')` with no time of day? Write the answer as a comment.
4. **Stretch:** write a second function `greetEveryone(nameOne, nameTwo, nameThree, timeOfDay)` that logs a greeting for all three by **calling `greet`**.

**Expected output in the Console:**

```text
Good morning, Amy!
Good afternoon, Tyler!
Good evening, Claire!
Good undefined, Amy!
Good morning, Amy!
Good morning, Tyler!
Good morning, Claire!
```

## Exercise 02 — Area calculator

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-area-calculator/`

A tiler charges by the square metre. Write functions that **return** (not log) their answers:

1. `getRectangleArea(width, length)` → width × length.
2. `getCircleArea(radius)` → π × radius² (use `Math.PI` and `**`), **rounded to 2 decimal places** as a number (hint: `Math.round(x * 100) / 100`).
3. `getTilingCost(area, pricePerSquareMetre)` → the cost, rounded **up** to the nearest whole dollar (`Math.ceil`).
4. Use them together to print:

```text
Kitchen: 12 m² → $540
Round patio: 12.57 m² → $566
```

(The kitchen is 3 m × 4 m; the patio has a radius of 2 m; tiles cost $45 per m².)

**Expected output in the Console:**

```text
Kitchen: 12 m² → $540
Round patio: 12.57 m² → $566
```

## Exercise 03 — Dollar formatter

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-price-formatter/`

Prices like `1234567.5` are hard to read. Write `formatDollars(amount, showCents = true)` that **returns**:

| Call | Result |
|---|---|
| `formatDollars(1234567.5)` | `$1,234,567.50` |
| `formatDollars(4500)` | `$4,500.00` |
| `formatDollars(999)` | `$999.00` |
| `formatDollars(1234567.5, false)` | `$1,234,568` |

Plan it first (pseudocode as comments!). Suggested helper: `addCommas(digits)` takes a string of digits like `'1234567'` and returns `'1,234,567'`.

Hints for `addCommas`:
- Loop over the digits **from the end**, building a new string by adding each digit to the **front**.
- Every 3 digits (but not at the very start), add a comma to the front too.

For the cents: `toFixed(2)` gives a string like `'1234567.50'`; `split('.')` gives you the two parts.

(Real apps use `Intl.NumberFormat` for this — you'll meet it in the Checkout app. Building it yourself is great loop and function practice.)

**Expected output in the Console:**

```text
$1,234,567.50
$4,500.00
$999.00
$1,234,568
```

## Exercise 04 — Arrow conversions

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-04-arrow-conversions/`

The starter has five function declarations. Rewrite each one as an **arrow function stored in a `const`**, using an **implicit return** wherever the body is a single expression. Keep the same names, so the test lines at the bottom still work and print the same results.

Then answer in a comment: which one couldn't use an implicit return, and why?

**Expected output in the Console:**

```text
49
true false
Amy Osborn
true
Heavy item — extra fee / Standard shipping
```

## Exercise 05 — Discount callback

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-discount-callback/`

A shop runs different promotions on different days. Write:

1. `checkoutPrice(price, promotion)` — calls the `promotion` callback with the price, makes sure the result is never below **0**, rounds it to a whole number, and returns it.
2. Three promotion arrow functions:
   - `halfPrice` — 50% off,
   - `flat10Off` — $10 off,
   - `buyOverHundredSave15` — 15% off, but only if the price is $100 or more (otherwise the price is unchanged).
3. Print the price of a $120 item and an $8 item with each promotion, plus one **inline** arrow promotion of your own.

Expected (for the three named promotions):

```text
halfPrice: 60 / 4
flat10Off: 110 / 0
buyOverHundredSave15: 102 / 8
```

Notice that `flat10Off` on $8 gives `0`, not `-2` — that's `checkoutPrice`'s job, not the promotion's.

**Expected output in the Console:**

```text
halfPrice: 60 / 4
flat10Off: 110 / 0
buyOverHundredSave15: 102 / 8
inline: 118
```

## Exercise 06 — Counter closure

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-06-counter-closure/`

A shop needs a stock counter for each product, where the stock number can only be changed in allowed ways. A closure is perfect for that.

Write `makeStockCounter(startingStock)`. It keeps a private `stock` variable and returns **one** function that takes an **action** string:

- `stock('sell')` → takes one off the stock (but never below 0) and returns the new stock,
- `stock('restock')` → adds 10 and returns the new stock,
- `stock('check')` → returns the stock without changing it,
- anything else → returns `'Unknown action'`.

Test it:

```js
const ringStock = makeStockCounter(2);
console.log(ringStock('sell'));    // 1
console.log(ringStock('sell'));    // 0
console.log(ringStock('sell'));    // 0 — can't go below zero
console.log(ringStock('restock')); // 10
console.log(ringStock('check'));   // 10

const beltsStock = makeStockCounter(5);
console.log(beltsStock('check'));  // 5 — separate from ring
```

Then answer in a comment: why can't any other code change the stock number directly?

**Expected output in the Console:**

```text
1
0
0
10
10
5
Unknown action
```

## Exercise 07 — Factorial with recursion

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-factorial-recursion/`

The **factorial** of a whole number n (written n!) is n × (n − 1) × … × 1. So 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1.

1. Write `factorial(n)` **recursively**. What's the base case? Write it as a comment.
2. Write `factorialWithLoop(n)` with a `for` loop.
3. Test both with 0, 1, 5 and 10 (10! is 3628800).
4. Add a guard clause to both: if `n` is negative or not a whole number, return `NaN`.
5. How many ways can 6 people stand in a queue? (That's 6!.) Print the answer in a sentence.

**Expected output in the Console:**

```text
1 1 120 3628800
1 1 120 3628800
NaN NaN
6 people can stand in a queue in 720 different ways.
```

## Exercise 08 — Password strength

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-08-password-strength/`

Sign-up forms often show how strong a password is. Write `getPasswordStrength(password)` that returns `'Too short'`, `'Weak'`, `'Medium'` or `'Strong'`.

**Rules:**
- Fewer than 8 characters → `'Too short'` (whatever else it has).
- Otherwise, give 1 point for each of these it contains: a lower-case letter, a capital letter, a digit, a symbol (anything that isn't a letter or digit).
- 1–2 points → `'Weak'`, 3 points → `'Medium'`, 4 points → `'Strong'`.

**Do this in order:**
1. Write the pseudocode as comments first.
2. Write small helper functions: `hasLowerCase(text)`, `hasUpperCase(text)`, `hasDigit(text)`, `hasSymbol(text)`. Each returns true or false, using a `for…of` loop.
   - Hint: a character is lower-case if `character !== character.toUpperCase()`, and upper-case if `character !== character.toLowerCase()`.
3. Build `getPasswordStrength` from them.
4. Test with:

| Password | Expected |
|---|---|
| `'abc'` | Too short |
| `'password'` | Weak |
| `'Password1'` | Medium |
| `'Pa$$word1'` | Strong |
| `'12345678'` | Weak |

**Expected output in the Console:**

```text
abc → Too short
password → Weak
Password1 → Medium
Pa$$word1 → Strong
12345678 → Weak
```

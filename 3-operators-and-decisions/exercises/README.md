# Module 3: Operators & Decisions — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Even or odd?

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-even-or-odd/`

Use the remainder operator `%` from Module 2 to decide whether a number is even or odd.

1. Create `const number = 7;`.
2. With `if`/`else`, print `7 is odd` or `7 is even`. (A number is even when `number % 2 === 0`.)
3. Test it by changing `number` to `12`, `0` and `-3`. (Is `-3 % 2` equal to `1`? Try it! Why does checking `=== 0` still work?)

**Stretch:** do the same with a ternary inside one template literal.

**Expected output in the Console:**

```text
7 is odd
-1
7 is odd
```

## Exercise 02 — Age gate

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-age-gate/`

A cinema sells tickets for three kinds of films. Given an `age` and a `hasAdult` (true/false), print whether the customer can watch each film:

| Film rating | Rule |
|---|---|
| **G** | Everyone |
| **PG** | 13 and over, **or** any age with an adult |
| **18** | 18 and over only — an adult can't help |

The output for `age = 15`, `hasAdult = false` must be:

```text
G: yes
PG: yes
18: no
```

1. Work out each answer as a boolean variable first (`canWatchPG`, `canWatch18`), using `>=` and `||`.
2. Print `yes` or `no` for each — a ternary is perfect here.
3. Test with: `(10, false)` → yes/no/no · `(10, true)` → yes/yes/no · `(18, false)` → yes/yes/yes.

**Expected output in the Console:**

```text
G: yes
PG: yes
18: no
```

## Exercise 03 — Delivery fee rules

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-03-delivery-fee-rules/`

A shop's delivery fee depends on the cart total **and** the city:

| Rule | Fee |
|---|---|
| Cart total is $200 or more | **Free** — anywhere |
| City is `'London'` | $15 |
| City is `'Athens'` or `'Istanbul'` | $25 |
| Any other city | $40 |

1. Use an `if` / `else if` / `else` chain to set `deliveryFee`. Think about the ORDER — which rule must come first?
2. Print: `Cart $120 to Athens → delivery $25, total $145`.
3. Test with: `(120, 'Athens')`, `(250, 'Kyoto')` → delivery $0, `(50, 'London')`, `(50, 'Kyoto')`.
4. **Bonus:** users might type `'london'` or `' LONDON '`. Clean the city with string methods from Module 2 before checking.

**Expected output in the Console:**

```text
Cart $120 to Athens → delivery $25, total $145
```

## Exercise 04 — Day name switch

**Level:** Medium · **Time:** 15 min · **Folder:** `exercises/ex-04-day-name-switch/`

Shops often store the day of the week as a number: `0` is Sunday, `1` is Monday … `6` is Saturday.

1. Given `const dayNumber = 3;`, use a `switch` to set `dayName` (`'Sunday'` … `'Saturday'`). Anything else gives `'Invalid day'`.
2. Use a **second** `switch` with stacked cases to set `openingHours`: weekdays `'9am – 6pm'`, Saturday `'10am – 4pm'`, Sunday `'Closed'`.
3. Print: `Wednesday: 9am – 6pm`.
4. Test with `0`, `6`, `9`, and the string `'3'`. What happens with `'3'`, and how do you fix it?

**Expected output in the Console:**

```text
Wednesday: 9am – 6pm
```

## Exercise 05 — Login check

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-login-check/`

Check a login attempt against a saved username and password. The starter has:

```js
const SAVED_USERNAME = 'amy';
const SAVED_PASSWORD = 'secret123';
const typedUsername = '  Amy ';
const typedPassword = 'secret123';
```

Print exactly **one** message, checked in this order (guard-clause style — problems first, success last):

1. Username is empty (after trimming) → `Please enter your username.`
2. Password is empty → `Please enter your password.`
3. Password is shorter than 8 characters → `Passwords are at least 8 characters.`
4. Username (trimmed, lower-case) or password doesn't match → `Wrong username or password.`
5. Otherwise → `Welcome back, amy!`

Use an `if` / `else if` / `else` chain and **no nesting**. Test each of the five roads by changing the typed values.

**Why one message for both?** Real sites never say *which* one was wrong — that would help an attacker guess usernames. Write this reason as a comment.

**Expected output in the Console:**

```text
Welcome back, amy!
```

## Exercise 06 — Default values

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-06-default-values/`

A product form was saved, but some fields were left out. The starter has:

```js
const savedName = '';
const savedPrice = 0;
const savedStock = undefined;
const savedDescription = null;
```

Build a product summary with sensible defaults:

| Field | Default | Rule |
|---|---|---|
| name | `'Untitled product'` | an empty name should use the default |
| price | `9.99` | `0` must be **kept** — it's a free product! Only use the default if there's no value at all |
| stock | `0` | only if there's no value |
| description | `'No description yet.'` | only if there's no value |

1. For each field, decide: `||` or `??`? Write a comment explaining your choice.
2. Print:

```text
Untitled product — $0
Stock: 0
No description yet.
```

3. Then change `savedPrice` to `undefined` and check the price becomes `9.99`.

**Expected output in the Console:**

```text
Untitled product — $0
Stock: 0
No description yet.
```

## Exercise 07 — Leap year

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-leap-year/`

A year is a **leap year** (366 days, with 29 February) if:

- it can be divided by 4, **except** —
- years that can be divided by 100 are **not** leap years, **unless** —
- they can also be divided by 400.

So 2024 is a leap year, 2026 isn't, 1900 isn't, and 2000 is.

1. Write it as **one** boolean expression: `const isLeapYear = …;` using `%`, `===`, `!==`, `&&` and `||`. Use brackets so the meaning is obvious.
2. Print `2024 is a leap year.` or `2026 is not a leap year.` (a ternary helps).
3. Check all four years from above.
4. **Then** write the same rule as an `if` / `else if` / `else` chain and print which rule decided it, for example `1900: divisible by 100 but not 400 → not a leap year`.

**Expected output in the Console:**

```text
1900 is not a leap year.
1900: divisible by 100 but not 400 → not a leap year
```

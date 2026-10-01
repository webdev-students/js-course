# Module 6: Debugging — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Fix the ReferenceErrors

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-fix-reference-error/`

The starter has **three** ReferenceErrors. Remember: an error stops the script, so you'll only see one at a time.

For each one:
1. Read the error: type, message and line (click the location!).
2. Fix it.
3. Write a comment above the fixed line saying what the cause was: a **typo**, **wrong scope**, or **used before its line**.

When it's all fixed, the Console shows:

```text
Welcome, Tyler!
Delivery to Kyoto: $25
Total: $145
```

**Expected output in the Console:**

```text
Welcome, Tyler!
Delivery to Kyoto: $25
Total: $145
```

## Exercise 02 — Fix the TypeErrors

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-fix-type-error/`

The starter has **three** TypeErrors. For each one, translate the message into plain English as a comment, then fix it.

The three messages you'll meet:
- `Assignment to constant variable.`
- `formatPrice is not a function`
- `Cannot read properties of undefined (reading 'toUpperCase')`

When it's all fixed, the Console shows:

```text
Items in cart: 2
Price: $45.00
Coupon: SAVE10
Coupon: NONE
```

**Expected output in the Console:**

```text
Items in cart: 2
Price: $45.00
Coupon: SAVE10
Coupon: NONE
```

## Exercise 03 — Fix the SyntaxErrors

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-03-fix-syntax-error/`

This file won't run at all — not a single line. There are **four** syntax mistakes. VS Code's red squiggles are your best friend here: hover each one.

Fix them one at a time, saving after each fix and reading the new error. Write a comment next to each fix saying what was wrong.

When it's all fixed, the Console shows:

```text
Checking stock for Ring…
Ring: 12 in stock
Belts: sold out
```

**Expected output in the Console:**

```text
Checking stock for Ring…
Ring: 12 in stock
Belts: sold out
```

## Exercise 04 — Console report

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-console-table-report/`

Turn a messy pile of logs into a tidy end-of-day report, using the console tools from lesson 6.2. The starter has the day's numbers in variables, and one list (lists are Module 7 — you just need to pass it to `console.table`).

Produce a report that:
1. Shows the list of `productsSold` with `console.table`.
2. Puts the money figures inside a group called `Money`: labelled lines for sales, refunds and the net total (sales − refunds).
3. Uses `console.warn` for any product with stock below 5, and `console.error` if the net total is below the `dailyTarget`.
4. Uses a `for` loop from 1 to `ordersToday` with `console.count('order processed')` inside.
5. Adds two `console.assert` checks: refunds are not more than sales; `ordersToday` is at least 1. (Both should pass — silently!)
6. Times the loop with `console.time` / `console.timeEnd`.

**Expected output in the Console:**

```text
│ (index) │ Value      │
│ 0       │ 'Ring'     │
│ 1       │ 'Belts'    │
│ 2       │ 'Glove'    │
│ 3       │ 'Pen case' │
▼ Money
  sales: 1845
  refunds: 120
  net total: 1725
⚠️ Low stock: Pen case — 3 left
❌ Below target by 275
order processed: 1
order processed: 2
order processed: 3
processing orders: (a few) ms
```

## Exercise 05 — Breakpoint hunt

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-05-breakpoint-hunt/`

`countWords` should count the words in a sentence. It gives the wrong answer — and there's no error. **No `console.log` allowed in this exercise**: find the bug with the debugger only.

```text
Expected:
'Hello world' → 2
'  This   ring is   the best  ' → 5
'' → 0
```

1. Set a breakpoint on the first line inside the loop (or type `debugger;` there).
2. Refresh, and step through with **Step over** (`F10`). Watch `wordCount`, `isInWord`, `i` and `character` in **Scope**.
3. Add a **Watch** expression: `text[i] === ' '`.
4. Use a **conditional breakpoint** to pause only when `i === 0`, and another for the last character.
5. When you've found the bug(s), fix them and write a comment explaining what you saw in the debugger.

(Hint: there are **two** bugs. One is an off-by-one.)

**Expected output in the Console:**

```text
2
5
0
```

## Exercise 06 — Logic bug hunt

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-06-logic-bug-hunt/`

A shop's loyalty-points program has **four** logic bugs. No errors — just wrong answers. Use the six-step process from lesson 6.5 and write each step as a comment for **one** of the bugs.

**The rules the code should follow:**
- 1 point for every full $1 spent ($2.50 → 2 points, not 2.5).
- Gold members get **double** points.
- Orders of $500 or more get a **bonus** of 100 points (after doubling).
- The level: 0–499 points is `Bronze`, 500–1999 is `Silver`, 2000 or more is `Gold`.

**Expected output once fixed:**

```text
Amy ($2.50, silver): 2 points
Tyler ($120, gold): 240 points
Claire ($500, silver): 600 points
Level for 499: Bronze
Level for 500: Silver
Level for 2000: Gold
```

**Expected output in the Console:**

```text
Amy ($2.50, silver): 2 points
Tyler ($120, gold): 240 points
Claire ($500, silver): 600 points
Level for 499: Bronze
Level for 500: Silver
Level for 2000: Gold
```

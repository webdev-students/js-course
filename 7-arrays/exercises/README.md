# Module 7: Arrays — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Shopping list

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-01-shopping-list/`

Manage a shopping list for the shop using the methods from lessons 7.1 to 7.5.

1. Start with `const shoppingList = ['Trinkets', 'Scarf'];`.
2. Add `'Wallet'` and `'Ring'` to the **end**.
3. Add `'Pen case'` to the **start** (it's the most important!).
4. You already have a scarf at home — remove `'Scarf'` using `indexOf` and `splice`.
5. The last item is too heavy to carry — remove it with `pop` and print `Leaving behind: Ring`.
6. Print the final list, numbered, with a loop:

```text
1. Pen case
2. Trinkets
3. Wallet
```

7. Print `3 items to buy`.

**Expected output in the Console:**

```text
Leaving behind: Ring
1. Pen case
2. Trinkets
3. Wallet
3 items to buy
```

## Exercise 02 — Find the city

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-find-the-city/`

A delivery company serves these cities:

```js
const cities = ['London', 'Athens', 'San Francisco', 'Kyoto', 'Istanbul', 'Edinburgh', 'Kingston'];
```

Write a function `checkDelivery(typedCity)` that **returns** a message. Capitals and spaces around the typed city shouldn't matter.

- If the city is on the list: `We deliver to Kyoto (stop 4 of 7).`
- If not: `Sorry, we don't deliver to Jakarta yet.`

Then use `find` and `findIndex` to print:
- the first city with more than 5 letters, and
- the position of the first city starting with `'K'`.

Expected:

```text
We deliver to Kyoto (stop 4 of 7).
We deliver to San Francisco (stop 3 of 7).
Sorry, we don't deliver to Jakarta yet.
First long name: San Francisco
First K city is at index 3
```

Hint: make a lower-case copy of the list with `map` so you can compare lower-case with lower-case.

**Expected output in the Console:**

```text
We deliver to Kyoto (stop 4 of 7).
We deliver to San Francisco (stop 3 of 7).
Sorry, we don't deliver to Jakarta yet.
First long name: London
First K city is at index 3
```

## Exercise 03 — Price changes with map

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-03-double-prices/`

Prices at the market went up. Use **`map`** (no loops!) for every part.

```js
const prices = [12, 5, 30, 8];
```

1. `doubled` — every price × 2.
2. `withIncrease` — every price + 15%, rounded to a whole number.
3. `labels` — strings like `'$12'`.
4. `numberedLabels` — strings like `'1) $12'` (use the index).
5. Print all four arrays, and then print `prices` to prove it hasn't changed.

Expected:

```text
(4) [24, 10, 60, 16]
(4) [14, 6, 35, 9]
(4) ['$12', '$5', '$30', '$8']
(4) ['1) $12', '2) $5', '3) $30', '4) $8']
(4) [12, 5, 30, 8]
```

**Expected output in the Console:**

```text
(4) [24, 10, 60, 16]
(4) [14, 6, 35, 9]
(4) ['$12', '$5', '$30', '$8']
(4) ['1) $12', '2) $5', '3) $30', '4) $8']
(4) [12, 5, 30, 8]
```

## Exercise 04 — Affordable items

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-affordable-items/`

A shop keeps product names and prices in two lists **in the same order** (next module you'll learn a better way — objects!):

```js
const names = ['Ring (18k)', 'Belts (2pk)', 'Pen case (XL)', 'Glove (1pr)', 'Travel pouch', 'Scrunchie'];
const prices = [95, 22, 31, 18, 7, 9];
```

Write `getAffordable(budget)` that **returns** an array of labels like `'Belts (2pk) — $22'` for every product that costs **no more than** the budget, cheapest first.

Hints:
- `filter` gets you the prices — but you need the names too! Filter the **indexes** instead: `Array.from({ length: prices.length }, (_, index) => index)` gives `[0, 1, 2, 3, 4, 5]`.
- Then `filter` the indexes by price, `toSorted` them by price, and `map` them to labels.

Print the results for budgets of $20, $5 and $50. For an empty result, print `Nothing under $5.`

Expected:

```text
Under $20: Travel pouch — $7, Scrunchie — $9, Glove (1pr) — $18
Nothing under $5.
Under $50: Travel pouch — $7, Scrunchie — $9, Glove (1pr) — $18, Belts (2pk) — $22, Pen case (XL) — $31
```

**Expected output in the Console:**

```text
Under $20: Travel pouch — $7, Scrunchie — $9, Glove (1pr) — $18
Nothing under $5.
Under $50: Travel pouch — $7, Scrunchie — $9, Glove (1pr) — $18, Belts (2pk) — $22, Pen case (XL) — $31
```

## Exercise 05 — Totals with reduce

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-total-with-reduce/`

```js
const cartPrices = [25, 8, 45, 12];
const quantities = [2, 5, 1, 3];
```

Use **`reduce`** (always with a starting value!) to work out:

1. `itemsTotal` — the sum of `cartPrices`.
2. `itemCount` — the total number of items (sum of `quantities`).
3. `orderTotal` — each price × its quantity, all added up. (Hint: the reduce callback also gets the **index** as its third argument.)
4. `mostExpensive` — the highest price, with `reduce`. Then check it with `Math.max(...cartPrices)`.

Then write `sumAll(...numbers)` with a **rest parameter**, which returns the sum of any number of arguments, and test it with `sumAll(1, 2, 3)`, `sumAll(10)` and `sumAll()`.

Expected:

```text
Items total: 90
Item count: 11
Order total: 171
Most expensive: 45 45
6 10 0
```

**Expected output in the Console:**

```text
Items total: 90
Item count: 11
Order total: 171
Most expensive: 45 45
6 10 0
```

## Exercise 06 — Sort scores

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-06-sort-scores/`

```js
const scores = [72, 95, 58, 100, 88, 9, 64];
const students = ['claire', 'Amy', 'Tyler', 'beth', 'Ethan'];
```

1. Print `scores.toSorted()` and explain in a comment why it's wrong.
2. Print the scores low → high and high → low, **without** changing `scores`.
3. Print the top 3 scores, joined with `' | '`.
4. Print the student names A → Z, ignoring capitals (`localeCompare`).
5. Print the names from **shortest to longest** (compare their `length`).
6. Finally, print `scores` to prove the original order is untouched.

Expected:

```text
(7) [100, 58, 64, 72, 88, 9, 95]
(7) [9, 58, 64, 72, 88, 95, 100]
(7) [100, 95, 88, 72, 64, 58, 9]
Top 3: 100 | 95 | 88
(5) ['Amy', 'beth', 'claire', 'Ethan', 'Tyler']
(5) ['Amy', 'beth', 'Tyler', 'Ethan', 'claire']
(7) [72, 95, 58, 100, 88, 9, 64]
```

**Expected output in the Console:**

```text
(7) [100, 58, 64, 72, 88, 9, 95]
(7) [9, 58, 64, 72, 88, 95, 100]
(7) [100, 95, 88, 72, 64, 58, 9]
Top 3: 100 | 95 | 88
(5) ['Amy', 'beth', 'claire', 'Ethan', 'Tyler']
(5) ['Amy', 'beth', 'Tyler', 'Ethan', 'claire']
(7) [72, 95, 58, 100, 88, 9, 64]
```

## Exercise 07 — Chain report

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-chain-report/`

A week of daily sales (in dollars) for a small shop:

```js
const dailySales = [450, 0, 820, 610, 0, 1200, 970];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
```

Answer each question with **one chain** (no `for` loops):

1. **Open days' average**: the average sales on days the shop was open (sales above 0), rounded to a whole dollar.
2. **Big days**: the names of the days with sales of $800 or more, joined with `', '`. (Hint: filter the **days** using the index argument: `days.filter((day, index) => …)`.)
3. **Best three**: the three highest sales, formatted like `$1200`, joined with `' > '`.
4. **Any zero days?** and **All days over $400?** with `some` / `every`.
5. **Weekend total**: Sunday + Saturday, using `filter` with the index and `reduce`.

Expected:

```text
Open days' average: $810
Big days: Tue, Fri, Sat
Best three: $1200 > $970 > $820
Any zero days? true | All over $400? false
Weekend total: $1420
```

**Expected output in the Console:**

```text
Open days' average: $810
Big days: Tue, Fri, Sat
Best three: $1200 > $970 > $820
Any zero days? true | All over $400? false
Weekend total: $1420
```

## Exercise 08 — Tic-tac-toe board

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-08-tic-tac-toe-board/`

A tic-tac-toe game in progress, stored as a 2D array (`''` is an empty square):

```js
const board = [
  ['X', 'O', 'X'],
  ['', 'X', 'O'],
  ['O', '', 'X'],
];
```

1. `printBoard(board)` — prints the board like this (empty squares shown as `.`):

```text
 X | O | X
---+---+---
 . | X | O
---+---+---
 O | . | X
```

2. `countEmpty(board)` — returns how many squares are empty. Use `flat()`.
3. `getWinner(board)` — returns `'X'`, `'O'` or `''` (no winner yet). A player wins with three in a **row**, a **column** or a **diagonal**.
   - Hint: build a list of all 8 lines, each as an array of 3 values: the 3 rows (the board's own rows), the 3 columns (use `map` on the board: `board.map((row) => row[0])`), and the 2 diagonals.
   - Then `find` a line where all three are the same and not empty — `every` helps. Destructure the winning line: `const [first] = line;`.
4. Print `Empty squares: 2` and `Winner: X`.
5. Change `board[2][2]` to `''` and check the result is `Winner: none yet`.

**Expected output in the Console:**

```text
 X | O | X
---+---+---
 . | X | O
---+---+---
 O | . | X
Empty squares: 2
Winner: X
After clearing the corner — Winner: none yet
```

# Assignment: Tip Calculator

**Module 5 · Functions** · Time: about 1 hour

## Why this assignment?
A small program built the professional way: lots of small, pure functions that each do one job, one function that brings them together, guard clauses with early `return`, default parameters, and a `switch`. It's exactly how the Checkout app works out its order totals.

## What you'll build
A tip calculator for a restaurant bill that can be split between friends. It prints a summary in the Console:

```text
Bill: $180.00
Tip (10% — good service): $18.00
Total: $198.00
Each of 4 people pays: $49.50
```

…and a clear message when the input is no good:

```text
Error: The bill must be a number above 0.
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has a comment for each part.

## Requirements
1. **Small pure functions** (each returns a value; none of them logs):
   - `getTipPercent(serviceRating)` — uses a `switch`: `'great'` → 15, `'good'` → 10, `'okay'` → 5, anything else → 0. Capitals shouldn't matter (`'GREAT'` works too).
   - `getTip(bill, tipPercent)` — the tip amount.
   - `getSharePerPerson(total, people)` — the total divided between the people.
   - `formatMoney(amount)` — `$` plus the amount with 2 decimals.
2. **Validation**: `getInputError(bill, people)` returns an error message string, or an empty string `''` if everything's fine:
   - the bill is not a number, or is 0 or less → `The bill must be a number above 0.`
   - people is not a whole number, or is less than 1 → `The number of people must be a whole number, 1 or more.`
3. **One function with side effects**: `printTipSummary(bill, serviceRating = 'good', people = 1)`:
   - checks the input first — if there's an error, print `Error: …` and `return` early (guard clause),
   - otherwise uses the small functions and prints the four-line summary.
   - When `people` is 1, print `You pay: $…` instead of `Each of 1 people pays`.
4. Call `printTipSummary` at least five times, covering every road — including the two errors and the defaults.
5. Arrow functions for the one-line helpers; declarations for the bigger functions. `===` only, single quotes, semicolons, no red errors.

## Acceptance checklist
- [ ] `printTipSummary(180, 'good', 4)` gives the exact summary above.
- [ ] `printTipSummary(180)` uses the defaults: good service, 1 person, `You pay: $198.00`.
- [ ] `printTipSummary(180, 'GREAT', 2)` uses 15%.
- [ ] `printTipSummary(180, 'terrible', 2)` gives a 0% tip.
- [ ] `printTipSummary(-5, 'good', 2)` and `printTipSummary(180, 'good', 0)` print the right errors and nothing else.
- [ ] Only `printTipSummary` logs anything.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Small functions | 6 | Four pure, well-named functions that return (not log) |
| Validation | 4 | Both errors caught; early `return` guard clause |
| Main function | 4 | Uses the helpers; default parameters; "You pay" for one person |
| Tests | 3 | At least five calls covering every road |
| Tidy code | 3 | Arrows for one-liners; comments; consistent style |

## Stretch goals
- Round each person's share **up** to the nearest $5 (nobody wants to pay $49.50 in cash) and show how much extra tip that adds.
- Let the user type the bill, the rating and the number of people with `prompt`.
- Add a `'custom'` rating: pass the percentage as a fourth argument.

## Remember
Try for at least 20 minutes before watching the solution video.

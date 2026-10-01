# Challenge: Tip calculator

**Time:** about 30 min

Split a restaurant bill between friends. Write small functions:

1. `getTipPercent(service)` — `'great'` → 15, `'good'` → 10, anything else → 0. Ignore capitals.
2. `getTip(bill, percent)` and `formatMoney(amount)` (`$` plus 2 decimals).
3. `printTipSummary(bill, service = 'good', people = 1)`:
   - guard clauses first: a bill that isn't a positive number → print `Please enter a real bill amount.`; fewer than 1 person → `At least one person has to pay!`
   - then print the bill, the tip, the total, and `Each of 4 people pays: $49.50` — or `You pay: $…` for one person.

Test with `printTipSummary(180, 'good', 4)`, `printTipSummary(180)`, `printTipSummary(180, 'GREAT', 2)` and `printTipSummary(-5)`.

**What you should see in the Console:**

```text
Bill: $180.00
Tip (10%): $18.00
Total: $198.00
Each of 4 people pays: $49.50
---
Bill: $180.00
Tip (10%): $18.00
Total: $198.00
You pay: $198.00
---
Bill: $180.00
Tip (15%): $27.00
Total: $207.00
Each of 2 people pays: $103.50
---
Please enter a real bill amount.
```

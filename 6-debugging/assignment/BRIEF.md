# Assignment: Fix the Broken App

**Module 6 · Debugging** · Time: about 1½ hours

## Why this assignment?
In real jobs, you spend more time reading and fixing code than writing it from scratch. This receipt printer for **Mira Accessories** has **10 planted bugs**: some crash with an error message, and some quietly print the wrong thing. Find them all using everything from Module 6.

## Getting started
Open `assignment/starter/` with Live Server and open the Console. Right now, it prints nothing but a red error.

## Your job
1. Fix every bug until the Console shows **exactly** the two receipts below.
2. **One change at a time**: save, re-run, compare after every fix.
3. Mark each fix with a comment: `// BUG 3 FIXED (TypeError): …what was wrong…`. Number them in the order you found them.
4. For at least **two** of the logic bugs, use the debugger (a breakpoint or `debugger;`) rather than `console.log`. Remove every `debugger;` and debug log when you're done.
5. Don't rewrite the program! Keep its structure; only fix what's broken.

## Expected output

```text
==================================
Mira Accessories
Customer: Amy
----------------------------------
2 × Jade bangle             $50.00
2 × Watches                 $60.00
3 × Pins                    $24.00
7 × Pearl pin               $14.00
----------------------------------
Subtotal:                  $148.00
Discount:                  -$14.80
VAT (7.5%):                  $9.99
Delivery:                   $15.00
TOTAL:                     $158.19
==================================
==================================
Mira Accessories
Customer: Tyler
----------------------------------
2 × Jade bangle             $50.00
2 × Watches                 $60.00
3 × Pins                    $24.00
7 × Pearl pin               $14.00
----------------------------------
Subtotal:                  $148.00
Discount:                   -$0.00
VAT (7.5%):                 $11.10
Delivery:                   $15.00
TOTAL:                     $174.10
==================================
```

## The shop's rules (what the code is supposed to do)
- A line total is the unit price × the quantity.
- Coupon `SAVE10` gives 10% off; `FIRSTORDER` gives $10 off. Codes work with any capitals and surrounding spaces. No coupon → no discount.
- VAT is 7.5% of the amount after the discount.
- Delivery costs $15, but it's **free** when the amount after the discount is $200 or more.

## Hints (only if you're stuck)
- There are 4 bugs that show a red error and 6 that don't.
- A SyntaxError stops the **whole** file. Fix the first error first.
- Write the rules above next to the numbers you get. Which line is the first to be wrong?

## Acceptance checklist
- [ ] The output matches the expected receipts exactly, character for character.
- [ ] Ten `BUG n FIXED` comments, each explaining the cause.
- [ ] No leftover `debugger;` or debug logs.
- [ ] `printReceipt('Claire', 'firstorder')` gives a $10.00 discount.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Error bugs | 6 | All four crash bugs fixed, with the error type named |
| Logic bugs | 9 | All six logic bugs fixed |
| Explanations | 3 | Each comment says *why* it was wrong, not just what changed |
| Clean-up | 2 | No debug logs or `debugger` left; structure unchanged |

## Stretch goals
- Add a coupon `BIGSPENDER` that gives 15% off orders of $200 or more (and nothing on smaller orders).
- Make the receipt width a setting: `RECEIPT_WIDTH` already exists — use it to work out the two padding numbers too.
- Print `Invalid coupon: XYZ` (in yellow, with `console.warn`) when a coupon was typed but isn't recognised.

## Remember
Try for at least 30 minutes before watching the solution video.

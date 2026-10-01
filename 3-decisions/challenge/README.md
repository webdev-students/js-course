# Challenge: Delivery fee rules

**Time:** about 25 min

Work out the delivery fee for an order:

| Rule | Fee |
|------|-----|
| Cart total is $200 or more | **Free**, anywhere |
| City is `'London'` | $15 |
| City is `'Paris'` or `'Berlin'` | $25 |
| Any other city | $40 |

1. Start with `cartTotal` and `city` variables.
2. Clean the city first: people might type `' london '` or `'LONDON'`. (Hint: trim, then make the first letter a capital and the rest small.)
3. Print one line: `Cart $120 to Paris → delivery $25, total $145`.
4. Try these and check each answer: `(120, 'Paris')`, `(250, 'Tokyo')`, `(50, ' london ')`, `(50, 'Tokyo')`.

**What you should see in the Console:**

```text
Cart $50 to London → delivery $15, total $65
```

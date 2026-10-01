# Challenge: Weekly sales report

**Time:** about 30 min

A week of daily sales (in dollars) for a small shop:

```js
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dailySales = [450, 0, 820, 610, 0, 1200, 970];
```

Using array methods (no `for` loops!), print:

1. **Open days' average** — the average of days with sales above 0, rounded to a whole dollar.
2. **Big days** — the names of days with $800 or more, joined with `', '` (hint: `days.filter((day, index) => …)`).
3. **Best three** — the three highest sales, like `$1200 > $970 > $820`.
4. **Any zero days?** and **All over $400?** with `some` / `every`.

**What you should see in the Console:**

```text
Open days' average: $810
Big days: Tue, Fri, Sat
Best three: $1200 > $970 > $820
Any zero days? true | All over $400? false
```

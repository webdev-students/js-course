# Challenge: The receipt

**Time:** about 25 min

A customer buys **3 T-shirts at $24.99 each** and **2 caps at $14.50 each**. There's **8% tax** on the goods, and delivery costs **$5**.

In `script.js`, print this receipt — every amount with 2 decimal places:

```text
Customer: JOHN DOE
T-shirts: $74.97
Caps: $29.00
Subtotal: $103.97
Tax (8%): $8.32
Delivery: $5.00
Total: $117.29
Order: #000042
```

Rules:
- Store every price, quantity, the tax rate (`0.08`) and the delivery fee in `const` variables.
- The customer name starts as `'  john doe '` — clean it with string methods.
- Round each money amount as a **number** with `Math.round(amount * 100) / 100`. Use `toFixed(2)` only when printing.
- The order number is the number `42`, padded to 6 digits.

**What you should see in the Console:**

```text
Customer: JOHN DOE
T-shirts: $74.97
Caps: $29.00
Subtotal: $103.97
Tax (8%): $8.32
Delivery: $5.00
Total: $117.29
Order: #000042
```

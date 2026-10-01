# Module 1: Welcome & Setup — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Hello, Console

**Level:** Easy · **Time:** 5 min · **Folder:** `exercises/ex-01-hello-console/`

Print three lines about yourself to the Console, each with a label.

1. Open the `exercises/ex-01-hello-console/` folder in VS Code and start Live Server.
2. In `script.js`, use `console.log` three times to print your **name**, your **city** and your **favourite colour**.
3. Each line should have a label first, like `Name: Amy Osborn`. (Tip: put a comma between the label and the value.)

**Expected output in the Console:**

```text
Name: Amy Osborn
City: Kyoto
Favourite colour: Green
```

Your own name, city and colour will be different — that's the point!

## Exercise 02 — The accessories-stall calculator

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-02-console-calculator/`

Nancy's accessories stall sells **bracelets for $15**, **sunglasses for $20** and **keyrings for $5**. Use the Console as a calculator.

In `script.js`, print these four answers, each with a label:
1. The cost of **2 bracelets**.
2. The cost of **3 pairs of sunglasses**.
3. The cost of **one of each** (bracelet + sunglasses + keyring).
4. The **change from $100** after buying one of each.

Rules: write the maths inside `console.log(…)` — let JavaScript do the sums. Remember `*` means times and `-` means minus. Use brackets `( )` in question 4 so the adding happens first.

**Expected output in the Console:**

```text
2 bracelets: 30
3 sunglasses: 60
One of each: 40
Change from 100: 60
```

**Why the brackets in question 4?** Without them, `100 - 15 + 20 + 5` works left to right and gives `110` — more than you started with! Brackets say "do this part first".

## Exercise 03 — Link an external script

**Level:** Easy · **Time:** 5 min · **Folder:** `exercises/ex-03-link-external-script/`

The folder has an `index.html` and a `script.js` — but they aren't connected yet, so nothing prints.

1. Open the folder with Live Server and check the Console: it's empty.
2. In `index.html`, add the line that loads `script.js`. Put it in the `<head>`, and don't forget `defer`.
3. Save and check the Console again.

**Expected output in the Console:**

```text
script.js is linked!
External files are the way we add JavaScript in this course.
```

## Exercise 04 — The script-order puzzle

**Level:** Medium · **Time:** 10 min · **Folder:** `exercises/ex-04-script-order-puzzle/`

JavaScript runs your lines **from top to bottom**, one after another. The shop-opening routine in `script.js` prints in the wrong order.

1. **Before you change anything**, read `script.js` and write down (on paper!) the order you think the lines will print. Then check the Console. Were you right?
2. Now move the lines — don't change the text — so the steps print in order, **Step 1** to **Step 5**.

**Expected output in the Console:**

```text
Step 1: Unlock the shop.
Step 2: Switch on the lights.
Step 3: Put the watches and bracelets on display.
Step 4: Put a price tag on every item.
Step 5: Open the doors. Welcome, customers!
```

## Exercise 05 — The defer experiment

**Level:** Medium · **Time:** 15 min · **Folder:** `exercises/ex-05-defer-experiment/`

This page's script is supposed to change the heading to **Script loaded ✔** and the paragraph under it. Instead, the Console shows a red error and nothing changes.

1. Open the folder with Live Server and read the red error in the Console. What is it telling you?
2. Fix the page **without moving the `<script>` line** out of the `<head>`.
3. In `script.js`, replace the comment at the top with one sentence, in your own words, explaining why it was broken.

✅ **Done when:** the heading says **Script loaded ✔**, the paragraph says **defer waits until the whole page has been read.**, and the Console has no red errors.

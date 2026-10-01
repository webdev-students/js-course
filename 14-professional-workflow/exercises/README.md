# Module 14: Professional workflow — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Rename for clarity

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-01-rename-for-clarity/`

The starter works, but its names tell you nothing. **Without changing what it does**, rename every variable, function and parameter so the code explains itself, and replace the magic numbers with named constants. The output must stay exactly the same.

Hints: what is `d`? What is `f`? What do `15` and `0.1` mean? What does `t` return — and should a function that returns true/false start with `is`?

**Expected output in the Console:**

```text
Amy 79 pass 
Tyler 50 fail 
Claire 100 pass 
```

## Exercise 02 — Extract functions

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-02-extract-functions/`

`printInvoice` does four jobs in one long function. Refactor it safely (lesson 14.2):

1. **First**, run it and copy its exact output into a comment — that's your check.
2. Extract `getLineTotal(item)`, `getSubtotal(items)`, `getDiscount(subtotal, couponCode)` and `formatDollars(amount)`.
3. Replace the if-chain for coupons with a lookup table: `const COUPONS = { SAVE10: 0.1, SAVE20: 0.2 }`.
4. `printInvoice` should end up short and read like a list of steps.
5. The output must be identical to your check.

**Expected output in the Console:**

```text
1 × Ring (18k): $95.00
2 × Pen case (XL): $62.00
Subtotal: $157.00
Discount: $15.70
Total: $141.30
```

## Exercise 03 — Fix the ESLint problems

**Level:** Medium · **Time:** 25 min · **Folder:** `exercises/ex-03-eslint-fix-warnings/`

1. In this exercise's folder, set up the tools like lesson 14.3: `npm init -y`, add `"type": "module"` to `package.json`, `npm install --save-dev eslint @eslint/js globals prettier`, and copy `eslint.config.js` and `.prettierrc` from the lesson (they're also in the solution folder).
2. Run `npx eslint script.js`. You should see **6 problems**.
3. Fix every one — by understanding it, not by switching rules off. Write a short comment above each fix saying which rule it was.
4. Run `npx prettier --write script.js`, then `npx eslint script.js` again: no output means you're done.
5. The Console output must stay the same: `Cart: 3 items, $139`.

**Expected output in the Console:**

```text
Cart: 3 items, $139
```

## Exercise 04 — Your first commits

**Level:** Easy · **Time:** 20 min · **Folder:** `exercises/ex-04-first-commit/`

The starter is a tiny page. Turn it into a git repository with a clean history:

1. `git init`, then `git status` — which files are untracked?
2. Create a `.gitignore` containing `node_modules/` and `.DS_Store`.
3. Commit everything with the message `Add the product page`.
4. Change the page title in `index.html` to `Gold Ring Details`. Check `git diff`, then commit with the message `Rename the product page`.
5. Add a third feature to the list, commit with `Add the gift box to the features`.
6. Delete everything in `index.html`, save, then get it back with `git restore index.html`.
7. Run `git log --oneline` — you should see three commits, newest first. Paste the output into `git-log.txt`.

The solution folder shows the finished files, plus an example `git-log.txt` (your commit codes will be different).

## Exercise 05 — Write a README

**Level:** Easy · **Time:** 20 min · **Folder:** `exercises/ex-05-write-a-readme/`

The starter is the Weather App from Module 12, with an unhelpful README that just says `weather`. Write a proper `README.md` (lesson 14.6) with:

1. A title and a one-line summary.
2. A **Live demo** link (use `https://your-username.github.io/weather-app/` as a placeholder until you deploy it).
3. A screenshot line: `![…](screenshot.png)` with a useful description.
4. **Features** (at least 4 bullets).
5. **Run it on your computer** (numbered steps).
6. **Built with** — including a link to Open-Meteo, and a note that it needs no API key.
7. **What I learned** (at least 3 bullets).

Check it in VS Code's Markdown preview (`Ctrl+K V`).

## Exercise 06 — Accessibility audit

**Level:** Hard · **Time:** 35 min · **Folder:** `exercises/ex-06-a11y-audit/`

The starter is a small newsletter page with **eight** accessibility problems. Use the checklist from lesson 14.7 — keyboard first, then Lighthouse — to find and fix them all:

1. Missing `lang` on `<html>`.
2. No landmarks (`header`, `main`).
3. Two `<h1>`s.
4. An image with no `alt`.
5. An input with only a placeholder (no `<label>`).
6. A "Subscribe" `div` that should be a `<button>`.
7. `outline: none` on focus, with nothing to replace it.
8. An error shown only in red, not linked to the input (use `aria-describedby` and `aria-invalid`).

Write a comment in the HTML next to each fix. Aim for a Lighthouse Accessibility score of 100.

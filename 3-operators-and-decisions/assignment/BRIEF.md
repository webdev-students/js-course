# Assignment: Grade Checker

**Module 3 · Operators & Decisions** · Time: about 1 hour

## Why this assignment?
Every decision tool from Module 3 in one program: comparisons, `&&` / `||`, truthy and falsy, guard clauses, an `else if` chain in the right order, a ternary and a `switch`. And like every real program, it has to cope with **bad input** first.

## What you'll build
A program that takes a typed exam score (a **string**, like everything a user types), checks it, and prints a result card in the Console:

```text
Score: 87 / 100
Grade: A
Result: PASS
Comment: Excellent work!
```

…or a clear message when the input is no good:

```text
Please enter a score.
"abc" isn't a number.
Scores go from 0 to 100 — you typed 140.
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has `const typedScore = '87';` and a comment for each part.

## Requirements
1. **Validate first, with guard clauses** (an `if` / `else if` chain — problems first, success last):
   - empty or only spaces → `Please enter a score.`
   - not a number (`Number.isNaN`) → `"abc" isn't a number.` (show what they typed)
   - below 0 or above 100 → `Scores go from 0 to 100 — you typed 140.`
2. **The grade**, with an `else if` chain in the right order:

   | Score | Grade |
   |---|---|
   | 70 – 100 | A |
   | 60 – 69 | B |
   | 50 – 59 | C |
   | 45 – 49 | D |
   | 40 – 44 | E |
   | 0 – 39 | F |

3. **Pass or fail** with a **ternary**: 40 and above passes.
4. **A comment for each grade** with a **`switch`**: A → `Excellent work!`, B and C (stacked) → `Good job — keep going.`, D and E (stacked) → `You passed. Let's aim higher next time.`, F → `Don't give up — let's review together.`
5. Print the four-line result card exactly as shown.
6. Whole-number scores only are fine, but decimals like `'69.5'` must not crash — decide what grade they get and write your reasoning in a comment.
7. `===` only, single quotes, semicolons, no red errors.

## Acceptance checklist
Change `typedScore` and check every one of these:
- [ ] `'87'` → A, PASS
- [ ] `'40'` → E, PASS · `'39'` → F, FAIL
- [ ] `'70'` → A · `'69'` → B (the boundaries are right)
- [ ] `''` and `'   '` → Please enter a score.
- [ ] `'abc'` → "abc" isn't a number.
- [ ] `'-5'` and `'140'` → the 0 to 100 message
- [ ] No errors in the Console.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Validation | 6 | All three bad-input cases caught, in a sensible order, with helpful messages |
| Grade chain | 5 | Correct order; every boundary right |
| Ternary and switch | 4 | Pass/fail with a ternary; switch with stacked cases and `break`s |
| Output | 3 | Result card matches exactly |
| Tidy code | 2 | `===` only; clear names; comments explain the tricky parts |

## Stretch goals
- Ask for the score with `prompt` instead of a constant — and handle the user clicking **Cancel** (`null`).
- Add a `+` to grades in the top 3 points of their band (like `B+` for 67–69). Hint: `%`… or just another comparison.
- Print `Just missed an A!` when the score is exactly one point below an A.

## Remember
Try for at least 20 minutes before watching the solution video.

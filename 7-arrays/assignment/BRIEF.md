# Assignment: Gradebook Analyzer

**Module 7 · Arrays** · Time: about 1½ hours

## Why this assignment?
Real data comes as lists — often lists inside lists. This assignment uses nearly every tool from Module 7: `map`, `filter`, `reduce`, `find`, `some` / `every`, `toSorted`, spread and destructuring, on a class's test results.

## What you'll build
The starter has a gradebook — an array of pairs: a student's name and an array of their three test scores.

```js
const gradebook = [
  ['Amy', [72, 88, 95]],
  ['Tyler', [45, 52, 60]],
  ['Claire', [91, 94, 89]],
  ['Ethan', [38, 41, 35]],
  ['Beth', [66, 70, 74]],
];
const PASS_MARK = 50;
```

Your program prints a report like this (the table comes from `console.table`):

```text
Class average: 67.3
Highest average: 91.3 | lowest: 38
Top student: Claire
Passed (4 of 5): Amy, Tyler, Claire, Beth
Everyone passed? false
Any A grades? true
--- Ranking ---
1. Claire    91.3  A
2. Amy         85  A
3. Beth        70  A
4. Tyler     52.3  C
5. Ethan       38  F
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has the data and a comment for each part.

## Requirements
1. **Helpers**:
   - `getAverage(numbers)` — with `reduce` (and a starting value!).
   - `roundTo1(number)` — rounds to 1 decimal place.
   - `getLetter(average)` — the Module 3 bands: 70+ A, 60+ B, 50+ C, 45+ D, 40+ E, below 40 F.
2. **Results**: use `map` to turn each `[name, scores]` pair into `[name, average, letter]` (average rounded to 1 decimal). Show them with `console.table`.
3. **Class statistics**, each printed on its own labelled line:
   - the class average (the average of the averages, rounded),
   - the highest and lowest averages (spread into `Math.max` / `Math.min`),
   - the top student's name (`find`),
   - the names of everyone who passed and how many (`filter` then `map`, then `join`),
   - whether everyone passed (`every`) and whether anyone got an A (`some`).
4. **Ranking**: highest average first, using `toSorted` so the original order is kept, with the columns lined up (`padEnd` / `padStart`).
5. No `for` loops in this assignment — array methods only. `===` only, single quotes, semicolons, no errors.

## Acceptance checklist
- [ ] The output matches the report above (plus the table).
- [ ] Changing `PASS_MARK` to `60` changes the "Passed" line to `Passed (3 of 5): Amy, Claire, Beth`.
- [ ] Adding a sixth student to `gradebook` works with no other changes.
- [ ] `results` is still in the original order after the ranking is printed.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Helpers | 4 | `reduce` with a starting value; correct rounding and bands |
| Results | 4 | One `map`, producing `[name, average, letter]` |
| Statistics | 6 | All six lines correct, each with a fitting method |
| Ranking | 4 | `toSorted` on the right position; neat columns |
| Tidy code | 2 | Destructuring where it helps; clear names; no loops |

## Stretch goals
- **Most improved**: the student with the biggest jump from their first test to their last (`at(-1)`). Expected: `Most improved: Amy (+23 points)`.
- Print how many students got each letter grade, like `A: 3 | C: 1 | F: 1`.
- Print a bar chart of the averages, one `█` per 10 points.

## Remember
Try for at least 30 minutes before watching the solution video.

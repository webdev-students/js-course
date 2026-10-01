# Assignment: Personal Info Card

**Module 2 · Values, Variables & Types** · Time: about 1 hour

## Why this assignment?
Everything in Module 2 in one small program: variables, types, strings, template literals, string methods, numbers and `Math`. It all happens in the Console — no page changes yet.

## What you'll build
A neat "ID card" printed in the Console, built from variables about you, with some values worked out by JavaScript.

```text
+--------------------------------+
| PERSONAL INFO CARD             |
+--------------------------------+
| Name:     AMY OSBORN           |
| Initials: A.O.                 |
| City:     Edinburgh                |
| Age:      24                   |
| In 2030:  28                   |
| Hobbies:  3 (reading, ...)     |
+--------------------------------+
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has a comment for each part.

## Requirements
1. **Variables** (use `const` unless the value must change): `firstName`, `lastName`, `birthYear` (number), `city`, `hobbies` (one string, comma-separated, like `'reading, football, cooking'`), and `CURRENT_YEAR = 2026`.
2. **Worked out by JavaScript** (don't type these by hand):
   - the full name in CAPITALS,
   - the initials, like `A.O.`,
   - the age this year (`CURRENT_YEAR - birthYear`),
   - the age in 2030,
   - how many hobbies there are (hint: `split(', ')` gives a list, and a list has a `.length`),
   - the first hobby.
3. **Print the card** with `console.log`, using template literals. Every line between the `|` borders must be the **same width**: use `padEnd` to pad each line's text to 30 characters.
4. No red errors, single quotes (backticks for templates), semicolons.

## Acceptance checklist
- [ ] All the values come from variables — change `firstName` and the card changes.
- [ ] Capitals, initials, ages and the hobby count are calculated.
- [ ] Every row of the card lines up exactly.
- [ ] No errors in the Console.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Variables | 4 | Good camelCase names; `const` by default; `CURRENT_YEAR` as a setting |
| Calculations | 6 | Name in capitals, initials, both ages, hobby count, first hobby — all computed |
| String methods | 4 | Uses at least `toUpperCase`, `split`, `padEnd` correctly |
| Card layout | 4 | Borders line up on every row |
| Tidy code | 2 | Comments explain the parts; no errors; consistent style |

## Stretch goals
- Ask for the first name with `prompt`, and fall back to your own name if the user cancels.
- Add a random "lucky number" from 1 to 99 on its own row.
- Make the card width a setting (`CARD_WIDTH = 30`) so the whole card resizes when you change one number.

## Remember
Try for at least 20 minutes before watching the solution video.

# Assignment: Setup Check Page

**Module 1 · Welcome & Setup** · Time: about 30 minutes

## Why this assignment?
Before we start real programming, let's prove your setup works from end to end: VS Code, Live Server, an HTML page, a linked JavaScript file with `defer`, and the Console. If this works, everything in the next 14 modules will work too.

## What you'll build
A small page called **Setup Check** with its own `script.js`. When the page loads, the Console prints a short "report" about you and your learning plan, including one calculation.

## Getting started
Open `assignment/starter/` in VS Code and start Live Server on `index.html`. The starter has the page and the styles, and an empty `script.js` — but the script isn't linked yet.

## Requirements
1. Link `script.js` from the `<head>` of `index.html`, with `defer`.
2. In `script.js`, print **exactly five lines** with `console.log`, in this order:
   1. `✅ Setup check: script.js is running`
   2. `Name:` followed by your name
   3. `City:` followed by your city
   4. `Study plan:` followed by how many minutes a day you'll study (a number, no quotes)
   5. `Minutes in 4 weeks:` followed by a **calculation** that works out your minutes a day × 7 × 4 (let JavaScript do the maths)
3. The Console must show **no red errors**.
4. Use single quotes for text, and end every line with a semicolon.

## Acceptance checklist
- [ ] The page opens with Live Server at `http://127.0.0.1:5500/…`.
- [ ] `index.html` has `<script src="script.js" defer></script>` in the `<head>`.
- [ ] The Console shows five lines in the right order.
- [ ] Line 5 is calculated by JavaScript, not typed in by hand.
- [ ] No red errors in the Console.

## Rubric (10 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Script linked correctly | 3 | `src` is right, the tag is in the `<head>`, `defer` is there |
| Five lines in order | 3 | Labels match the requirements; order is exact |
| Calculation | 2 | Line 5 uses `*` in code, and the answer is right |
| Tidy code | 2 | Single quotes, semicolons, one `console.log` per line, no errors |

## Stretch goals (optional)
- Add a sixth line: how many **hours** that is in 4 weeks (hint: divide by 60 with `/`).
- Change the page heading from JavaScript, like we did in lesson 1.5, to say **Setup check passed ✔**.
- Add a `console.warn` line reminding yourself to study tomorrow.

## Submitting
Keep your finished folder — you'll reuse it to practise Git in Module 14. Try for at least 20 minutes before watching the solution video.

# Assignment: Number Guessing Game

**Module 4 · Loops** · Time: about 1 hour

## Why this assignment?
A real, playable game — and a perfect fit for loops: you don't know how many guesses the player will need, so it's a `while` loop with `break`, `continue`, a counter and a "found it" flag. It also uses `Math.random` and `prompt` from Module 2, and validation from Module 2.

## What you'll build
The computer picks a secret whole number from 1 to 50. The player guesses (with `prompt`) and gets a hint after every guess, until they win, run out of tries, or give up:

```text
I'm thinking of a number from 1 to 50. You have 7 tries.
25 is too low.
40 is too high.
"abc" isn't a whole number from 1 to 50 — that one doesn't count.
Correct! The number was 39. You got it in 3 tries.
```

## Getting started
Open `assignment/starter/` with Live Server. `script.js` has a comment for each part.

## Requirements
1. **Settings** as constants: `MIN = 1`, `MAX = 50`, `MAX_ATTEMPTS = 7`.
2. **The secret number**: a random whole number from `MIN` to `MAX` (Module 2's "stretch, chop, shift").
3. **The game loop** — a `while` loop that runs while the player still has tries:
   - Ask for a guess with `prompt`, showing how many tries are left.
   - **Cancel** (`null`) → print `You gave up. The number was 39.` and stop the loop (`break`).
   - Not a whole number, or outside 1–50 → print a message and ask again **without** using up a try (`continue`).
   - Otherwise count the try, then: correct → stop the loop; too low / too high → print a hint.
4. **After the loop**, print the result: the win message (with the number of tries — `1 try` but `3 tries`), or `Out of tries! The number was 39.`
5. The game must never get stuck in an infinite loop, and there must be no red errors.

## Acceptance checklist
- [ ] Guessing right on the first go says `1 try` (not `1 tries`).
- [ ] Seven wrong guesses end the game with the "out of tries" message.
- [ ] `abc`, `2.5`, `0` and `99` are rejected and don't use up a try.
- [ ] Clicking **Cancel** ends the game straight away.
- [ ] A temporary `console.log` of the secret number helped you test — and it's **removed** before you hand in.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Random secret | 2 | Always a whole number from `MIN` to `MAX` |
| Game loop | 6 | Correct `while` condition; `break` on win and Cancel; `continue` for bad input |
| Validation | 4 | All bad input rejected without costing a try |
| Messages | 4 | Hints, win, lose and give-up messages all correct, with "try/tries" |
| Tidy code | 4 | Settings as constants (change `MAX` to 100 and it all still works); clear names; no leftover cheat line |

## Stretch goals
- If the guess is within 3 of the secret, add `— but close!` to the hint.
- Keep track of the best (lowest) number of tries across games, and ask `Play again?` with `confirm` — wrap the whole game in a `do…while`.
- Let the player choose the difficulty first: easy (1–20), medium (1–50) or hard (1–100).

## Remember
Try for at least 20 minutes before watching the solution video.

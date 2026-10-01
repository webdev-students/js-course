# Assignment: Deploy Three Projects

**Module 14 · Professional workflow** · Time: about 2 hours

## Why this assignment?
Code on your laptop helps nobody hire you. This assignment turns three of your course projects into **live links** with clean code, a git history and a README each, and ties them together with a small **portfolio page**. It's the same routine you'll use for the Checkout store in Module 15.

## What you'll do
Pick **three** projects from the course (good choices: the To-do App from Module 10, the Notes App from Module 11, the Weather App from Module 12, the Modular Task Manager from Module 13). For each one:
1. Tidy the code: clear names, no dead code, run Prettier, fix every ESLint problem.
2. Make it a git repository with at least **three meaningful commits**.
3. Push it to GitHub and switch on **GitHub Pages**.
4. Write a README (title, summary, live link, screenshot, features, how to run, built with, what I learned).

Then build the portfolio page in `assignment/starter/` and deploy it too, as `your-username.github.io`.

## Getting started
`assignment/starter/` has an `index.html` with an empty `<main>`, the page styles and an empty `main.js`.

## Requirements
1. Three public GitHub repositories, each with GitHub Pages switched on and working.
2. Each repository: a `.gitignore`, at least 3 commits with clear messages, a README with the eight sections above.
3. `npx eslint .` reports no problems in any of the three.
4. **Portfolio page:** `main.js` holds a `projects` array (title, description, live URL, code URL, tags) and renders one card per project with `createElement` / `textContent`. The links open the live site and the GitHub code.
5. The portfolio page passes the accessibility checklist from lesson 14.7 (Lighthouse Accessibility 100 is the goal).
6. The footer shows `© <current year> <your name>`, with the year from JavaScript.

## Acceptance checklist
- [ ] All three live links load and work (try them on your phone too).
- [ ] Each README renders nicely on GitHub, with a screenshot.
- [ ] `git log --oneline` shows at least 3 clear commits in each repository.
- [ ] The portfolio shows 3 cards, each with a title, description, tags and two working links.
- [ ] Keyboard only: you can reach every link, and you can always see where the focus is.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Deployed projects | 6 | Three live, working GitHub Pages sites |
| Git history | 3 | Small commits with clear, present-tense messages |
| READMEs | 4 | All eight sections, a real screenshot, honest "what I learned" |
| Code quality | 3 | Prettier-formatted, ESLint clean, clear names |
| Portfolio page | 4 | Rendered from data, accessible, footer year from JS |

## Stretch goals
- A tag filter on the portfolio page (click "fetch" to show only projects that use it).
- A light/dark theme toggle saved in localStorage.
- A custom domain for your portfolio.

## Remember
Try for at least 45 minutes before watching the solution video.

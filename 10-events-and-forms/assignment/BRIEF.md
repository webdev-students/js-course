# Assignment: To-do App

**Module 10 · Events & Forms** · Time: about 2 hours

## Why this assignment?
Your first complete, interactive app. More important than the to-dos themselves is **how** it's built: all the data lives in one place (the *state*), one `render()` function draws the page from it, and every event just changes the state and calls `render()`. That's exactly how the Checkout store is built.

## What you'll build
A to-do list where you can:
- **add** a to-do with a form (an empty one shows an accessible error),
- **tick** a to-do to mark it done (it gets crossed out),
- **delete** a to-do,
- **filter**: All / Active / Done (the chosen button looks pressed),
- see how many are **left**: `2 items left` / `1 item left`,
- **Clear done** to remove every finished to-do.

## Getting started
Open `assignment/starter/`. `index.html` and `style.css` are ready — everything happens in `script.js`.

## Requirements
1. **State**: `let todos = [...]` (objects with `id`, `text`, `done`) with 3 example to-dos, `let currentFilter = 'all'`, and `nextId`.
2. **Rendering**:
   - `createTodoHTML(todo)` returns one `<li data-todo-id="…">` with a checkbox (`data-action="toggle"`, ticked when done), the escaped text, and a delete button (`data-action="delete"`) with an `aria-label` like `Delete Buy ring`. Done to-dos have the class `todo-done`.
   - `render()` draws the visible to-dos (or `Nothing here.`), the items-left text, and sets `aria-pressed` on the filter buttons.
3. **Events** — each one changes the state, then calls `render()`:
   - form `submit`: `preventDefault`; empty or only spaces → `Type a to-do first.` shown under the box with `aria-invalid`; otherwise add it, reset the form and keep the focus in the box.
   - ONE delegated click listener on the list for toggle and delete (use `map` + spread, and `filter` — never change the page directly).
   - ONE delegated listener on the filter buttons.
   - **Clear done** removes every done to-do.
4. Everything escaped; `===` only; no leftover test logs.

## Acceptance checklist
- [ ] Pressing **Enter** in the box adds the to-do (because it's a form).
- [ ] Adding `<b>hi</b>` shows the tags as text.
- [ ] Ticking, deleting and filtering all work after adding new to-dos.
- [ ] `1 item left` (singular) and `2 items left` (plural).
- [ ] With the **Done** filter on and nothing done: `Nothing here.`
- [ ] Only ONE click listener on the list (not one per to-do).

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| State + render | 6 | One state; `render` draws everything from it; events never touch the page directly |
| Adding | 4 | Form submit, validation with an accessible error, focus kept |
| Toggle / delete | 4 | One delegated listener; new arrays with `map` / `filter` |
| Filters + counter + clear | 4 | Correct lists, `aria-pressed`, singular/plural |
| Tidy code | 2 | Escaping, clear names, small handlers |

## Stretch goals
- Double-click a to-do's text to edit it (an `input` appears; **Enter** saves, **Escape** cancels).
- Show `All done! 🎉` when there are to-dos and none are left. *(An emoji is fine in your own practice app.)*
- Add a "Mark all as done" button.

## Remember
Try for at least 45 minutes before watching the solution video.

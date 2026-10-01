# Assignment: Modular Task Manager

**Module 13 · Modern JS** · Time: about 2 hours

## Why this assignment?
The last warm-up before the Checkout store. The app is simple on purpose — the point is the **architecture**: small ES modules with one job each, classes that protect their data, saving to localStorage, and hash-routed views. The Checkout store is built exactly this way, only bigger.

## What you'll build
A task list where you can add tasks, tick them off, delete them, and switch between **All** (`#/`), **Active** (`#/active`) and **Done** (`#/done`) views. Each task shows the date it was added. Everything survives a refresh — including which view you're on.

## Getting started
`assignment/starter/` has `index.html` (with `<script type="module" src="js/main.js">`) and an empty `js/main.js`.

## Requirements
1. **`js/Task.js`** — `export class Task` with `id` (from `crypto.randomUUID()`), `title`, `done`, `createdAt` (ISO string), a `toggle()` method, `toJSON()` (plain data) and `static fromJSON(data)`.
2. **`js/storage.js`** — `load(key, fallback)` (safe, with `try` / `catch`) and `save(key, value)`, with a key prefix `'task-manager:'`. The only file that touches localStorage.
3. **`js/TaskList.js`** — `export class TaskList` with a **private** `#tasks` array loaded from storage (turned back into `Task`s), and `add(title)`, `toggle(id)`, `remove(id)`, `filter(view)`, `subscribe(listener)` and a `count` getter. Every change saves and notifies subscribers.
4. **`js/ui/renderTasks.js`** — `export function renderTasks(listElement, tasks)`: builds the list with `createElement` / `textContent`, a checkbox (`data-action="toggle"`), a delete button (`data-action="delete"`, with an `aria-label`) and the date via `Intl.DateTimeFormat`.
5. **`js/main.js`** — reads the view from `location.hash`, renders on changes and on `hashchange`, marks the current nav link with `aria-current="page"`, handles the form and ONE delegated click listener.
6. Imports point one way; the UI module doesn't know about storage or routing.

## Acceptance checklist
- [ ] Add, tick and delete tasks; the count updates (`1 task` / `2 tasks`).
- [ ] The three views show the right tasks; the current link is marked.
- [ ] Refresh: the tasks AND the current view are kept.
- [ ] localStorage holds plain objects (`id`, `title`, `done`, `createdAt`).
- [ ] Breaking the saved value in DevTools and refreshing starts with an empty list and a warning — no crash.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Module structure | 5 | Five modules, one job each, imports pointing one way |
| Classes | 6 | `Task` with `toJSON` / `fromJSON`; `TaskList` with private data, getters, subscribers |
| Storage | 3 | Safe load, one save point, key prefix |
| Routing + UI | 4 | Views from the hash, `aria-current`, safe DOM building, delegation |
| Tidy code | 2 | Clear names; no DOM code in the logic modules |

## Stretch goals
- A **Clear done** button (`TaskList.clearDone()`).
- Edit a task's title by double-clicking it.
- A "Due date" field, shown with `Intl.DateTimeFormat` and highlighted when it's past.

## Remember
Try for at least 45 minutes before watching the solution video.

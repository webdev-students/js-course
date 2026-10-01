# Assignment: Notes App

**Module 11 · State & Local Storage** · Time: about 2 hours

## Why this assignment?
An app that remembers. You'll combine everything from Module 11 — the state pattern, localStorage with safe loading, unique ids and dates — into a small notes app that survives refreshes and restarts. The Checkout store saves its cart, wishlist and orders in exactly this way.

## What you'll build
- A form to write a note (a title and a body). An empty title shows an accessible error.
- A list of notes, **newest first**, each with its title, body, the date and time it was written (like `27 Sept 2026, 10:30`) and a **Delete** button.
- A count in the heading: `2 notes` / `1 note`.
- A search box that filters notes as you type (title or body, ignoring capitals).
- Everything is still there after a refresh.

## Getting started
Open `assignment/starter/`. `index.html` and `style.css` are ready — everything happens in `script.js`.

## Requirements
1. **Storage helpers**: `loadFromStorage(key, fallback)` (with `try` / `catch`, returns the fallback for missing or broken data) and `saveToStorage(key, value)`. Use the key `'notes-app:notes'`.
2. **State**: `{ notes, search }`. `notes` starts from storage, but only if it's really an array. `setState(changes)` saves the notes and notifies subscribers; `render` is a subscriber.
3. **A note** is `{ id, title, body, createdAt }`: `id` from `crypto.randomUUID()`, `createdAt` from `new Date().toISOString()`.
4. **Rendering**: escaped text; the date shown with `Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' })` inside a `<time datetime="…">`; newest first; a helpful empty message (different for "no notes yet" and "no notes match your search").
5. **Events** — each one only calls `setState`: add (form submit), delete (ONE delegated listener), search (`input`).

## Acceptance checklist
- [ ] Add two notes, refresh: both are still there, newest first.
- [ ] Delete one, refresh: it stays deleted.
- [ ] Searching `pay` shows only matching notes; clearing the search shows them all.
- [ ] Break the saved value in DevTools (Application → Local storage) and refresh: the app starts with no notes and a warning in the Console — it doesn't crash.
- [ ] A title with `<b>` in it shows the tags as text.

## Rubric (20 points)

| Area | Points | What earns them |
|------|--------|-----------------|
| Storage | 5 | Safe loading with a fallback; one save point in `setState` |
| State + render | 5 | One state; render from state; events only call `setState` |
| Notes | 4 | UUID ids, ISO dates, formatted display, newest first |
| Search + delete | 4 | Live search; delegated delete |
| Tidy code | 2 | Escaping, validation, clear names |

## Stretch goals
- **Edit** a note: an Edit button fills the form; saving updates the note and adds an `updatedAt` date (`Edited 27 Sept 2026, 11:02`).
- **Pin** a note so it always stays at the top.
- Show relative dates: `just now`, `5 minutes ago`, `yesterday`.

## Remember
Try for at least 45 minutes before watching the solution video.

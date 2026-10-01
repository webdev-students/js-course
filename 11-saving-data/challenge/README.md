# Challenge: Notes app

**Time:** about 45 min

Build a notes app that remembers your notes:

1. A form with a title box; submitting adds a note with a unique `id` (`crypto.randomUUID()`) and a `createdAt` date (`new Date().toISOString()`).
2. Show the notes newest first, each with its date (`Intl.DateTimeFormat`, `dateStyle: 'medium'`) and a **Delete** button.
3. Use the state + render + setState pattern, with ONE click listener on the list.
4. Save to localStorage under the key `'notes:list'` on every change, and load safely on start (missing or broken → an empty list).
5. Show `No notes yet.` when there are none.

# Module 11 quiz — State & Local Storage

**1. In the state pattern, how should an event handler change what's on the page?**
A) Change the elements directly · B) Call `setState` with the changes, and let the subscribers re-draw · C) Reload the page · D) Change a global variable and hope

**2. What does `localStorage.getItem('missing-key')` return when nothing was saved?**
A) `undefined` · B) `''` · C) `null` · D) An error

**3. You save `localStorage.setItem('count', 5)`. What does `localStorage.getItem('count')` give?**
A) `5` · B) `'5'` · C) `[5]` · D) `null`

**4. What happens with `localStorage.setItem('cart', [{ id: 1 }])`?**
A) The array is saved perfectly · B) It's saved as the text `'[object Object]'` — the data is lost · C) An error · D) Nothing

**5. Why wrap `JSON.parse` of saved data in `try` / `catch`?**
A) To make it faster · B) Broken or edited data would crash the whole script; `catch` lets us use a fallback instead · C) JSON.parse needs it to work · D) To hide the data

**6. What's the difference between `localStorage` and `sessionStorage`?**
A) None · B) sessionStorage is forgotten when the tab closes; localStorage stays · C) localStorage is only for strings · D) sessionStorage is shared between all tabs

**7. Why shouldn't an item's position in an array be used as its id?**
A) Numbers can't be ids · B) Positions change when items are added, removed or sorted · C) Arrays have no positions · D) It's too slow

**8. What does `new Date('2026-09-27T10:30:00').getMonth()` return?**
A) `9` · B) `8` · C) `'September'` · D) `27`

**9. What's the best way to save a date in localStorage?**
A) As a Date object · B) As an ISO string, with `toISOString()` · C) As the number of the month · D) Dates can't be saved

**10. Which should you NEVER keep in localStorage or sessionStorage?**
A) A theme choice · B) A cart · C) Passwords and card numbers · D) A form draft

# Module 7 quiz — Arrays

**1. `const cities = ['London', 'Athens', 'Kyoto'];` — what is `cities[1]`?**
A) `'London'` · B) `'Athens'` · C) `'Kyoto'` · D) `undefined`

**2. Which method removes the LAST item of an array and returns it?**
A) `shift()` · B) `push()` · C) `pop()` · D) `slice(-1)`

**3. What's the difference between `slice` and `splice`?**
A) None · B) `slice` copies part of the array without changing it; `splice` changes the array · C) `slice` changes the array; `splice` copies · D) `splice` only works on strings

**4. What does `[45, 8, 3.5].find((price) => price < 10)` give?**
A) `[8, 3.5]` · B) `8` · C) `1` · D) `true`

**5. What does `[1, 2, 3].map((n) => n * 10)` give?**
A) `60` · B) `[10, 20, 30]` · C) `[1, 2, 3]` · D) `undefined`

**6. What does `[5, 12, 8, 20].filter((n) => n > 10)` give?**
A) `[12, 20]` · B) `12` · C) `[5, 8]` · D) `true`

**7. What does `[25, 8, 45].reduce((sum, price) => sum + price, 0)` give?**
A) `[25, 8, 45]` · B) `78` · C) `0` · D) `'25845'`

**8. What does `[10, 9, 100].toSorted()` give — and why?**
A) `[9, 10, 100]` — numbers are sorted by value · B) `[10, 100, 9]` — without a compare function, items are compared as strings · C) `[100, 10, 9]` · D) An error

**9. After `const copy = [...cart]; copy.push('Hat');`, what happens to `cart`?**
A) It also gets `'Hat'` · B) Nothing — `copy` is a new array · C) It becomes empty · D) An error

**10. `const [first, ...others] = ['Amy', 'Tyler', 'Claire'];` — what is `others`?**
A) `'Tyler'` · B) `['Tyler', 'Claire']` · C) `['Amy', 'Tyler', 'Claire']` · D) `'Claire'`

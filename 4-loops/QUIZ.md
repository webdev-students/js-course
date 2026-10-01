# Module 4 quiz — Loops

**1. How many times does this print?** `for (let i = 0; i < 5; i++) { console.log(i); }`
A) 4 · B) 5 · C) 6 · D) Forever

**2. What are the three parts inside a `for` loop's brackets, in order?**
A) condition; start; step · B) start; step; condition · C) start; condition; step · D) step; condition; start

**3. What is `total` after this runs?**
```js
let total = 0;
for (let i = 1; i <= 4; i++) {
  total += i;
}
```
A) 4 · B) 10 · C) 5 · D) 0

**4. When is a `while` loop a better fit than a `for` loop?**
A) When you know exactly how many rounds you need · B) When you're waiting for something to happen and don't know how many rounds it will take · C) Never · D) Only for strings

**5. What's special about `do…while`?**
A) It's faster · B) It never runs · C) Its body always runs at least once · D) It can't use `break`

**6. What does `continue` do?**
A) Ends the loop · B) Skips the rest of this round and goes on to the next one · C) Restarts the loop from the start · D) Pauses the program

**7. Why does this never stop?** `for (let i = 10; i > 0; i++) { … }`
A) The start is wrong · B) The step goes up, but the condition waits for `i` to go down · C) `>` should be `>=` · D) It does stop

**8. The outer loop runs 3 times and the inner loop runs 4 times. How many times does the inner body run?**
A) 7 · B) 4 · C) 12 · D) 3

**9. What's printed last?** `const word = 'Kyoto'; for (let i = 0; i <= word.length; i++) { console.log(word[i]); }`
A) `o` · B) `undefined` · C) An error · D) `4`

**10. Which loop hands you each character of a string without a counter?**
A) `for…of` · B) `do…while` · C) `for (let i = 0; …)` · D) `while`

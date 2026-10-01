# Module 3 quiz — Operators & Decisions

**1. What does `'5' === 5` give?**
A) `true` · B) `false` · C) `NaN` · D) An error

**2. Which of these is `true`?**
A) `'' == '0'` · B) `'Zebra' > 'apple'` · C) `0 == ''` · D) `'10' > '9'`

**3. `const age = 16; const hasAdult = true;` — what does `age >= 18 || hasAdult` give?**
A) `true` · B) `false` · C) `16` · D) `undefined`

**4. Which value is truthy?**
A) `0` · B) `''` · C) `'0'` · D) `null`

**5. What does this print?**
```js
const total = 600;
if (total >= 100) {
  console.log('Bronze');
} else if (total >= 500) {
  console.log('Gold');
} else {
  console.log('None');
}
```
A) `Gold` · B) `Bronze` · C) `Bronze` and `Gold` · D) `None`

**6. What does `const label = 3 > 0 ? 'In stock' : 'Sold out';` set `label` to?**
A) `true` · B) `'Sold out'` · C) `'In stock'` · D) `3`

**7. A `case` in a `switch` has no `break`. What happens when it matches?**
A) A SyntaxError · B) Only that case runs · C) It carries on into the next case's code · D) It jumps to `default`

**8. What does `0 || 5` give, and what does `0 ?? 5` give?**
A) `5` and `5` · B) `0` and `0` · C) `5` and `0` · D) `0` and `5`

**9. What does `true || false && false` give?**
A) `true` · B) `false` · C) An error · D) `undefined`

**10. Why are guard clauses useful?**
A) They make code run faster · B) They handle problems first, so the success path stays flat and easy to read · C) They replace `else` · D) They're required by JavaScript

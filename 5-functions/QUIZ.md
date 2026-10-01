# Module 5 quiz — Functions

**1. In `function greet(name) { … }` and `greet('Amy')`, which is the parameter and which is the argument?**
A) `name` is the argument, `'Amy'` is the parameter · B) `name` is the parameter, `'Amy'` is the argument · C) Both are parameters · D) Both are arguments

**2. What does this print?**
```js
function double(n) {
  console.log(n * 2);
}
const result = double(5);
console.log(result);
```
A) `10` then `10` · B) `10` then `undefined` · C) `undefined` then `10` · D) An error

**3. `function greet(name = 'Guest') { return name; }` — what does `greet(null)` return?**
A) `'Guest'` · B) `null` · C) `undefined` · D) An error

**4. Which arrow function returns the square of a number?**
A) `const square = (n) => { n * n; };` · B) `const square = (n) => n * n;` · C) `const square = n => { return; n * n };` · D) `const square => (n) n * n;`

**5. What does this print?**
```js
let count = 1;
function bump() {
  let count = 5;
  count++;
}
bump();
console.log(count);
```
A) `1` · B) `5` · C) `6` · D) `2`

**6. Which line crashes?**
A) `sayHi(); function sayHi() {}` · B) `const x = 5; console.log(x);` · C) `sayBye(); const sayBye = () => {};` · D) None of them

**7. What's wrong with `repeat(3, sayHello());` if `repeat` expects a callback?**
A) Nothing · B) The brackets call `sayHello` straight away and pass its return value instead of the function · C) Callbacks must be arrow functions · D) `repeat` needs 3 arguments

**8. What does this print?**
```js
function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}
const a = makeCounter();
const b = makeCounter();
a();
a();
console.log(a(), b());
```
A) `3 3` · B) `3 1` · C) `1 1` · D) `2 1`

**9. Which function is pure?**
A) `(price) => { console.log(price); return price; }` · B) `() => Math.random()` · C) `(a, b) => a + b` · D) `(price) => { total += price; }`

**10. What does every recursive function need, so it doesn't run forever?**
A) A loop · B) A base case · C) A callback · D) A default parameter

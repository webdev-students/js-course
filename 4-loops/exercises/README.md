# Module 4: Loops — exercises

Work through these in order — they go from easy to hard. Each folder in `exercises/` is your starting point; the solutions are in the final repo, released after the course. Give each one a real try first!

## Exercise 01 — Count to ten

**Level:** Easy · **Time:** 10 min · **Folder:** `exercises/ex-01-count-to-ten/`

1. Write a `for` loop that prints the numbers **1 to 10**, one per line.
2. Below it, write a second loop that prints only `1 2 3 4 5 6 7 8 9 10` on **one line**. (Hint: build a string with `+=` and print it once, after the loop.)
3. Check the first and last numbers — no off-by-one errors!

**Expected output in the Console:**

```text
1
2
3
4
5
6
7
8
9
10
1 2 3 4 5 6 7 8 9 10
```

## Exercise 02 — Sum 1 to 100

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-02-sum-1-to-100/`

A famous story says a young mathematician called Gauss was asked to add up every number from 1 to 100 — and answered in seconds. Let's make the computer do it the long way.

1. Use a `for` loop and a running total to add up **1 + 2 + 3 + … + 100**. Print `Sum of 1 to 100: 5050`.
2. Add a second running total that adds up only the **even** numbers from 1 to 100. Print `Sum of the even numbers: 2550`.
3. **Bonus (after lesson 4.4):** do part 1 again with a `while` loop.

**Expected output in the Console:**

```text
Sum of 1 to 100: 5050
Sum of the even numbers: 2550
With while: 5050
```

## Exercise 03 — Countdown

**Level:** Easy · **Time:** 15 min · **Folder:** `exercises/ex-03-countdown/`

A flash sale starts at 12:00. Print a countdown:

```text
Flash sale in 10…
Flash sale in 9…
…
Flash sale in 1…
The flash sale is ON!
```

1. Use a `for` loop that counts **down** from a constant `START_FROM = 10`.
2. Then print the final line.
3. Change `START_FROM` to `3` and check it still works.
4. **Stretch:** print only every **other** number: `10, 8, 6, 4, 2`, then the final line.

**Expected output in the Console:**

```text
Flash sale in 10…
Flash sale in 9…
Flash sale in 8…
Flash sale in 7…
Flash sale in 6…
Flash sale in 5…
Flash sale in 4…
Flash sale in 3…
Flash sale in 2…
Flash sale in 1…
The flash sale is ON!
Every other: 10
Every other: 8
Every other: 6
Every other: 4
Every other: 2
```

## Exercise 04 — FizzBuzz

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-04-fizzbuzz/`

FizzBuzz is the most famous beginner programming puzzle — it's even used in job interviews. Print the numbers from **1 to 20**, but:

- for numbers divisible by **3**, print `Fizz` instead,
- for numbers divisible by **5**, print `Buzz` instead,
- for numbers divisible by **both 3 and 5**, print `FizzBuzz`.

The start should look like: `1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, …`

1. Use a `for` loop and an `if` / `else if` / `else` chain.
2. Think carefully about the **order** of your checks. What goes wrong if you check for 3 first?
3. Write the answer to question 2 as a comment.

**Expected output in the Console:**

```text
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
```

## Exercise 05 — Multiplication table

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-05-multiplication-table/`

Part 1 — one table. Given `const tableOf = 7;`, print:

```text
7 x 1 = 7
7 x 2 = 14
…
7 x 12 = 84
```

Part 2 — the full grid. Use **nested loops** to print a 5 × 5 grid where every number is padded to 4 characters so the columns line up:

```text
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

Hint: build each row as a string in the inner loop, and use `String(…).padStart(4)`.

**Expected output in the Console:**

```text
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
7 x 11 = 77
7 x 12 = 84
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

## Exercise 06 — Vowel counter

**Level:** Medium · **Time:** 20 min · **Folder:** `exercises/ex-06-vowel-counter/`

Given `const text = 'Checkout makes shopping EASY';`, count:

1. the **vowels** (a, e, i, o, u — capitals count too),
2. the **consonants** (letters that aren't vowels — spaces don't count!),
3. the **spaces**.

Print:

```text
Vowels: 9
Consonants: 16
Spaces: 3
```

Hint: a character is a letter if `letter.toLowerCase() !== letter.toUpperCase()` — only letters have a capital and a small version. Use `for…of`.

**Expected output in the Console:**

```text
Vowels: 9
Consonants: 16
Spaces: 3
```

## Exercise 07 — Reverse a string

**Level:** Hard · **Time:** 25 min · **Folder:** `exercises/ex-07-reverse-a-string/`

1. Given `const word = 'London';`, build `'nodnoL'` with a loop — **no** built-in reverse tricks. Hint: count **down** from the last position (`word.length - 1`) to `0`.
2. A **palindrome** reads the same forwards and backwards, like `'level'` or `'Racecar'`. Use your reversed string to print whether a word is a palindrome. Capitals shouldn't matter.
3. Test with `'London'`, `'level'`, `'Racecar'` and `'Anna'`.
4. **Stretch:** do part 1 with `for…of` instead. (Hint: add each letter to the **front** of the result.)

**Expected output in the Console:**

```text
Racecar reversed is racecaR
Racecar is a palindrome.
With for…of: racecaR
```

## Exercise 08 — Star pyramid

**Level:** Hard · **Time:** 30 min · **Folder:** `exercises/ex-08-star-pyramid/`

Draw a pyramid of `HEIGHT = 5` rows:

```text
    *
   ***
  *****
 *******
*********
```

Look for the pattern, row by row (rows counted from 1):

| Row | Spaces | Stars |
|-----|--------|-------|
| 1 | 4 | 1 |
| 2 | 3 | 3 |
| 3 | 2 | 5 |
| 4 | 1 | 7 |
| 5 | 0 | 9 |

1. Work out a formula for the spaces and for the stars, using `row` and `HEIGHT`. Write them as comments.
2. Use an outer loop for the rows, and **two** inner loops: one adds the spaces, one adds the stars.
3. Change `HEIGHT` to `3` and `8` — your pyramid should still be perfect.
4. **Stretch:** flip it upside down.

**Expected output in the Console:**

```text
    *
   ***
  *****
 *******
*********
*********
 *******
  *****
   ***
    *
```

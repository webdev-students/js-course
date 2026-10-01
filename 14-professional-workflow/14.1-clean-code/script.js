// Lesson 14.1 — Clean code
// BEFORE: it works — but what does it do?
function calc(a, b) {
  let x = 0;
  for (let i = 0; i < a.length; i++) {
    x += a[i].p * a[i].q;
  }
  if (b) {
    if (x > 0) {
      if (x < 100) {
        x += 5;
      }
    }
  }
  return x;
}

console.log(calc([{ p: 19.99, q: 2 }, { p: 27, q: 1 }], true));

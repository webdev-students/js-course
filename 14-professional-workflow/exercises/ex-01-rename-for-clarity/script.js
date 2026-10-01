// Exercise 1 — Rename for clarity
const d = [
  { n: 'Amy', s: 72 },
  { n: 'Tyler', s: 45 },
  { n: 'Claire', s: 91 },
];

function f(x) {
  return x.s + x.s * 0.1;
}

function t(x) {
  return f(x) >= 50;
}

for (const x of d) {
  console.log(x.n, Math.round(f(x)), t(x) ? 'pass' : 'fail', x.s > 15 ? '' : '(check)');
}

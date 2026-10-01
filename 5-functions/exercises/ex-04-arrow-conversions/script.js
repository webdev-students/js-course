// Exercise 4 — Arrow conversions
function square(n) {
  return n * n;
}

function isEven(n) {
  return n % 2 === 0;
}

function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

function getRandomDiceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function getShippingLabel(weightKg) {
  if (weightKg > 20) {
    return 'Heavy item — extra fee';
  }
  return 'Standard shipping';
}

// Tests — these must keep working.
console.log(square(7));
console.log(isEven(10), isEven(7));
console.log(getFullName('Amy', 'Osborn'));
console.log(getRandomDiceRoll() >= 1);
console.log(getShippingLabel(25), '/', getShippingLabel(2));

// Exercise 6 — Logic bug hunt
const BONUS_FROM = 500;
const BONUS_POINTS = 100;

function getPoints(amountSpent, memberLevel) {
  let points = Math.round(amountSpent);
  if (memberLevel === 'Gold') {
    points = points * 2;
  }
  if (amountSpent > BONUS_FROM) {
    points += BONUS_POINTS;
  }
  return points;
}

function getLevel(points) {
  if (points >= 2000) {
    return 'Gold';
  }
  if (points > 500) {
    return 'Silver';
  }
  return 'Bronze';
}

console.log(`Amy ($2.50, silver): ${getPoints(2.5, 'silver')} points`);
console.log(`Tyler ($120, gold): ${getPoints(120, 'gold')} points`);
console.log(`Claire ($500, silver): ${getPoints(500, 'silver')} points`);
console.log(`Level for 499: ${getLevel(499)}`);
console.log(`Level for 500: ${getLevel(500)}`);
console.log(`Level for 2000: ${getLevel(2000)}`);

// Lesson 14.1 — Clean code and refactoring
// A messy delivery calculator that "works". Don't break it!
function shipping(city, weight, express) {
  let fee = 0;
  if (city === 'London') {
    if (express) {
      fee = 15 * 2;
    } else {
      fee = 15;
    }
    if (weight > 10) {
      fee = fee + (weight - 10) * 2;
    }
  } else if (city === 'Paris') {
    if (express) {
      fee = 25 * 2;
    } else {
      fee = 25;
    }
    if (weight > 10) {
      fee = fee + (weight - 10) * 2;
    }
  } else {
    if (express) {
      fee = 40 * 2;
    } else {
      fee = 40;
    }
    if (weight > 10) {
      fee = fee + (weight - 10) * 2;
    }
  }
  return fee;
}

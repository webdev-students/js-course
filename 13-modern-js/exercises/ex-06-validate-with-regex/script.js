// Exercise 6 — Validate with regex
// Your functions here.

// Test table: [function name, input, expected]
const tests = [
  ['isValidEmail', 'amy@example.com', true],
  ['isValidEmail', 'amy@example', false],
  ['isValidPhone', '0770 123 4567', true],
  ['isValidPhone', '07701234567', true],
  ['isValidPhone', '06031234567', false],
  ['isValidPostcode', '10001', true],
  ['isValidPostcode', '1000', false],
  ['isStrongPassword', 'Password1', true],
  ['isStrongPassword', 'password1', false],
];

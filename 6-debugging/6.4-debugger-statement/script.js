// Lesson 6.4 — The debugger statement

function getDeliveryDays(city) {
  let days = 5;
  if (city === 'London') {
    days = 1;
  } else if (city === 'Athens' || city === 'Istanbul') {
    days = 2;
  }
  return days;
}

console.log('London:', getDeliveryDays('London'));
console.log('athens:', getDeliveryDays('athens'));

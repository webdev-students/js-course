// Lesson 12.4 — Callback hell

// Pretend "servers": each answers after a short wait, by calling a callback.
// The convention: callback(error, result) — error is null when it worked.
function logIn(email, callback) {
  setTimeout(() => {
    if (!email.includes('@')) {
      callback(new Error('Invalid email'), null);
      return;
    }
    callback(null, { id: 7, name: 'Amy' });
  }, 200);
}

function getOrders(userId, callback) {
  setTimeout(() => callback(null, [{ id: 'CHK-101' }, { id: 'CHK-117' }]), 200);
}

function getOrderItems(orderId, callback) {
  setTimeout(() => callback(null, ['Ring', 'Pen case']), 200);
}

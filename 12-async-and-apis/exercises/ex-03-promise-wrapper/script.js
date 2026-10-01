// Exercise 3 — Promise wrapper
// An old-style API: callback(error, stock).
function loadStock(productId, callback) {
  setTimeout(() => {
    if (productId > 100) {
      callback(new Error('not found'), null);
      return;
    }
    callback(null, (productId * 7) % 20);
  }, 100);
}

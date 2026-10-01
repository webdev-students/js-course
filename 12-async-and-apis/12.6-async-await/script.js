// Lesson 12.6 — async and await

// Pretend servers from lesson 12.5 — each returns a promise.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const logIn = (email) => wait(200).then(() => ({ id: 7, name: 'Amy', email }));
const getOrders = (userId) => wait(200).then(() => [{ id: 'CHK-101' }, { id: 'CHK-117' }]);
const getOrderItems = (orderId) => wait(200).then(() => ['Ring', 'Pen case']);

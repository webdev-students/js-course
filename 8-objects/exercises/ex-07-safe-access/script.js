// Exercise 7 — Safe access
const orders = [
  {
    id: 'CHK-1',
    customer: { name: 'Amy', address: { city: 'Edinburgh' }, phone: '0770 111 2222' },
    items: [{ title: 'Ring' }, { title: 'Belts' }],
    discountPercent: 0,
  },
  {
    id: 'CHK-2',
    customer: { name: 'Tyler' },
    items: [],
    discountPercent: null,
  },
  {
    id: 'CHK-3',
    customer: { name: 'Claire', address: { city: 'Kyoto' } },
    discountPercent: 10,
  },
];

// function getOrderSummary(order) { … }

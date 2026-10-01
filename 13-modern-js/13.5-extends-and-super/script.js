// Lesson 13.5 — extends and super
class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  getLabel() {
    return `${this.title} — $${this.price.toFixed(2)}`;
  }

  getDeliveryFee() {
    return this.price >= 100 ? 0 : 5;
  }
}

// Lesson 13.6 — Prototypes
class Product {
  constructor(title) {
    this.title = title;
  }

  getLabel() {
    return `Product: ${this.title}`;
  }
}

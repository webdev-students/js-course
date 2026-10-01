// Lesson 13.7 — this in depth, and bind
class LikeCounter {
  constructor(displayElement) {
    this.count = 0;
    this.display = displayElement;
  }

  increment() {
    this.count++;
    this.display.textContent = this.count;
  }
}

const counter = new LikeCounter(document.querySelector('#count'));

// Exercise 5 — Bind the button
class Timer {
  constructor(display) {
    this.display = display;
    this.seconds = 0;
    this.intervalId = null;
  }

  tick() {
    this.seconds++;
    this.display.textContent = this.seconds;
  }

  start() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new Timer(document.querySelector('#seconds'));
document.querySelector('#start-button').addEventListener('click', timer.start);
document.querySelector('#stop-button').addEventListener('click', timer.stop);

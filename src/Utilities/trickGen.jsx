export class TrickGenerator {
  constructor(strategy, queueSize = 5) {
    this.strategy = strategy;
    this.queueSize = queueSize;
    this.queue = [];
  }

  addToQueue(trick) {
    if (this.queue.includes(trick)) return false;

    this.queue.unshift(trick);

    if (this.queue.length > this.queueSize) this.queue.pop();
    return true;
  }

  nextTrick() {
    const newTrick = this.strategy.CreateTrick();

    if (!this.addToQueue(newTrick)) {
      return this.nextTrick();
    }
    return newTrick;
  }
}

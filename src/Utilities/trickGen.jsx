export class TrickGenerator {
  constructor(strategy, queueSize = 10) {
    this.strategy = strategy;
    this.queueSize = queueSize;
    this.queue = [];
  }

  addToQueue(trick) {
    if (this.queue.includes(trick)) return false;

    this.queue.unshift(trick);

    if (this.queue.length > this.queueSize) this.queue.pop();
    // console.log(this.queue, "max: ", this.queueSize)
    return true;
  }

  nextTrick(mods) {
    const newTrick = this.strategy.CreateTrick(mods);

    if (!this.addToQueue(newTrick)) {
      return this.nextTrick(mods);
    }
    return newTrick;
  }
}

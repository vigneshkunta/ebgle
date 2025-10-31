export default class Queue {
  constructor() {
    this.waiting = [];
  }

  enqueue(socket) {
    this.waiting.push(socket);
  }

  dequeuePair(socket) {
    if (this.waiting.length > 0) {
      const partner = this.waiting.shift();
      return partner;
    }
    return null;
  }

  remove(socket) {
    this.waiting = this.waiting.filter((s) => s.id !== socket.id);
  }
}

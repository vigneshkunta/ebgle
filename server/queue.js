class Queue {
  constructor(capacity = Infinity) {
    this.capacity = capacity;
    this.storage = [];
  }

  enqueue(item) {
    if (this.size() === this.capacity) {
      throw new Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  dequeue() {
    return this.storage.shift();
  }

  size() {
    return this.storage.length;
  }

  remove(item) {
    const index = this.storage.findIndex(elem => elem.id === item.id);
    if (index !== -1) {
      this.storage.splice(index, 1);
    }
  }

  find(id) {
    return this.storage.find(item => item.id === id);
  }

  printQueue() {
    console.log("Current Queue:");
    console.log(this.storage);
  }
}

export default Queue;

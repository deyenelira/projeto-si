class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    var contain = false;
 
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].w > element.w) {
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }
 
    if (!contain) {
      this.items.push(element);
    }
  }
  
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length == 0;
  }
}
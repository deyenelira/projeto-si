class Gulosa extends Method{
  
  calculatePath() {
    let queue = new PriorityQueue();
    queue.enqueue({ x: this.origin.x, y: this.origin.y, w: 0 });
    this.vis = this.gameMap.createGrid(0);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.cameFrom = {};
    this.cameFrom[JSON.stringify(this.origin)] = null;
    
    while(!queue.isEmpty()) {
      let pos = queue.dequeue();
      //console.log(pos);
      
      let foundDestiny = false;
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && !this.wasVisited(x, y)) {
          this.vis[x][y] = 1;
          this.cameFrom[JSON.stringify({x, y})] = {x : pos.x, y: pos.y};
          queue.enqueue({x, y, w: this.heuristica(this.destiny, {x, y})});
          if (this.isDestiny({x, y})) {
            foundDestiny = true;
            break;
          }
        }
      }
      
      if (foundDestiny) break;
    }
  }
  
  calculateChosenPath() {
    this.chosenPath = [];
    
    //console.log(this.cameFrom);
    
    //console.log('origem:', this.origin.x, this.origin.y);
    //console.log('destino:', this.destiny.x, this.destiny.y);
    let pos = this.destiny;
    this.chosenPath.push(pos);
    
    while(!this.isOrigin(pos)) {
      pos = this.cameFrom[JSON.stringify(pos)];
      this.chosenPath.push(pos);
    }
    
    //console.log(this.chosenPath);
    this.chosenPath = this.chosenPath.reverse();
  }
}
class AEstrela extends Method {
  
  calculatePath() {
    let queue = new PriorityQueue();
    queue.enqueue({ x: this.origin.x, y: this.origin.y, w: 0 });
    this.vis = this.gameMap.createGrid(0);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.dist = this.gameMap.createGrid(-1);
    this.cameFrom = {};
    this.cameFrom[JSON.stringify(this.origin)] = null;
    this.dist[this.origin.x][this.origin.y] = 0;
    
    while(!queue.isEmpty()) {
      let pos = queue.dequeue();

      let foundDestiny = false;
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(
          this.validPosition(x, y) && 
          this.haveToVisit(x, y, this.getDist(pos) + this.getWeight({x, y}))
        ) {
          this.vis[x][y] = 1;
          this.cameFrom[JSON.stringify({x, y})] = {x : pos.x, y: pos.y};
          this.dist[x][y] = this.getDist(pos) + this.getWeight({x, y});
          queue.enqueue({
            x, 
            y, 
            w: this.dist[x][y] + this.heuristica(this.destiny, {x, y})
          });
          
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
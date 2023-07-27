class CustoUniforme extends Method {
  
  calculatePath() {
    let queue = new PriorityQueue();
    queue.enqueue({ x: this.origin.x, y: this.origin.y, w: 0 });
    this.vis = this.gameMap.createGrid(0);
    this.dist = this.gameMap.createGrid(-1);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.dist[this.origin.x][this.origin.y] = 0;
    
    while(!queue.isEmpty()) {
      let pos = queue.dequeue();
      
      let foundDestiny = false;
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && this.haveToVisit(x, y, this.getDist(pos) + this.getWeight({x, y}))) {
          this.vis[x][y] = 1;
          this.dist[x][y] = this.getDist(pos)+this.getWeight({x, y});
          queue.enqueue({x, y, w: this.gameMap.grid[x][y]});
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
    if(this.getDistToDestiny() == -1) return;
    
    let pos = this.destiny;
    
    while (!this.isOrigin(pos)) {
      this.chosenPath.push(pos);
      //console.log('pos: ' + str(pos.x) + ',' + str(pos.y) + '    dist: ' + str(this.getDist(pos)));
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];

        if(this.validPosition(x, y)) {
          //console.log(' ---------------------> x: ' + str(x) + ' y: ' + str(y) + '  dist: ' + str(this.getDist({x, y})) + '  w: ' + str(this.getWeight({x, y})));
          if (this.getDist({x, y}) == this.getDist(pos) - this.getWeight(pos)) {
            pos = {x, y};
            break;
          }
        }
      }
    }
    this.chosenPath.push(pos);
    this.chosenPath = this.chosenPath.reverse();
  }


}
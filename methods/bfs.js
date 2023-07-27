class BFS extends Method {
  
  calculatePath() {
    let queue = [];
    queue.push(this.origin);
    this.vis = this.gameMap.createGrid(0);
    this.dist = this.gameMap.createGrid(-1);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.dist[this.origin.x][this.origin.y] = 0;
    
    while(queue.length > 0) {
      let pos = queue.shift();
      this.path.push(pos);
      
      if (this.isDestiny(pos)) break;
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && this.haveToVisit(x, y, this.getDist(pos)+1)) {
          this.vis[x][y] = 1;
          this.dist[x][y] = this.getDist(pos)+1;
          queue.push({x, y});
        }
      }
    }
  }
  
  calculateChosenPath() {
    this.chosenPath = [];
    if(this.getDistToDestiny() == -1) return;
    
    let pos = this.destiny;
    
    while (!this.isOrigin(pos)) {
      //console.log('x: ' + str(pos.x) + ' y: ' + str(pos.y));
      this.chosenPath.push(pos);
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];

        if(this.validPosition(x, y) && this.getDist({x, y}) == this.getDist(pos)-1) {
          //console.log('---------------> i: ' + str(i) +' x: ' + str(x) + ' y: ' + str(y));
          pos = {x, y};
          break;
        }
      }
    }
    this.chosenPath.push(pos);
    this.chosenPath = this.chosenPath.reverse();
  }

  
  wasVisited(x, y) {
    return this.vis[x][y];
  }



}
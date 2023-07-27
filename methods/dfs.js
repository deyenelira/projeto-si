class DFS extends Method {
  constructor(origin, destiny, gameMap) {
    super(origin,destiny,gameMap)
    
    this.vis = this.gameMap.createGrid(0);
    this.dist = this.gameMap.createGrid(-1);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.dist[this.origin.x][this.origin.y] = 0;
  }
  
  calculatePath(pos) {
    if(this.isDestiny(pos)) return true;
    
    for (let i = 0; i < this.ways.length; i++) {
      let x = pos.x + this.ways[i][0];
      let y = pos.y + this.ways[i][1];

      if(this.validPosition(x, y) && this.haveToVisit(x, y, this.getDist(pos)+1)) {
        this.vis[x][y] = 1;
        this.dist[x][y] = this.getDist(pos)+1;
        let found = this.calculatePath({x, y});
        if (found) return true;
      }
    }
    
    return false;
  }
  
  calculateChosenPath() {
    if(this.getDistToDestiny() == -1) return;
    this.chosenPath = [];
    
    let pos = this.destiny;
    
    while (!this.isOrigin(pos)) {
      this.chosenPath.push(pos);
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && this.getDist({x, y}) == this.getDist(pos)-1) {
          pos = {x, y};
          break;
        }
      }
    }
    this.chosenPath.push(pos);
    this.chosenPath = this.chosenPath.reverse();
  }


  
}
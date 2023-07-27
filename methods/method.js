class Method {
  constructor(origin, destiny, gameMap) {
    this.origin = origin;
    this.destiny = destiny;
    this.gameMap = gameMap;
    this.path = [];
    this.chosenPath = [];
    this.ways = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  }


  validPosition(x, y) {
    return x >= 0 && x < this.gameMap.width && y >= 0 && y < this.gameMap.height && this.gameMap.grid[x][y] != OBSTACLE;
  }

  haveToVisit(x, y, dist) {
    return !this.wasVisited(x, y) || this.hasBiggerDistance(x, y, dist);
  }

  wasVisited(x, y) {
    if (!this.vis[x][y]) this.path.push({ x, y });
    return this.vis[x][y];
  }

  hasBiggerDistance(x, y, dist) {
    return this.getDist({ x, y }) == -1 || this.getDist({ x, y }) > dist;
  }

  isOrigin(pos) {
    return pos.x == this.origin.x && pos.y == this.origin.y;
  }

  isDestiny(pos) {
    return pos.x == this.destiny.x && pos.y == this.destiny.y;
  }

  inPath(i, x, y) {
    return this.path.slice(0, i + 1).find(pos => pos.x == x && pos.y == y);
  }

  drawPath(i) {
    for (let j = 0; j <= i; j++) {
      rectMode(CORNER);
      stroke(0);
      fill(COLORS[SEARCH]);
      rect(this.path[j].x * GRID_SIZE, this.path[j].y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      for (let way of this.ways) {
        let x = this.path[j].x + way[0];
        let y = this.path[j].y + way[1];


        if (this.validPosition(x, y) && !this.inPath(i, x, y)) {
          //console.log(x, y);
          fill(COLORS[BORDER]);
          rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }
    }
  }

  drawChosenPath(i) {
    if (this.chosenPath.length) {
      for (let j = 0; j <= i; j++) {
        rectMode(CORNER);
        stroke(0);
        fill(COLORS[PATH]);
        rect(this.chosenPath[j].x * GRID_SIZE, this.chosenPath[j].y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
  }

  getDist(pos) {
    return this.dist[pos.x][pos.y];
  }

  getWeight(pos) {
    return this.gameMap.grid[pos.x][pos.y];
  }

  getDistToDestiny() {
    return this.dist[this.destiny.x][this.destiny.y];
  }

  heuristica(pos1, pos2) {
    return abs(pos1.x - pos2.x) + abs(pos1.y - pos2.y);
  }
}
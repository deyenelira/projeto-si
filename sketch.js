
let search = null;
let state = 'menu';
let block = 0;

function setup() {
  createCanvas(GRID_SIZE * GRID_WIDTH, GRID_SIZE * GRID_HEIGHT + 45);

  this.menu = new Menu();
}

function start(grid = null, agentPos = null, score = 0) {
  this.environment = new environment(GRID_WIDTH, GRID_HEIGHT, grid, score);
  this.environment.search = search;
  this.food = new Food(this.environment, agentPos);
  this.agent = new Agent(this.environment, this.food.pos, agentPos);

  this.calculateMethod();
  this.index = 0;
  frameRate(FRAME_RATE_SEARCH);
}

function draw() {
  switch (state) {
    case 'menu':
      if (search) {
        state = 'SEARCH';
        this.start();
      }
      break;

    case 'SEARCH':
      if (this.index + 1 < this.method.path.length) {
        this.index++;
      } else {
        this.index = 0;
        state = 'PATH';
      }
      this.display();
      break;

    case 'PATH':
      if (this.index + 1 < this.method.chosenPath.length) {
        this.index++;
      } else {
        this.index = 0;
        state = 'MOVE';
        frameRate(FRAME_RATE_MOVE);
      }
      this.display();
      break;

    case 'MOVE':
      if (this.index + 1 < this.method.chosenPath.length) {
        if (this.blocksIndex()) block++;
        else {
          block = 0;
          this.index++;
        }
      } else {
        state = 'SEARCH';
        this.start(this.environment.grid, this.food.pos, this.getNewScore());
      }
      this.display();
      break;
  }
}

function display() {
  this.clearMap();
  this.environment.drawEnvironment();
  this.food.drawFood();

  if (state == 'SEARCH') this.method.drawPath(this.index);
  if (state == 'PATH') this.method.drawChosenPath(this.index);
  if (state == 'MOVE') {
    this.method.drawChosenPath(this.method.chosenPath.length - 1);
    this.updateAgentPos();
  }

  this.agent.drawAgent();
}

function clearMap() {
  clear();
  background('#F3E1BA');
}

function mouseClicked() {
  if (state === 'menu') search = this.menu.choice(mouseX, mouseY);
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    search = null;
    state = 'menu';
    this.menu = new Menu();
  }
}

function calculateMethod() {
  if (search == 'bfs') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.environment);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (search == 'dfs') {
    this.method = new DFS(this.agent.pos, this.food.pos, this.environment);
    this.method.calculatePath(this.method.origin);
    this.method.calculateChosenPath();
  }
  if (search == 'uniformCost') {
    this.method = new CustoUniforme(this.agent.pos, this.food.pos, this.environment);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (search == 'greedy') {
    this.method = new Gulosa(this.agent.pos, this.food.pos, this.environment);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (search == 'a*') {
    this.method = new AEstrela(this.agent.pos, this.food.pos, this.environment);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
}

function getNewScore() {
  return this.environment.score + (this.method.chosenPath.length > 0);
}

function blocksIndex() {
  let pos = this.method.chosenPath[this.index];
  let type = this.environment.grid[pos.x][pos.y];
  return block < type;
}

function updateAgentPos() {
  this.agent.pos.x = this.method.chosenPath[this.index].x;
  this.agent.pos.y = this.method.chosenPath[this.index].y;
}


class environment {
    constructor(width, height, grid = null, score = 0) {
        this.width = width;
        this.height = height;
        this.score = score;
        this.search = '';
        if (grid) this.grid = grid;
        else {
            this.generateGrid();
        }
    }

    generateGrid() {
        const noiseScale = 20.0;
        const iterations = 1;
        this.grid = new Array(this.width);

        for (let i = 0; i < this.width; i++) {
            this.grid[i] = new Array(this.height);

            for (let j = 0; j < this.height; j++) {
                const noiseVal = noise(i / noiseScale, j / noiseScale, iterations);
                const chanceObstacle = Math.random();

                if (noiseVal < 0.3) {
                    this.grid[i][j] = WATER;
                } else if (noiseVal < 0.4) {
                    this.grid[i][j] = QUADMIRE;
                } else {
                    this.grid[i][j] = SAND;
                }

                if (chanceObstacle < 0.1) {
                    this.grid[i][j] = OBSTACLE;
                }
            }
        }
    }

    drawEnvironment() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                rectMode(CORNER);
                fill(COLORS[this.grid[i][j]]);
                rect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
        }

        // stroke(0);
        fill(1);
        textAlign(LEFT);
        text(`Busca: ${this.search}`, 20, 700);
        text(`Pontuação: ${this.score}`, 20, 678);
    }

    createGrid(value) {
        let newGrid = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            newGrid[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++) {
                newGrid[i][j] = value;
            }
        }

        return newGrid;
    }
}

class Agent {
    constructor(environment, foodPos, pos = null) {
        this.environment = environment;
        this.foodPos = foodPos;
        if (pos) {
            this.pos = pos;
        }
        else {
            this.generatePosition();
        }
    }

    generatePosition() {
        let x, y;

        do {
            x = Math.floor(Math.random() * this.environment.width);
            y = Math.floor(Math.random() * this.environment.height);
        } while (this.isInvalidPosition(x, y));

        this.pos = { x, y };
    }

    isInvalidPosition(x, y) {
        const isObstacle = this.environment.grid[x][y] === OBSTACLE;
        const isFoodPosition = this.foodPos.x === x && this.foodPos.y === y;

        return isObstacle || isFoodPosition;
    }

    drawAgent() {
        const halfGrid = GRID_SIZE / 2;
        const x = this.pos.x * GRID_SIZE + halfGrid;
        const y = this.pos.y * GRID_SIZE + halfGrid;
        const outerRadius = halfGrid;
        const innerRadius = outerRadius * 0.382;

        const angle = TWO_PI / 6;
        const points = [];
        for (let a = 0; a < TWO_PI; a += angle) {
            const sxOuter = x + cos(a) * outerRadius;
            const syOuter = y + sin(a) * outerRadius;
            points.push([sxOuter, syOuter]);

            const sxInner = x + cos(a + angle / 2) * innerRadius;
            const syInner = y + sin(a + angle / 2) * innerRadius;
            points.push([sxInner, syInner]);
        }

        stroke(0);
        fill(COLORS[FOOD]);
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1]);
        }
        endShape(CLOSE);
    }
}

class Food {
    constructor(environment, agentPos = null) {
        this.environment = environment;
        this.agentPos = agentPos;
        this.generatePosition();
    }

    generatePosition() {
        let x, y;

        do {
            x = Math.floor(Math.random() * this.environment.width);
            y = Math.floor(Math.random() * this.environment.height);
        } while (this.isInvalidPosition(x, y));

        this.pos = { x, y };
    }

    isInvalidPosition(x, y) {
        const isObstacle = this.environment.grid[x][y] === OBSTACLE;
        const isAgentPosition = this.agentPos && this.agentPos.x === x && this.agentPos.y === y;

        return isObstacle || isAgentPosition;
    }


    drawFood() {
        const centerX = this.pos.x * GRID_SIZE + GRID_SIZE / 2;
        const centerY = this.pos.y * GRID_SIZE + GRID_SIZE / 2;
        const radius = GRID_SIZE / 2;

        stroke(0);
        fill(COLORS[FOOD]);
        ellipse(centerX, centerY, radius, radius);
    }
}
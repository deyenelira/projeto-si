class Menu {
  constructor() {
    background('#FF007F');
    textAlign(CENTER, CENTER);
    textSize(45);
    textFont('UBUNTU');
    
    // Draw algorithm selection text
    fill('#000000');
    text('✦ Select the Algorithm ✦', 310, 250);
    
    // Draw algorithm selection buttons
    this.drawButton(50, 450, 250, 50, 100, '#FFEB3B', '✦ BFS ✦');
    this.drawButton(350, 450, 250, 50, 100, '#FFEB3B', '✦ DFS ✦');
    this.drawButton(350, 550, 250, 50, 100, '#FFEB3B', '✦ Uniform Cost ✦');
    this.drawButton(200, 350, 250, 50, 100, '#FFEB3B', '✦ Greedy ✦');
    this.drawButton(50, 550, 250, 50, 100, '#FFEB3B', '✦ A* ✦');
  }

  choice(mouseX, mouseY) {
    if (this.isClicked(mouseX, mouseY, 50, 450, 250, 50, 100)) return 'bfs';
    if (this.isClicked(mouseX, mouseY, 350, 450, 250, 50, 100)) return 'dfs';
    if (this.isClicked(mouseX, mouseY, 350, 550, 250, 50, 100)) return 'uniformCost';
    if (this.isClicked(mouseX, mouseY, 200, 350, 250, 50, 100)) return 'greedy';
    if (this.isClicked(mouseX, mouseY, 50, 550, 250, 50, 100)) return 'a*';

    return null;
  }

  isClicked(mouseX, mouseY, x, y, width, height) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }
  
  drawButton(x, y, width, height, borderRadius, color, buttonText) {
    // Draw button background
    fill(color);
    rect(x, y, width, height, borderRadius);
    
    // Draw button text
    fill('#705760');
    textSize(20);
    text(buttonText, x + width/2, y + height/2);
  }
}

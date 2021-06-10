let boardWidth;
let boardHeight;
let iterations;
let liveCellImage;
let adding;
let running;
let message;
let size;

let petrieDish;

function setup() {
  boardWidth = 100;
  boardHeight = 100;
  size = 6;
  createCanvas(boardWidth*size+10, boardHeight*size + 80);
  colorMode(HSB, 360, 100, 100, 1);

  liveCellImage = loadImage(
    "https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fgreen2.png?v=1623289735274"
  );
  newGame();
}

function draw() {
  background(220, 90, 10, 1);
  // add scoring
  fill(220, 0, 100, 1);
  textSize(18);
  text(message, 50, height - 60);
  text("iteration: " + iterations, 50, height - 20);
  // Draw the logo at the new position.
  petrieDish.draw();
  if (running){
    petrieDish.checkNeighbors();
    iterations++;
  }
}

function mousePressed() {
  if (adding) {
    petrieDish.addCells(mouseX, mouseY)
  }
}

function keyPressed() {
  // console.log(`${key} ${keyCode}`)
  if (key === " ") {
    if (!adding && !running) {
      adding = true;
      message =
        "Add cells by clicking the mouse at locations \nPress the space bar again when done adding.";
    } else if (adding && !running) {
      adding = false;
      message =
        "Press Enter to play, or \nPress the space bar to pause and add more";
    }
  } else if (keyCode === ENTER) {
    // console.log("ENTER clicked")
    if (!adding && !running) {
      running = true;
      message =
        "Press the space bar to pause and add more, \n or press Enter again to reset";
    } else if (!adding && running) {
      running = false;
      message = "Should reset";
    }
  }
}

function newGame() {
  iterations = 0;
  message = "To add live cells, press the space bar";
  adding = false;
  running = false;
  petrieDish = new Board(boardHeight, boardWidth);
}

class Board {
  constructor(r, c) {
    this.rows = r;
    this.cols = c;
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      this.cells[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.cells[r][c] = "empty";
        // this.cells[r][c] = "alive";
      }
    }
    this.neighbors = [];
    for (let r = 0; r < this.rows; r++) {
      this.neighbors[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.neighbors[r][c] = 0;
      }
    }
  } // end of constructor

  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        fill(200, 100, 0, 1);
        if (this.cells[r][c] == "empty")
          rect(c*size+5, r*size+5, size, size);
        else {
          image(liveCellImage, c*size+5, r*size+5, size, size);
        }
      }
    }
  } // end of draw
  
  addCells (x, y) {
    // Let's add 9 cells centered at x,y
    // console.log("Mouse at ("+x+", "+y+")")
    let startR = Math.floor(y/size)-2;
    if (startR <= 0) startR = 0;
    else if (startR+3 >= this.rows) startR = this.rows-3;
    
    let startC = Math.floor(x/size)-2;
    if (startC < 0) startC = 0;
    else if (startC+3 > this.cols) startC= this.cols-3;
    // console.log(`(startR, startC) = (${startR}, ${startC})`);
    this.cells[startR][startC+1] = "alive";
    for (let c = 0; c < 3; c++) {
        this.cells[1+startR][c+startC] = "alive";
      }
    this.cells[startR+2][startC+1] = "alive";
  } // end addCells

    checkNeighbors() {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          if (r!=0 && c!=0 && this.cells[r-1][c-1] == "alive") this.neighbors[r][c]++;
          if (r!=0 && this.cells[r-1][c] == "alive")this.neighbors[r][c]++;
          if (c!=0 && this.cells[r][c-1] == "alive")this.neighbors[r][c]++;
          if (r!=this.rows-1 && c!=this.cols-1 && this.cells[r+1][c+1] == "alive")this.neighbors[r][c]++;
          if (r!=this.rows-1 && this.cells[r+1][c] == "alive")this.neighbors[r][c]++;
          if (c!= this.cols-1 && this.cells[r][c+1] == "alive")this.neighbors[r][c]++;
          if (r!=0 && c!=this.cols-1 && this.cells[r-1][c+1] == "alive") this.neighbors[r][c]++;
          if (r!=this.rows-1 && c!=0 && this.cells[r+1][c-1] == "alive") this.neighbors[r][c]++;   
      }
    } // end checking neighbors
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.neighbors[r][c] == 3)
          this.cells[r][c] = "alive";
        else if (this.neighbors[r][c] < 2 || this.neighbors[r][c] >= 5){
          this.cells[r][c] = "empty";
        }
      }
    }
    
  }
}

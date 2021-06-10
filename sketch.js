let boardWidth;
let boardHeight;
let iterations;
let liveCellImage;
let adding;
let running;
let message;

let petrieDish;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  boardWidth = 100;
  boardHeight = 100;
  
  liveCellImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fgreen2.png?v=1623289735274")
  newGame();
}

function draw() {
  background(220, 90, 10, 1);
  // add scoring
  fill(220, 0, 100, 1)
  textSize(20)
  text(message, 50, height-30);
  text("iteration: " + iterations, 50, height-20);
  // Draw the logo at the new position.
  petrieDish.draw();
  

}

function mousePressed() {

}

function keyPressed() {

}

function newGame() {
  
  iterations = 0;
  message = "To add live cells, press the space bar"
  adding = false;
  running = false;
  petrieDish = new Board(boardHeight, boardWidth)
  
}


class Board {
  constructor(r, c){
    this.rows = r;
    this.cols = c;
    this.cells = [];
    for (let r = 0; r < this.rows; r++ ){
      this.cells[r] = [];
      for (let c = 0; c < this.cols; c++){
        this.cells[r][c] = "empty";
      }
    }
    
  }
  
  draw(){
    for (let r = 1; r < this.rows; r++ ){
      for (let c = 0; c < this.cols; c++){
        fill(200, 100, 0, 1)
        if (this.cells[r][c] == "empty")
          rect(c*5+5, r*5, 5, 5)
        else {
          image(liveCellImage, c*5+5, r*5, 5, 5);
        }
        
      }
    }
  }
  
  checkNeighbors() {
 
    
    
  }
  
}

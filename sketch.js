let boardWidth;
let boardHeight;
let iterations;
let cellImage;
let adding;

let gameBoard;

function setup() {
  createCanvas(windowWidth-10, windowHeight-1);
  colorMode(HSB, 360, 100, 100, 1);
  boardWidth = 100;
  boardHeight = 100;
  
  cellImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fgreen2.png?v=1623289735274")
  newGame();
}

function draw() {
  background(220, 90, 10, 1);
  // add scoring
  fill(220, 0, 100, 1)
  textSize(20)
  text("iteration: " + iterations, 50, 520);
  // Draw the logo at the new position.
  gameBoard.draw();
  

}

function mousePressed() {

}

function keyPressed() {

}

function newGame() {
  
  score = 0;
  gameBoard = new Board(boardHeight, boardWidth)
  
}


class Board {
  constructor(r, c){
    this.rows = r;
    this.cols = c;
    this.gems = [];
    for (let r = 0; r < this.rows; r++ ){
      this.gems[r] = [];
      for (let c = 0; c < this.cols; c++){
        let jewel = random(jewels);
        // console.log(jewel)
        this.gems[r][c] = jewel;
      }
    }
    
  }
  draw(){
    for (let r = 1; r < this.rows; r++ ){
      for (let c = 0; c < this.cols; c++){
        fill(200, 100, 0, 1)
        rect(c*50+5, r*50, 50, 50)
        image(this.gems[r][c].source, c*50+5, r*50, 50, 50);
      }
    }
  }
  
  check() {
    // check rows for 3, 4 or 5 in a row
     for (let r = 1; r < this.rows; r++ ){
       let c = 0;
       let inARow = 1;
       let start = c;
      while (c < this.cols-1){
        if (this.gems[r][c].color == this.gems[r][c+1]) {
          inARow++;
        } else {
          start = c+1;
          inARow = 1
        }
        c++;
      }
    }
    
    
  }
  
}

let boardWidth;
let boardHeight;
let fallSpeed;
let gravity
let score;
let gapSize;
let gems;
let prevX, prevY;

function setup() {
  createCanvas(800, 600);
  colorMode(HSL, 360)
  newGame();
}

function draw() {
  background(220);
  // add scoring
  text("score: " + score, 50, 200);

}

function mousePressed() {

}

function newGame() {
  boardWidth = 8;
  boardHeight = 8;

}

class Gem {
  constructor(r, c, col){
    this.row = r;
    this.col = 
  }
}
